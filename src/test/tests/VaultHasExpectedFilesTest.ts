import { assert } from "console";
import { Logger } from "../Logger";
import { getExpectedFolders, getSettings, getYamlListAllFiles } from "../MockItems";
import { Settings } from "src/core/FileAsTaskSettings";
import { YAMLParser } from "src/core/YAMLParser";
import { FATError } from "src/core/Error";
import { ObsidianFile } from "src/main/obsidian/ObsidianFile";
import { FolderList } from "src/core/FolderList";
import { ObsidianFolder } from "src/main/obsidian/ObsidianFolder";
import { FolderModel } from "src/core/Interfaces/FolderModel";
import { Assertions, assertFolderList } from "../Assertions";

export class VaultHasExpectedFilesTest{
    logger:Logger;
    yaml:string;
    settings:Settings;
    parser:YAMLParser;
    rootPath:string;
    rootFolder:FolderModel;
    folders:FolderModel[];

    constructor(logger:Logger){
        this.logger = logger;
        return this;
    }

    test():VaultHasExpectedFilesTest{
        this.logger.log("Setting up test VaultHasExpectedFiles")
        this.arrange();
        this.act();
        this.assert();
        return this;
    }

    arrange(){ 
        this.logger.log("Arranging");
        this.yaml = getYamlListAllFiles();
        this.settings = getSettings();
    }

    act(){
        this.logger.log("Acting")

        this.actLoadYAML();
        this.actLoadFolders();
       
    }

    actLoadYAML(){
        this.parser = new YAMLParser();
        const isLoaded = this.parser.loadSource(this.yaml);
        if(FATError.isError(isLoaded)){
            this.logger.error("Parsing YAML failed");
            return;
        }
       const root = this.parser.parseRootPath();
        if(FATError.isError(root)){
            this.logger.error("Parsing root failed")
            return;
        }
        this.rootPath = root;
    }

    actLoadFolders(){
        this.rootFolder = new ObsidianFolder(this.rootPath);
        const folders = FolderList.getFolders(this.rootFolder);
        this.folders = folders;
    }

    assert(){
        this.logger.log("Asserting");
        this.assertFolderList()
        this.assertFileList();
    }

    assertFolderList(){
        const expectedFolders = getExpectedFolders();
        const actualFolders = FolderList.getFoldersAsWhitelist(this.rootFolder);
        if(expectedFolders.length == actualFolders.size()){
            this.logger.success("Right amount of folders found")
        }
        else{
            this.logger.error(`Found ${actualFolders.size()} folders but expected ${expectedFolders.length}`)
            return;
        }

        for(let i=0;i<expectedFolders.length;i++){
            if(!actualFolders.contains(expectedFolders[i]){
                this.logger.error(`${expectedFolders[i]} does not seem to exists as folder`)
                return;
            }
        }
    }

    assertFileList(){

    }

}