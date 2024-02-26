import { File } from "./File";
import { ValidStatusValues, ValidContextValues } from "./FilePropertyValues";
import { TaskConfiguration } from "./TaskConfiguration";

export class Task{
    private _status:string;
    private _context:string;
    private _title:string;
    private _project:string;
    config:TaskConfiguration;
   
    file:File;

    constructor(f:File,configuration:TaskConfiguration){
       this.file = f;
       this.config = configuration;
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

    set context(c:string){
        this._context = c;
        this.file.setYAMLProperty(ValidContextValues.fieldId,c as string);
    }

    set status(s:string){
        this._status = s;
        this.file.setYAMLProperty(ValidStatusValues.fieldId,s as string);
    }

    get context():string{
        return this._context;
    }

    get status():string{
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

        if(this.config.validStatusValues.isSet(result)){
            this._status = result;
        }
        else{
            this._status = ValidStatusValues.INVALID_VALUE;
        }        
    }

    private deriveContextFromFile(){
        let result:string = this.file.getYAMLProperty(ValidContextValues.fieldId);

        if(this.config.validContextValues.isSet(result)){
            this._context = result;
        }
        else{
            this._context = ValidContextValues.INVALID_VALUE;
        }
    }
}