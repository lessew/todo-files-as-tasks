import { File } from "./File";
import { ValidStatusValues, ValidContextValues, ValidStarredValues } from "./FilePropertyValues";
import { TaskConfiguration } from "./TaskConfiguration";
import { FileSystem } from "./FileSystem";

export class Task{
    private _status:string;
    private _context:string;
    private _title:string;
    private _project:string;
    private _starred:string;

    config:TaskConfiguration;
   
    file:File;

    constructor(f:File,configuration:TaskConfiguration){
       this.file = f;
       this.config = configuration;
       this.deriveTitleFromFile();
       this.deriveContextFromFile();
       this.deriveStatusFromFile();
       this.deriveProjectFromFile();
       this.deriveStarredFromFile();
    }

    static async createTask(title:string,project:string,config:TaskConfiguration,fileSystem:FileSystem):Promise<void>{
        const path = fileSystem.rootPath + "/" + project + "/" + title + ".md";
        const file:File = await fileSystem.createMarkdownFile(path);
        let aTask = new Task(file,config);
        aTask.context = config.validContextValues.default;
        aTask.status = config.validStatusValues.default;
        aTask.starred = config.validStarredValues.default;
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

    set title(title:string){
        this._title = title;
        this.file.setBasename(title);
    }

    set starred(s:string){
        this._starred = s;
        this.file.setYAMLProperty(ValidStarredValues.fieldId,s);
    }

    toggleStarred(){
        const vals:string[] = this.config.validStarredValues.getAllIds();
        let newVal:string;
        if(vals.length!=2){
            throw Error("starred property not set correctly, can only toggle between 2 possible values")
        }
        if(this._starred == vals[0]){
            newVal = vals[1];
        }
        else if(this._starred == vals[1]){
            newVal = vals[0];
        }
        else{
            newVal = vals[0];
        }
        this.starred = newVal;

    }

    set context(c:string){
        this._context = c;
        this.file.setYAMLProperty(ValidContextValues.fieldId,c);
    }

    set status(s:string){
        this._status = s;
        this.file.setYAMLProperty(ValidStatusValues.fieldId,s);
    }

    get starred():string{
        return this._starred;
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

    private deriveStarredFromFile(){
        let result:string = this.file.getYAMLProperty(ValidStarredValues.fieldId);

        if(this.config.validStarredValues.isSet(result)){
            this._starred = result;
        }
        else{
            this._starred = ValidStarredValues.INVALID_VALUE;
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