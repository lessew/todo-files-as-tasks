import { assert } from "console";
import { Logger } from "../Logger";
import { getExpectedFiles, getExpectedFolders, getSettings, getYamlListAllFiles,ExpectedFileType } from "../MockItems";
import { Settings } from "src/core/Settings";
import { YAMLParser } from "src/core/YAMLParser";
import { FATError } from "src/core/Error";
import { FolderList } from "src/core/FolderList";
import { ObsidianFolder } from "src/main/obsidian/ObsidianFolder";
import { FolderModel } from "src/core/Interfaces/FolderModel";
import { FileList } from "src/core/FileList";
import { FileAsTask } from "src/core/FileAsTask";

export class VaultHasExpectedFilesTest{
    logger:Logger;
    yaml:string;
    settings:Settings;
    parser:YAMLParser;
    rootPath:string;
    rootFolder:FolderModel;
    folders:FolderModel[];
    result:boolean;
    tasks:FileAsTask[];

    constructor(logger:Logger){
        this.logger = logger;
        return this;
    }

    test():VaultHasExpectedFilesTest{
        this.logger.heading("Testing VaultHasExpectedFiles")
        this.arrange();
        this.act();
        this.assert();
        if(this.result!=false){
            this.result = true;
        }
        else{
            this.logger.error("ERROR some tests did not run successfully, aborting")
        }

        return this;
    }

    arrange(){ 
        this.logger.headingSub("Arranging");
        this.yaml = getYamlListAllFiles();
        this.settings = getSettings();
        this.logger.success("Completed setting up")
    }

    act(){
        this.logger.headingSub("Acting")
        this.actLoadYAML();
        this.actLoadFolders();
        this.actLoadFiles();
       
    }

    assert(){
        this.logger.headingSub("Asserting");
        this.assertFolderList()
        this.assertFileList();
    }

    actLoadYAML(){
        this.parser = new YAMLParser();
        const isLoaded = this.parser.loadSource(this.yaml);
        if(FATError.isError(isLoaded)){
            this.logger.error("Parsing YAML failed");
            this.setFailure();
            return;
        }
       const root = this.parser.parseRootPath();
        if(FATError.isError(root)){
            this.logger.error("Parsing root failed")
            this.setFailure();
            return;
        }
        this.rootPath = root;
        this.logger.success("Successfully loaded YAML")
    }

    actLoadFolders(){
        this.rootFolder = new ObsidianFolder(this.rootPath);
        const folders = FolderList.getFolders(this.rootFolder);
        this.folders = folders;
        this.settings.project.whitelist = FolderList.getFoldersAsWhitelist(this.rootFolder);
        this.logger.success("Successfully loaded folders")
    }

    actLoadFiles(){
        this.tasks = FileList.getFilesAsTasks(this.rootFolder,this.settings);
        this.logger.success("Successfully loaded tasks")
    }


    assertFolderList(){
        const expectedFolders = getExpectedFolders();
        const actualFolders = FolderList.getFoldersAsWhitelist(this.rootFolder);
        if(expectedFolders.length == actualFolders.size()){
            this.logger.success("Right amount of folders found")
        }
        else{
            this.logger.error(`Found ${actualFolders.size()} folders but expected ${expectedFolders.length}`)
            this.setFailure();
            return;
        }

        for(let i=0;i<expectedFolders.length;i++){
            if(!actualFolders.contains(expectedFolders[i])){
                this.logger.error(`${expectedFolders[i]} does not seem to exists as folder`)
                this.setFailure();
                return;
            }
            else{
                this.logger.success(`Folder '${expectedFolders[i]}' was found`)
            }
        }
    }

    assertFileList(){
        const expectedFiles = getExpectedFiles();
        if(this.tasks.length != expectedFiles.length){
            this.logger.error(`Expected ${expectedFiles.length} files but found ${this.tasks.length}`);
            this.setFailure();
            return;
        }
        else{
            this.logger.success(`Right amount of files found: ${this.tasks.length}`)
        }
        for(let i=0;i<expectedFiles.length;i++){
            const expectedNeedle = expectedFiles[i];
            const foundNeedle = this.tasks.find((aTask) => {
                return aTask.file.path == expectedNeedle.path;
            })
            this.logger.headingSubSub(`Testing file ${expectedNeedle.title}`);
            if(foundNeedle==undefined){
                this.logger.error(`Could not find file ${expectedFiles[i].path}`)
                this.result = false;
                return;
            }
            this.logger.success(`Found file ${expectedFiles[i].path}`)
           
            this.assertSingleTask(expectedNeedle,foundNeedle);

        }
    }

    assertSingleTask(expectedFile:ExpectedFileType,actualTask:FileAsTask){
        this.assertSinglePropertyValue("project",actualTask,expectedFile.project);
        this.assertSinglePropertyValue("title",actualTask,expectedFile.title);
        this.assertSinglePropertyValue("status",actualTask,expectedFile.yaml.status!);
        this.assertSinglePropertyValue("context",actualTask,expectedFile.yaml.context!);
        this.assertSinglePropertyValue("starred",actualTask,expectedFile.yaml.starred!);
    }

    assertSinglePropertyValue(propName:string,aTask:FileAsTask,expectedValue:string){
        if(aTask.get(propName) != expectedValue){
            this.setFailure();
            this.logger.error(`Looked in property ${propName} for value ${expectedValue} but found ${aTask.get(propName)} in file ${aTask.file.path}`)
        }
        else{
            this.logger.success(`Found value ${expectedValue} in ${propName}`);
        }
    }

    setFailure():void{
        this.result = false;
    }

    isSuccess():boolean{
        return (this.result === true);
    }

}