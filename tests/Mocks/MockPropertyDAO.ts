import { Property } from "../../src/core/Interfaces/Property";
import { PropertyDAO } from "../../src/core/Interfaces/PropertyDAO";

export class MockPropertyDAO implements PropertyDAO{
    mockedValue:string;
        
    constructor(mockedValue:string){
        this.mockedValue = mockedValue;
    }
    
    persist(fileID:string,propertyName:string,val:string):void{
        this.mockedValue = val;
    }
    retrieve(fileID:string,propertyName:string):string{
        return this.mockedValue;
    }
    
}