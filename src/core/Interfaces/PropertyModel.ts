export interface PropertyModel{
    persist(fileID:string,propertyName:string,val:string):Promise<void> | void;
    retrieve(fileID:string,propertyName:string):string;
}