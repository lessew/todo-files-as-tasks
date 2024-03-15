import { PropertyDAO } from "src/core/Interfaces/PropertyDAO";
import { PathProperty } from "./PathProperty";

export class ToplevelFolderProperty extends PathProperty{
    allowedProjectValues:string[];

    constructor(name:string,fileID:string,dao:PropertyDAO){
        super(name,fileID,dao);
    }

    // inheritance does not seem to work propertly with 3 level classes. this is a workaround
    //getValue():string{return super.getValue();}
    //setValue(val:string):void{super.setValue(val);}
    //getFileID():string{return super.fileID}

    setAllowedProjectValues(vals:string[]){
        this.allowedProjectValues = vals;
    }

    validate(val:string){
        return false;
    }


}