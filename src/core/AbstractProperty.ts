import { File } from "./Files/File";
import { PropertyDAO } from "./Interfaces/PropertyDAO";
import { Property } from "./Interfaces/Property";


export abstract class AbstractProperty implements Property{
    name:string;
    fileID:string;
    dao:PropertyDAO;
    _value:string;

    static INVALID_VALUE:string ="-invalid_value-";

    constructor(name:string,fileID:string,dao:PropertyDAO){
        this.name = name;
        this.dao = dao;
        this.fileID = fileID;
        return this;
    }

    get value():string{
        if(typeof this._value === 'undefined'){
           this.initializeValue();
        }
        
        return this._value;
    }

    private initializeValue(){
        const val = this.dao.retrieve(this.fileID,this.name)
        if(!this.validate(val)){
            this._value = AbstractProperty.INVALID_VALUE;
        }
        else{
            this._value = val;
        }
    }

    set value(val:string){
        if(this.validate(val)){
            this._value = val;
            this.dao.persist(this.fileID,this.name,this._value);
        }
    }

    matches(needle:string):boolean{
        if(this.value!==undefined){
            return this.value.startsWith(needle);
        }
        return false;
    }

    abstract validate(newValue:string):boolean;
   }

