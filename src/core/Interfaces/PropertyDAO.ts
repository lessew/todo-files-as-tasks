export interface PropertyDAO{
    persist(fileID:string,propertyName:string,val:string):void;
    retrieve(fileID:string,propertyName:string):string;
}