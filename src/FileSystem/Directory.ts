import { File } from "./File";
import { IOFactory } from "./IOFactory";
import { FileSystem } from "./FileSystem";

export class Directory{
    path:string;
    root:string;
    children:(File | Directory)[];
    fs:FileSystem;
    factory:IOFactory;

    constructor(root:string,path:string,factory:IOFactory,fs:FileSystem){ 
        this.factory = factory;
        this.fs = fs;
        this.root = root;
        this.path = path;
        this.loadChildren();
    }

    loadChildren(){
        let paths = this.fs.readDir(this.getFullPath());
        let result:(File|Directory)[] = [];
        paths.forEach(childPath => {
            if(this.fs.pathIsDirectory(childPath )){
                let dir = this.factory.createDirectory(this.root,childPath);
                result.push(dir);
            }
            else if(this.fs.pathIsFile(childPath)){
                let file = this.factory.createFile(this.root,childPath);
                result.push(file);
            }
        })
        this.children = result;
    }

    getDirectories():Directory[]{       
        let result:Directory[] = [];
        
        this.children.forEach((resource) => {
            if(this.factory.isFile(resource)){
                // nothin'
            }
            else if(this.factory.isDirectory(resource)){
                result.push(resource);
                result = [...result,...resource.getDirectories()];
            }
        })
        return result; 
    }

    getFiles():File[]{
        let result:File[] = [];
        this.children.forEach(resource => {
            if(this.factory.isFile(resource)){
                result.push(resource);
            }
            else if(this.factory.isDirectory(resource)){
                result = [...result,...resource.getFiles()];
            }
        })
        return result;
    }

    getDirectoryPaths():string[]{
        return this.getDirectories().map(dir => dir.path);
    }

    getFullPath():string{
        return this.root + "/" + this.path;
    }

    getPathFromRoot():string{
        let pfr = this.path.substring(this.root.length);
        if(pfr.charAt(0)=="/"){
            pfr = pfr.substring(1);
        }
        return pfr;
    }
}