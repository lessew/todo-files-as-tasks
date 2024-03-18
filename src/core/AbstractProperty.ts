import { PropertyDAO } from "./Interfaces/PropertyDAO";
import { Property } from "./Interfaces/Property";


export abstract class AbstractProperty implements Property{
    name:string;
    fileID:string;
    dao:PropertyDAO;
    DEFAULT_VALUE: string;
    protected value:string;

    static INVALID_VALUE:string ="-invalid_value-";

    constructor(name:string,fileID:string,default_value:string,dao:PropertyDAO){
        this.name = name;
        this.dao = dao;
        this.fileID = fileID;
        this.DEFAULT_VALUE = default_value;
        return this;
    }

    getValue():string{
        if(typeof this.value === 'undefined'){
           this.initializeValue();
        }
        
        return this.value;
    }

    private initializeValue(){
        const val = this.dao.retrieve(this.fileID,this.name)
        if(!this.validate(val)){
            this.value = this.DEFAULT_VALUE;
        }
        else{
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

