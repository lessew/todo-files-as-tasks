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

export enum FATProperty{
    context="context",
    status="status",
    project="project",
    title="title",
    starred="starred"
}

export class FATSettings {
    [FATProperty.title]:PropertySettings;
    [FATProperty.project]:PropertySettings;
    [FATProperty.context]:PropertySettings;
    [FATProperty.starred]:PropertySettings;
    [FATProperty.status]:PropertySettings;
}

export class FileAsTask{

    static load(fullPathOfTask:string,settings:FATSettings):File{
        let pathDao:PropertyDAO = new PathPropertyDAO();
        let task = new File(fullPathOfTask,pathDao);

        let properties:Record<FATProperty, Property> = {
            [FATProperty.title]:new BasenameProperty(
                FATProperty.title,
                fullPathOfTask, 
                new PathPropertyDAO(),
                settings[FATProperty.title]),
            [FATProperty.project]:new ToplevelFolderProperty(
                FATProperty.project,
                fullPathOfTask,
                new PathPropertyDAO(),
                settings[FATProperty.project]),
            [FATProperty.starred]:new BooleanProperty(
                FATProperty.starred,
                fullPathOfTask,
                new YAMLPropertyDAO(),
                settings[FATProperty.starred]),
            [FATProperty.status]:new WhitelistProperty(
                FATProperty.status,
                fullPathOfTask,
                new YAMLPropertyDAO(),
                settings[FATProperty.status]),
            [FATProperty.context]:new WhitelistProperty(
                FATProperty.context,
                fullPathOfTask,
                new YAMLPropertyDAO(),
                settings[FATProperty.context])
        }
        task.properties = properties;
        return task;
    }

}