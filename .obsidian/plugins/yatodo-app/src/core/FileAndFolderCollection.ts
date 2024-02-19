import { File } from "./File";
import { Folder } from "./Folder";

export abstract class FileAndFolderCollection{
    rootPath: string;
    files:File[];
    folders:Folder[]; 
    _folderBucket: any;

    constructor(){
    
    }

    build(rp:string):void{
        this.rootPath = rp;
        this.files = [];
        this.folders = [];
        this._folderBucket = {};

        const files = this.getAllMarkdowndownFiles();
        for (let i = 0; i < files.length; i++) {
            if(files[i].pathMatches(this.rootPath)){
                this.addToFileList(files[i]);
                this.addFolder(files[i].getFolderNameFromFullPath());
            }
        }
    }

    private addFolder(folderName:string){
        if(typeof this._folderBucket[folderName] === 'undefined'){
            this._folderBucket[folderName] = true;
            const folder:Folder = new Folder(folderName);
            this.folders.push(folder);
        }
    }
    
    private addToFileList(f:File){
        this.files.push(f);
    }


    abstract getAllMarkdowndownFiles():File[];

}

