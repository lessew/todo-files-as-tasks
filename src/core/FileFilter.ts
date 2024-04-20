import { FileAsTask } from "./FileAsTask";
import { Filter, FilterOperator } from "./Filter";

export class FileFilter{
    files:FileAsTask[];

    constructor(files:FileAsTask[]){
        this.files = files;
    }

    filterBy(filter:Filter):FileFilter{
        let filtered = this.files.filter((aFile) => {
            const propertyValue:string = aFile.get(filter.propertySettings.propName);

            if(filter.operator==FilterOperator.exclude){
                return (propertyValue != filter.propertyValue)
            }
            else if(filter.operator==FilterOperator.include){
                return (propertyValue == filter.propertyValue)
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

    get():FileAsTask[]{
        return this.files;
    }

}