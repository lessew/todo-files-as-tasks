import { PropertyDAO } from "src/core/Interfaces/PropertyDAO";
import { PathProperty } from "./PathProperty";

export class ToplevelFolderProperty extends PathProperty{
    allowedProjectValues:string[];

    constructor(name:string,fileID:string,dao:PropertyDAO,vals:string[]){
        super(name,fileID,dao);
        this.allowedProjectValues = vals;
    }

    // inheritance does not seem to work propertly with 3 level classes. this is a workaround
    //getValue():string{return super.getValue();}
    //setValue(val:string):void{super.setValue(val);}
    //getFileID():string{return super.fileID}
    
    validate(newValue:string){
        return (this.allowedProjectValues.indexOf(newValue) != -1)
    }


}