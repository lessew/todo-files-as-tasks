import FileAsTaskPlugin from "main";
import { Directory } from "../Directory";
import { File } from "../File";
import { IOFactory } from "../IOFactory";
import { ObsidianFileSystem } from "./ObsidianFilesystem";

export class ObsidianIOFactory extends IOFactory{
    plugin: FileAsTaskPlugin;
    fs:ObsidianFileSystem;

    constructor(plugin:FileAsTaskPlugin){
        super();
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

}