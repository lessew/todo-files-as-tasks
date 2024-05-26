import FileAsTaskPlugin from "main";
import { Directory } from "../Directory";
import { File } from "../File";
import { IOFactory } from "../IOFactory";
import { ObsidianFileSystem } from "./ObsidianFileSystem";

export class ObsidianIOFactory implements IOFactory{
    plugin: FileAsTaskPlugin;
    fs:ObsidianFileSystem;

    constructor(plugin:FileAsTaskPlugin){
        this.plugin = plugin;
        this.fs = new ObsidianFileSystem(plugin);
    }

    createFile(root:string,path: string): File {
        let file = new File(root,path,this.fs);
        return file;
    }

    createDirectory(root:string,path: string): Directory {
        let dir = new Directory(root,path,this,this.fs);
        return dir;
    }

    isDirectory(input: File | Directory): input is Directory {
        return ('children' in input);
    }
    
    isFile(input: File | Directory): input is File {
        return !('children' in input);
    }

}