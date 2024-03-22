import { File } from "./File";

export class FileFilter{
    files:File[];

    constructor(files:File[]){
        this.files = files;
    }

    filterBy(propertyName:string,filterValue:string):FileFilter{
        let filtered = this.files.filter((aFile) => {
            const propertyValue:string = aFile.get(propertyName);
            return (propertyValue == filterValue)
        })
        this.files = filtered;
        return this;
    }

    bulkFilterBy(list:{propertyName:string,propertyValue:string}[]):FileFilter{
        list.forEach(filterBy => {
            this.filterBy(filterBy.propertyName,filterBy.propertyValue);
        });
        return this;
    }

    get():File[]{
        return this.files;
    }

}