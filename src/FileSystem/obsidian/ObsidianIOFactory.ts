import FileAsTaskPlugin from "main";
import { Directory } from "../Directory";
import { File } from "../File";
import { IOFactory } from "../IOFactory";
import { ObsidianFilesystem } from "./ObsidianFilesystem";

export class ObsidianIOFactory extends IOFactory{
    plugin: FileAsTaskPlugin;
    fs:ObsidianFilesystem;

    constructor(plugin:FileAsTaskPlugin){
        super();
        this.plugin = plugin;
        this.fs = new ObsidianFilesystem(plugin);
    }

    createFile(path: string): File {
        let file = new File(path,this.fs);
        return file;
    }

    createDirectory(path: string): Directory {
        let dir = new Directory(path,this,this.fs);
        return dir;
    }

}