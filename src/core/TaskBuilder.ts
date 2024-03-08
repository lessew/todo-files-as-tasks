import { File } from "src/core/Files/File";
import { FileSystemFacade } from "src/core/Files/FileSystemFacade";

export class TaskBuilder{
    files:File[];

    constructor(files:File[]){
        this.files = files;
    }

    filterBy(propertyName:string,filterValue:string):TaskBuilder{
        let filtered = this.files.filter((aFile) => {
            const propertyValue:string = aFile.get(propertyName);
            return (propertyValue == filterValue)
        })
        this.files = filtered;
        return this;
    }

    bulkFilterBy(list:{propertyName:string,propertyValue:string}[]):TaskBuilder{
        list.forEach(filterBy => {
            this.filterBy(filterBy.propertyName,filterBy.propertyValue);
        });
        return this;
    }

    get():File[]{
        return this.files;
    }

}