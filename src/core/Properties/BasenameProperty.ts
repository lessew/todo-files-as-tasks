import { PropertyModel } from "src/core/Interfaces/PropertyModel";
import { PathProperty } from "./PathProperty";
import { PropertySettings } from "../PropertySettings";

export class BasenameProperty extends PathProperty{
    
    constructor(name:string,fileID:string,dao:PropertyModel,propSettings:PropertySettings){
        super(name,fileID,dao,propSettings);
    }

    validate(newValue:string):boolean{
        return super.validate(newValue);//not used
    }

    getValue():string{        
        if(typeof this.value === 'undefined'){
            this.value = this.getBasename(); 
        }
        return this.value;
    }

    async setValue(val:string):Promise<void>{
        const newPath = this.getNewFullPathWithBasename(val);
        await this.dao.persist(this.fileID,this.name,newPath);
        this.value = val;
        this.fileID = newPath;
    }
}