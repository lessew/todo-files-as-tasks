import { PathProperty } from "./Properties/PathProperty";
import { Property } from "./Interfaces/Property";
import { PropertyDAO } from "./Interfaces/PropertyDAO";

// TODO move errors into external class
export class File {
    fullPath:PathProperty;
    properties:Record<string,Property>;
    static ERR_PROPERTY_INVALID = "ERROR: invalid property";
    static ERR_PROPERTY_NO_VALUE = "ERROR: no value set for property"
   
    constructor(fullpath:string,propertyDAO:PropertyDAO){
        let fp = new PathProperty("fullpath",fullpath,propertyDAO);
        
        fp.setValue(fullpath);
        this.fullPath = fp;
    }

    propertyIsSet(name:string):boolean{
        return (name in this.properties);
    }

    isMarkdownFile():boolean{
        return this.fullPath.isMarkdownFile();
    }

    get(prop:string):string{
        if(this.propertyIsSet(prop)){
            const r = this.properties[prop];
            if(typeof r.getValue() === "string"){
                return r.getValue();
            }
            return File.ERR_PROPERTY_NO_VALUE;
        }
        return File.ERR_PROPERTY_INVALID;
    }
}
