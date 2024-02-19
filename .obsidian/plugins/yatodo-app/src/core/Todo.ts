import { File } from "./File";
import { Status, Context, FilePropertiesMap } from "./FileProperties";

export class Todo{
    status:Status | false;
    private _context:Context | false;
    private _title:string;
    private _project:string;
    file:File;

    constructor(f:File){
       this.file = f;
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
        this.file.setYAMLProperty("context",c as string);
    }

    get context():Context | false{
        return this._context;
    }

    private deriveProjectFromFile(){
        this._project = this.file.getFolderNameFromFullPath();
    }

    private deriveTitleFromFile(){
        const basename = this.file.getBasenameFromFullPath();
        //const title = filename.split(".")[0];
        this._title = basename;
    }

    private deriveStatusFromFile(){
        let result:string = this.file.getYAMLProperty(FilePropertiesMap.status);
        if(result in Status){
            this.status = result as Status;
        }
        else{
            this.status = false;
            //throw error(`Status ${result} is a non valid status. Error`)
        }
    }

    private deriveContextFromFile(){
        let result:string = this.file.getYAMLProperty(FilePropertiesMap.context);
        if(result in Context){ // only works without spaces in context
            this._context = result as Context;
        }
        else{
            this._context = false;
            //throw error(`Context ${result} is a non valid status. Error`)
        }
    }
}