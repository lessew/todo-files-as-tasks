import { PropertySettings } from "src/core/Interfaces/PropertySettings";
import { FileModel } from "../../Interfaces/FileModel";
import { Property } from "../../Interfaces/Property";
import { BasenameProperty } from "./BasenameProperty";

export class BasenamePropertySettings implements PropertySettings{
    propName:string;
    defaultValue: string;
    static DEFAULT_VALUE = "error-in-value";

    constructor(n:string){
        if(n.length==0){
            throw new Error("Cant have an empty propertyname");
        }
        this.propName = n;
        this.defaultValue = BasenamePropertySettings.DEFAULT_VALUE;
    }

    adaptToProperty(file: FileModel): Property {
        let prop = new BasenameProperty(this.propName,this.defaultValue,file)
        return prop;
    }
}