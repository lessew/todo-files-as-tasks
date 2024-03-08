import { File } from "src/core/Files/File";
import { FileSystemFacade } from "src/core/Files/FileSystemFacade";

export class TaskBuilder{
    files:File[];
    fileSystemFacade:FileSystemFacade;

    constructor(fs:FileSystemFacade){
        this.fileSystemFacade = fs;
    }

    init(rootPath:string){
        this.files = this.fileSystemFacade.getMarkdownFiles(rootPath); 
    }

    filterBy(propertyName:string,propertyValue:string):TaskBuilder{
        let filtered = this.files.filter((aFile) => {
            const property:string = aFile.get(propertyName);
            return (property == propertyValue)
        })
        this.files = filtered;
        return this;
    }

    get():File[]{
        return this.files;
    }

}