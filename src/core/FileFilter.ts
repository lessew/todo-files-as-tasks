import { File } from "./File";
import { Filter } from "./Interfaces/Filter";

export class FileFilter{
    files:File[];

    constructor(files:File[]){
        this.files = files;
    }

    filterBy(filter:Filter):FileFilter{
        let filtered = this.files.filter((aFile) => {
            const propertyValue:string = aFile.get(filter.propertyName);

            if(filter.operator=="include"){
                return (propertyValue == filter.propertyValue)
            }
            else if(filter.operator=="exclude"){
                return (propertyValue != filter.propertyValue)
            }

        })
        this.files = filtered;
        return this;
    }

    bulkFilterBy(list:Filter[]):FileFilter{
        list.forEach(filterBy => {
            this.filterBy(filterBy);
        });
        return this;
    }

    get():File[]{
        return this.files;
    }

}