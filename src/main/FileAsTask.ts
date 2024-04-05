import { File } from "../../src/core/File";
import { WhitelistProperty } from "../../src/core/Properties/WhitelistProperty";
import { BooleanProperty } from "../../src/core/Properties/BooleanProperty";
import { YAMLPropertyDAO } from "./obsidian/PropertyDAOs/YAMLPropertyDAO";
import { PathPropertyDAO } from "./obsidian/PropertyDAOs/PathPropertyDAO";
import { ToplevelFolderProperty } from "../../src/core/Properties/ToplevelFolderProperty";
import { BasenameProperty } from "../../src/core/Properties/BasenameProperty";
import { PropertyDAO } from "../../src/core/Interfaces/PropertyDAO";
import { Property } from "../../src/core/Property";
import { FATPROPERTY, FATProperty, FATSettings } from "./FileAsTaskSettings";
import { ObsidianFileDAO } from "./obsidian/ObsidianFileDAO";
import { ObsidianWrapper } from "./obsidian/ObsidianWrapper";

export class FileAsTask{

    static load(fullPathOfTask:string,settings:FATSettings):File{
        let pathDao:PropertyDAO = new PathPropertyDAO();
        let task = new File(fullPathOfTask,pathDao);

        let properties:Record<FATProperty, Property> = {
            [FATPROPERTY.title]:new BasenameProperty(
                FATPROPERTY.title,
                fullPathOfTask, 
                new PathPropertyDAO(),
                settings[FATPROPERTY.title]),
            [FATPROPERTY.project]:new ToplevelFolderProperty(
                FATPROPERTY.project,
                fullPathOfTask,
                new PathPropertyDAO(),
                settings[FATPROPERTY.project]),
            [FATPROPERTY.starred]:new BooleanProperty(
                FATPROPERTY.starred,
                fullPathOfTask,
                new YAMLPropertyDAO(),
                settings[FATPROPERTY.starred]),
            [FATPROPERTY.status]:new WhitelistProperty(
                FATPROPERTY.status,
                fullPathOfTask,
                new YAMLPropertyDAO(),
                settings[FATPROPERTY.status]),
            [FATPROPERTY.context]:new WhitelistProperty(
                FATPROPERTY.context,
                fullPathOfTask,
                new YAMLPropertyDAO(),
                settings[FATPROPERTY.context])
        }
        task.properties = properties;
        return task;
    }

    // TODO fix create method. default value properties are not saved, file is not created and no error message displayed
    static async create(project:string,title:string,settings:FATSettings):Promise<void>{
        // TODO: rootPath was removed in obsidianwrapper, find another way
        /*
        let dao = new ObsidianFileDAO();
        const path = ObsidianWrapper.getInstance().rootPath + "/" + project + "/" + title + ".md";
        await dao.createMarkdownFile(path);
        let file:File = FileAsTask.load(path,settings);

        //let property: keyof typeof setting;
        for(let propName in settings){
            let val = settings[propName as FATProperty].defaultValue;
            file.properties[propName].setValue(val);
        }
        */
    }

}