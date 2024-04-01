import { File } from "src/core/File";
import { WhitelistProperty } from "src/core/Properties/WhitelistProperty";
import { BooleanProperty } from "src/core/Properties/BooleanProperty";
import { YAMLPropertyDAO } from "./obsidian/PropertyDAOs/YAMLPropertyDAO";
import { PathPropertyDAO } from "./obsidian/PropertyDAOs/PathPropertyDAO";
import { ToplevelFolderProperty } from "src/core/Properties/ToplevelFolderProperty";
import { BasenameProperty } from "src/core/Properties/BasenameProperty";
import { PropertyDAO } from "src/core/Interfaces/PropertyDAO";
import { PropertySettings } from "src/core/PropertySettings";
import { Property } from "src/core/Property";

export const FATPROPERTY = {
    context:"context",
    status:"status",
    project:"project",
    title:"title",
    starred:"starred"
} as const;

type ObjectValues<T> = T[keyof T];
type FATProperty = ObjectValues<typeof FATPROPERTY>;


export class FATSettings {
    [FATPROPERTY.title]:PropertySettings;
    [FATPROPERTY.project]:PropertySettings;
    [FATPROPERTY.context]:PropertySettings;
    [FATPROPERTY.starred]:PropertySettings;
    [FATPROPERTY.status]:PropertySettings;
}


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

}