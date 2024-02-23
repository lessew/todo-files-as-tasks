export type Status = string;
export type Context = string;
   

abstract class FilePropertyValues {
    static fieldId:string;
    static humanReadable_en_GB:string;

    static INVALID_VALUE = "<invalid value>";
    values : Map<string,{humanReadable_en_GB:string}>;
    constructor(){
        this.values = new Map<string,{humanReadable_en_GB:string}>();
    }

    addValue(id:string,humanReadable:string){
        this.values.set(id,{humanReadable_en_GB:humanReadable});
    }

    getValue(id:string):string{
        const aValue = this.values.get(id);
        const humanReadable = aValue?.humanReadable_en_GB;

        if(typeof humanReadable === 'undefined'){
            return FilePropertyValues.INVALID_VALUE;
        } 
        else{
            return humanReadable as string;
        }
    }

    isSet(id:string):boolean{
        return this.values.has(id);
    }
}

export class ValidStatusValues extends FilePropertyValues{
    static fieldId = "status";
    static humanReadable_en_GB = "Status";
}
export class ValidContextValues extends FilePropertyValues{
    static fieldId = "context";
    static humanReadable_en_GB = "Context";
}