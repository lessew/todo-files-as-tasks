abstract class FilePropertyValues {
    static fieldId:string;
    static humanReadable_en_GB:string;

    static INVALID_VALUE = "<invalid value>";
    values : Map<string,string>;
    reverseValuesHumanReadableToId: Map<string,string>;

    constructor(){
        this.values = new Map<string,string>();
        this.reverseValuesHumanReadableToId = new Map<string,string>();
    }

    addValue(id:string,humanReadable:string){
        this.values.set(id,humanReadable);
        this.reverseValuesHumanReadableToId.set(humanReadable,id);
    }

    getValue(id:string):string{
        const aValue = this.values.get(id);

        if(typeof aValue === 'undefined'){
            return FilePropertyValues.INVALID_VALUE;
        } 
        else{
            return aValue;
        }
    }

    getAllHumanReadableValues():string[]{
       return [...this.values.values()]
    }

    getIdFromHumanReadableValue(humanReadable:string):string{
        const result = this.reverseValuesHumanReadableToId.get(humanReadable);
        if(typeof result === 'undefined'){
            return FilePropertyValues.INVALID_VALUE;
        } 
        else{
            return result;
        }
    }

    isSet(id:string):boolean{
        return this.values.has(id);
    }
}

export class ValidStatusValues extends FilePropertyValues{
    static fieldId = "status";
    static humanReadable = "Status";
}
export class ValidContextValues extends FilePropertyValues{
    static fieldId = "context";
    static humanReadable = "Context";
}
export class ValidProjectValues extends FilePropertyValues{
    static fieldId = "project";
    static humanReadable = "Project";
}

export class ValidStarredValues extends FilePropertyValues{
    static fieldId = "starred";
    static humanReadable = "Starred";
}