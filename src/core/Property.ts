import { PropertyModel } from "./Interfaces/PropertyModel";
import { PropertySettings } from "./PropertySettings";

export abstract class Property{
    name:string;
    fileID:string;
    dao:PropertyModel;
    _loadedValueIsValid:boolean;
    settings:PropertySettings;
    protected value:string;

    static INVALID_VALUE:string ="-invalid_value-";

    constructor(name:string,fileID:string,dao:PropertyModel,settings:PropertySettings){
        this.name = name;
        this.dao = dao;
        this.fileID = fileID;
        this.settings = settings;
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

    async setValue(val:string):Promise<void>{
        if(this.validate(val)){
            this.value = val;
            await this.dao.persist(this.fileID,this.name,this.getValue());
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