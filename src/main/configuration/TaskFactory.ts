import { Property } from "src/core/Interfaces/Property";
import { File } from "src/core/File";
import { WhitelistProperty } from "src/core/Properties/WhitelistProperty";
import { BooleanProperty } from "src/core/Properties/BooleanProperty";
import { YAMLPropertyDAO } from "../obsidian/PropertyDAOs/YAMLPropertyDAO";
import { PathPropertyDAO } from "../obsidian/PropertyDAOs/PathPropertyDAO";
import { ToplevelFolderProperty } from "src/core/Properties/ToplevelFolderProperty";
import { FolderList } from "../obsidian/FolderList";
import { BasenameProperty } from "src/core/Properties/BasenameProperty";

export class TaskFactory{
    rootFolder:string;
    noneCharacter:string = "∅";
    invalidCharacter:string = "⊕";

    constructor(rootFolder:string){
        this.rootFolder = rootFolder;
    }

    static loadTask(fullPathOfTask:string,folderList:FolderList):File{
        let task = new File(fullPathOfTask);
        task.properties = TaskFactory.getProperties(fullPathOfTask,folderList);
        return task;
    }

    static getProperties(fullPathOfTask:string,folderList:FolderList):Record<string, Property>{
        let properties: Record<string, Property> = {
            "title":TaskFactory.getTitleProperty(fullPathOfTask),
            "project":TaskFactory.getProjectProperty(fullPathOfTask,folderList),
            "starred":TaskFactory.getStarredProperty(fullPathOfTask),
            "status":TaskFactory.getStatusProperty(fullPathOfTask),
            "context":TaskFactory.getContextProperty(fullPathOfTask)
        }
        return properties;
    }

    static getTitleProperty(fullPathOfTask:string):BasenameProperty{
        let dao = new PathPropertyDAO();
        let title = new BasenameProperty("Title",fullPathOfTask, dao);
        return title;
    }
    
    static getProjectProperty(fullPathOfTask:string,folderList:FolderList):ToplevelFolderProperty{
        let dao = new PathPropertyDAO();
        let projects = folderList.folders;
        let project = new ToplevelFolderProperty("Project",fullPathOfTask,dao,projects);
        return project;
    }

    static getStarredProperty(fullPathOfTask:string):BooleanProperty{
        let dao = new YAMLPropertyDAO();
        let starred = new BooleanProperty("Starred",fullPathOfTask,dao,["⭐","✰"]);
        return starred;
    }

    static getStatusProperty(fullPathOfTask:string):WhitelistProperty{
        let dao = new YAMLPropertyDAO();
        let status = new WhitelistProperty("Status",fullPathOfTask,dao,[
            "Inbox",
            "Next",
            "Deferred",
            "Waiting",
            "Done"
        ]);
        return status;
    }

    static getContextProperty(fullPathOfTask:string):WhitelistProperty{
        let dao = new YAMLPropertyDAO();
        let context = new WhitelistProperty("Context",fullPathOfTask,dao,[
            "Desk",
            "Deep",
            "Phone",
            "Read",
            "None"
        ]);
        return context;
    }
}