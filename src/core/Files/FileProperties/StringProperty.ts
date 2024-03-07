import { AbstractFileProperty } from "../FileProperty";

export class StringProperty extends AbstractFileProperty {
    value:string;
    
    matches(needle:string):boolean{
        if(this.value!==undefined){
            return this.value.startsWith(needle);
        }
        return false;
    }
   
}