import { File } from "./File";
import { Status, Context, ValidStatusValues, ValidContextValues } from "./FilePropertyValues";

export class Task{
    private _status:Status;
    private _context:Context;
    private _title:string;
    private _project:string;
    validStatusValues:ValidStatusValues;
    validContextValues:ValidContextValues

    file:File;

    constructor(f:File,sv:ValidStatusValues,cv:ValidContextValues){
       this.file = f;
       this.validStatusValues = sv;
       this.validContextValues = cv;
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
        this.file.setYAMLProperty(ValidContextValues.fieldId,c as string);
    }

    set status(s:Status){
        this._status = s;
        this.file.setYAMLProperty(ValidStatusValues.fieldId,s as string);
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
        let result:string = this.file.getYAMLProperty(ValidStatusValues.fieldId);

        if(this.validStatusValues.isSet(result)){
            this._status = result as Status;
        }
        else{
            this._status = ValidStatusValues.INVALID_VALUE;
        }        
    }

    private deriveContextFromFile(){
        let result:string = this.file.getYAMLProperty(ValidContextValues.fieldId);

        if(this.validContextValues.isSet(result)){
            this._context = result as Context;
        }
        else{
            this._context = ValidContextValues.INVALID_VALUE;
        }
    }
}