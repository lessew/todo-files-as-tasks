import { File } from "./File";
import { Status, Context, FilePropertiesMap } from "./FileProperties";

export class Todo{
    status:Status | false;
    context:Context | false;
    private _title:string;
    project:string;
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

    set title(title:string){
        this._title = title;
        this.file.setBasename(title);
    }

    private deriveProjectFromFile(){
        this.project = this.file.getFolderNameFromFullPath();
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
            this.context = result as Context;
        }
        else{
            this.context = false;
            //throw error(`Context ${result} is a non valid status. Error`)
        }
    }
}