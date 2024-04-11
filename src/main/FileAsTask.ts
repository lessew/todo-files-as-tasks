import { File } from "../../src/core/File";
import { WhitelistProperty } from "../../src/core/Properties/WhitelistProperty";
import { BooleanProperty } from "../../src/core/Properties/BooleanProperty";
import { YAMLPropertyPerstistenceStrategy } from "./obsidian/PropertyPerstistenceStrategys/YAMLPropertyPerstistenceStrategy"
import { PathPropertyPerstistenceStrategy } from "./obsidian/PropertyPerstistenceStrategys/PathPropertyPerstistenceStrategy";
import { ToplevelFolderProperty } from "../../src/core/Properties/ToplevelFolderProperty";
import { BasenameProperty } from "../../src/core/Properties/BasenameProperty";
import { PropertyPerstistenceStrategy } from "../../src/core/Interfaces/PropertyPerstistenceStrategy";
import { Property } from "../../src/core/Property";
import { FATPROPERTY, FATProperty, FATSettings } from "./FileAsTaskSettings";

export class FileAsTask{

    static load(fullPathOfTask:string,settings:FATSettings):File{
        let pathDao:PropertyPerstistenceStrategy = new PathPropertyPerstistenceStrategy();
        let task = new File(fullPathOfTask,pathDao);

        let properties:Record<FATProperty, Property> = {
            [FATPROPERTY.title]:new BasenameProperty(
                FATPROPERTY.title,
                fullPathOfTask, 
                new PathPropertyPerstistenceStrategy(),
                settings[FATPROPERTY.title]),
            [FATPROPERTY.project]:new ToplevelFolderProperty(
                FATPROPERTY.project,
                fullPathOfTask,
                new PathPropertyPerstistenceStrategy(),
                settings[FATPROPERTY.project]),
            [FATPROPERTY.starred]:new BooleanProperty(
                FATPROPERTY.starred,
                fullPathOfTask,
                new YAMLPropertyPerstistenceStrategy(),
                settings[FATPROPERTY.starred]),
            [FATPROPERTY.status]:new WhitelistProperty(
                FATPROPERTY.status,
                fullPathOfTask,
                new YAMLPropertyPerstistenceStrategy(),
                settings[FATPROPERTY.status]),
            [FATPROPERTY.context]:new WhitelistProperty(
                FATPROPERTY.context,
                fullPathOfTask,
                new YAMLPropertyPerstistenceStrategy(),
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