
export interface File{

    // used
    path:string;
    getFileName():string;
    getFileNameWithoutExtension():string;
    getYAMLProperty(name:string):string;

    // not yet used
    move(newPath:string):void;
    isFolder():boolean;
    isMarkdownFile():boolean;
    isFile():boolean;
    getFolderName():string;  
    setYAMLProperty(prop_name:string,prop_value:string):void;
    
}