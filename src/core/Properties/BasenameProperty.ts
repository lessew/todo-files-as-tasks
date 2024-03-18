import { PropertyDAO } from "src/core/Interfaces/PropertyDAO";
import { PathProperty } from "./PathProperty";

export class BasenameProperty extends PathProperty{

    constructor(name:string,fileID:string,dao:PropertyDAO){
        super(name,fileID,dao);
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

    setValue(val:string){
        const newPath = this.getNewFullPathWithBasename(val);
        this.dao.persist(this.fileID,this.name,newPath);
        this.value = val;
        this.fileID = newPath;
    }
}