import { timeStamp } from "console";
import { File } from "./File";
import { Status, Context, StatusValues, ContextValues } from "./FileProperties";
import { YaTodoApp } from "./YaTodoApp";

export class Todo{
    private _status:Status;
    private _context:Context;
    private _title:string;
    private _project:string;
    private statusValues:StatusValues;
    private contextValues:ContextValues

    file:File;

    constructor(f:File,statusValues:StatusValues,contextValues:ContextValues){
       this.file = f;
       this.statusValues = statusValues;
       this.contextValues = contextValues;
       this.deriveTitleFromFile();
       this.deriveContextFromFile();
       this.deriveStatusFromFile();
       this.deriveProjectFromFile();
    }

    get title():string{
        return this._title;
    }

    get project():string{
        return this._project;
    }

    set project(folderName:string){
        this.file.moveToNewToplevelFolder(folderName);
        this._project = folderName;
    }

    // TODO: rename. does 2 things, hidden file renaming. code smell.
    set title(title:string){
        this._title = title;
        this.file.setBasename(title);
    }

    set context(c:Context){
        this._context = c;
        this.file.setYAMLProperty(ContextValues.fieldId,c as string);
    }

    set status(s:Status){
        this._status = s;
        this.file.setYAMLProperty(StatusValues.fieldId,s as string);
    }

    get context():Context{
        return this._context;
    }

    get status():Status{
        return this._status;
    }

    private deriveProjectFromFile(){
        this._project = this.file.getFolderNameFromFullPath();
    }

    private deriveTitleFromFile(){
        const basename = this.file.getBasenameFromFullPath();
        this._title = basename;
    }

    private deriveStatusFromFile(){
        let result:string = this.file.getYAMLProperty(StatusValues.fieldId);

        if(this.statusValues.isSet(result)){
            this._status = result as Status;
        }
        else{
            this._status = StatusValues.INVALID_VALUE;
        }        
    }

    private deriveContextFromFile(){
        let result:string = this.file.getYAMLProperty(ContextValues.fieldId);

        if(this.contextValues.isSet(result)){
            this._context = result as Context;
        }
        else{
            this._context = ContextValues.INVALID_VALUE;
        }
    }
}