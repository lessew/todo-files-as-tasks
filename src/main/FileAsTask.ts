import { Property } from "src/core/Interfaces/Property";
import { File } from "src/core/File";
import { WhitelistProperty } from "src/core/Properties/WhitelistProperty";
import { BooleanProperty } from "src/core/Properties/BooleanProperty";
import { YAMLPropertyDAO } from "./obsidian/PropertyDAOs/YAMLPropertyDAO";
import { PathPropertyDAO } from "./obsidian/PropertyDAOs/PathPropertyDAO";
import { ToplevelFolderProperty } from "src/core/Properties/ToplevelFolderProperty";
import { FolderList } from "./obsidian/FolderList";
import { BasenameProperty } from "src/core/Properties/BasenameProperty";
import { FATPluginSettings } from "src/core/Interfaces/FATPluginSettings";
import { PropertyDAO } from "src/core/Interfaces/PropertyDAO";

export type FileAsTaskProperties = "context" | "status" | "project" | "title" | "starred";

export class FileAsTask{

    static load(fullPathOfTask:string,settings:FATPluginSettings,folderList:FolderList):File{
        let pathDao:PropertyDAO = new PathPropertyDAO();
        let task = new File(fullPathOfTask,pathDao);
        let properties:Record<FileAsTaskProperties, Property> = {
            "title":new BasenameProperty("title",fullPathOfTask, new PathPropertyDAO()),
            "project":new ToplevelFolderProperty("project",fullPathOfTask,new PathPropertyDAO(),folderList.folders),
            "starred":new BooleanProperty("starred",fullPathOfTask,new YAMLPropertyDAO(),settings.starredValues.split(",")),
            "status":new WhitelistProperty("status",fullPathOfTask,new YAMLPropertyDAO(),settings.statusValues.split(",")),
            "context":new WhitelistProperty("context",fullPathOfTask,new YAMLPropertyDAO(),settings.contextValues.split(","));
        }
        task.properties = properties;

        return task;
    }

}