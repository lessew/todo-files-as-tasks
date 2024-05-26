export interface FileSystem{
    move(currentPath:string,newPath:string):Promise<void>;
    readDir(path:string):string[];
    pathIsFile(path:string):boolean;
    pathIsDirectory(path:string):boolean;
    getYAMLProperty(path:string,propName:string):string | null;
    setYAMLProperty(path:string,propName:string,propValue:string):Promise<void>;

}