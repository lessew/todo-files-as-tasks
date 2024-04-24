
export interface PropertySettings {
    propName:string,
    defaultValue:string;
    adaptToProperty(file:FileModel):Property;
}