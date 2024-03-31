import { PropertyDAO } from "../../src/core/Interfaces/PropertyDAO";

export class MockPropertyDAO implements PropertyDAO{
    mockedValue:string;
    propertyNameExists:boolean = true;
        
    constructor(mockedValue:string){
        this.mockedValue = mockedValue;
    }

    setPropertyNameToNotExist():void{
        this.propertyNameExists = false;
    }
    
    persist(fileID:string,propertyName:string,val:string):void{
        this.mockedValue = val;
    }
    
    retrieve(fileID:string,propertyName:string):string{
        if(this.propertyNameExists){
            return this.mockedValue;
        }
        else {
            return "";
        }
    }
    
}