import { Task } from "../main/configuration/Task";
import { File } from "src/core/Files/File";
import { FileProperty } from "src/core/Files/FileProperty";
import { FileSystem } from "src/core/Files/FileSystem";

export class TaskBuilder{
    files:File[]
    fileSystem:FileSystem

    constructor(fs:FileSystem){
        this.fileSystem = fs;
    }

    getFiles(rootPath:string){
        this.files = this.fileSystem.getMarkdownFiles(rootPath);
        
    }

    filterBy(propertyName:string,propertyValue:string):TaskBuilder{
        let filtered = this.files.filter((aFile) => {
            const property:FileProperty = aFile.get(propertyName);
            return (property.value == propertyValue)
        })
        this.files = filtered;
        return this;
    }
}