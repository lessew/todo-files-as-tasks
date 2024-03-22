import { Property } from "src/core/Interfaces/Property";
import { File } from "src/core/File";
import { WhitelistProperty } from "src/core/Properties/WhitelistProperty";
import { BooleanProperty } from "src/core/Properties/BooleanProperty";
import { YAMLPropertyDAO } from "./obsidian/PropertyDAOs/YAMLPropertyDAO";
import { PathPropertyDAO } from "./obsidian/PropertyDAOs/PathPropertyDAO";
import { ToplevelFolderProperty } from "src/core/Properties/ToplevelFolderProperty";
import { FolderList } from "./obsidian/FolderList";
import { BasenameProperty } from "src/core/Properties/BasenameProperty";
import { YaTodoPluginSettings } from "src/core/Interfaces/Settings";
import { PropertyDAO } from "src/core/Interfaces/PropertyDAO";

export class Task{

    static load(fullPathOfTask:string,settings:YaTodoPluginSettings,folderList:FolderList):File{
        let pathDao:PropertyDAO = new PathPropertyDAO();
        let task = new File(fullPathOfTask,pathDao);
        task.properties = Task.getProperties(fullPathOfTask,settings,folderList);
        return task;
    }

    static getProperties(fullPathOfTask:string,settings:YaTodoPluginSettings,folderList:FolderList):Record<string, Property>{
        let properties: Record<string, Property> = {
            "title":Task.getTitleProperty(fullPathOfTask),
            "project":Task.getProjectProperty(fullPathOfTask,folderList),
            "starred":Task.getStarredProperty(fullPathOfTask,settings.starredValues),
            "status":Task.getStatusProperty(fullPathOfTask,settings.statusValues),
            "context":Task.getContextProperty(fullPathOfTask,settings.contextValues)
        }
        return properties;
    }

    static getTitleProperty(fullPathOfTask:string):BasenameProperty{
        let dao = new PathPropertyDAO();
        let title = new BasenameProperty("title",fullPathOfTask, dao);
        return title;
    }
    
    static getProjectProperty(fullPathOfTask:string,folderList:FolderList):ToplevelFolderProperty{
        let dao = new PathPropertyDAO();
        let projects = folderList.folders;
        let project = new ToplevelFolderProperty("project",fullPathOfTask,dao,projects);
        return project;
    }

    static getStarredProperty(fullPathOfTask:string,values:string):BooleanProperty{
        let dao = new YAMLPropertyDAO();
        let vals = values.split(",");
        let starred = new BooleanProperty("starred",fullPathOfTask,dao,vals);
        return starred;
    }

    static getStatusProperty(fullPathOfTask:string,values:string):WhitelistProperty{
        let dao = new YAMLPropertyDAO();
        let vals = values.split(",");
        let status = new WhitelistProperty("status",fullPathOfTask,dao,vals);
        return status;
    }

    static getContextProperty(fullPathOfTask:string,values:string):WhitelistProperty{
        let dao = new YAMLPropertyDAO();
        let vals = values.split(",");
        let context = new WhitelistProperty("context",fullPathOfTask,dao,vals);
        return context;
    }
}