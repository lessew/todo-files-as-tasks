import { PropertyDAO } from "./Interfaces/PropertyDAO";
import { Property } from "./Interfaces/Property";

// TODO merge interface into abstract class, rename abstract class to Proprty
export abstract class AbstractProperty implements Property{
    name:string;
    fileID:string;
    dao:PropertyDAO;
    _loadedValueIsValid:boolean;
    protected value:string;

    static INVALID_VALUE:string ="-invalid_value-";

    constructor(name:string,fileID:string,dao:PropertyDAO){
        this.name = name;
        this.dao = dao;
        this.fileID = fileID;
        return this;
    }

    loadedValueIsValid():boolean{
        return this._loadedValueIsValid;
    }

    isEmptyValue():boolean{
        if(this.getValue()==""){
            return true;
        }
        else{
            return false;
        }
    }

    getValue():string{
        if(typeof this.value === 'undefined'){
           this.initializeValue();
        }
        
        return this.value;
    }

    initializeValue():void{
        const val = this.dao.retrieve(this.fileID,this.name)
        if(!this.validate(val) && val!=""){
            this.value = "";
            this._loadedValueIsValid = false;
        }
        else{
            this._loadedValueIsValid = true;
            this.value = val;
        }
    }

    setValue(val:string){
        if(this.validate(val)){
            this.value = val;
            this.dao.persist(this.fileID,this.name,this.getValue());
        }
    }

    matches(needle:string):boolean{
        if(this.getValue()!==undefined){
            return this.getValue().startsWith(needle);
        }
        return false;
    }

    abstract validate(newValue:string):boolean;
}