
export interface File{

    // used
    path:string;
    getFileName():string;
    getFileNameWithoutExtension():string;
    getYAMLProperty(name:string):string;

    // not yet used
    move(newPath:string):boolean;
    isFolder():boolean;
    isMarkdownFile():boolean;
    isFile():boolean;
    getFolderName():string;  
    setYAMLProperty(prop_name:string,prop_value:string):boolean;
    
}