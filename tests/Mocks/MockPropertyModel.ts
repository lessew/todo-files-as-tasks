import { PropertyModel } from "../../src/core/Interfaces/PropertyModel";

export class MockPropertyModel implements PropertyModel{
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