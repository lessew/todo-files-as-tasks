import { TFile, TFolder } from "obsidian";
import { ObsidianWrapper } from "./ObsidianWrapper";
import { FileAsTask } from "../FileAsTask";
import { File } from "src/core/File";
import { FileListDAO } from "src/core/Interfaces/FileListDAO";
import { FATSettings } from "../FileAsTaskSettings";

export class FileList implements FileListDAO{
    files:File[];

    init(rootPath:string,settings:FATSettings):void{
        const wrapper = ObsidianWrapper.getInstance();
                
        const root = wrapper.getTFolder(rootPath);
        let tFiles:TFile[] = [];
        if(root instanceof TFolder){
            tFiles = FileList.getAllFilesFromRootPath(root);
        }
        else{
            throw Error("RootPath is not a folder");
        }
        this.files = FileList.loadAllFilesAsTasks(tFiles,settings);
    }

    static loadAllFilesAsTasks(tFiles:TFile[],settings:FATSettings):File[]{
        let files:File[] = [];
        tFiles.forEach(aFile => {
            const newFile:File = FileAsTask.load(aFile.path,settings);
            if(newFile.isMarkdownFile()){
                files.push(newFile);
            }
        });
        return files;
    }

    static getAllFilesFromRootPath(folder:TFolder):TFile[]{
        let files:TFile[] = [];
        folder.children.forEach((child) => {
            if(child instanceof TFolder){
                const filesInFolder = FileList.getAllFilesFromRootPath(child);                
                files = [...files, ...filesInFolder];
            }
            else{
                files.push(child as TFile);
            }
        });
        return files;
    }

}