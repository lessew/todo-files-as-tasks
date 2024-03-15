import { Property } from "src/core/Interfaces/Property";
import { File,WhitelistProperty,StringProperty,BooleanProperty } from "src/core/core-module";
import { YAMLPropertyDAO,PathPropertyDAO,ObsidianWrapper } from "../obsidian/obsidian-module";
import { ToplevelFolderProperty } from "src/core/Properties/ToplevelFolderProperty";

export class TaskFactory{

    wrapper:ObsidianWrapper;
    fullPath:string;

    constructor(wrapper:ObsidianWrapper,fullPath:string){
        this.wrapper = wrapper;
        this.fullPath = fullPath;
    }

    static loadTask(fullPath:string):File{
        let task = new File(fullPath);
        task.properties = TaskFactory.getProperties(fullPath);
        
        return task;
    }

    static getProperties(fullPath:string):Record<string,Property>{
        const wrapper = ObsidianWrapper.getInstance();
        const f = new TaskFactory(wrapper,fullPath);

        let properties: Record<string, Property> = {
            "title":f.getTitleProperty(),
            "project":f.getProjectProperty(),
            "starred":f.getStarredProperty(),
            "status":f.getStatusProperty(),
            "context":f.getContextProperty()
        }
        return properties;
    }

    getTitleProperty():StringProperty{
        let dao = new YAMLPropertyDAO();
        let title = new StringProperty("Title",this.fullPath,dao);
        return title;
    }
    
    getProjectProperty():ToplevelFolderProperty{
        let dao = new PathPropertyDAO();
        let projects = this.wrapper.getFolders();
        let project = new ToplevelFolderProperty("Project",this.fullPath,dao,projects);
        return project;
    }

    getStarredProperty():BooleanProperty{
        let dao = new YAMLPropertyDAO();
        let starred = new BooleanProperty("Starred",this.fullPath,dao,["starred","unstarred"]);
        return starred;
    }

    getStatusProperty():WhitelistProperty{
        let dao = new YAMLPropertyDAO();
        let status = new WhitelistProperty("Status",this.fullPath,dao,[
            "Inbox",
            "Next",
            "Deferred",
            "Waiting",
            "Done"
        ]);
        return status;
    }

    getContextProperty():WhitelistProperty{
        let dao = new YAMLPropertyDAO();
        let context = new WhitelistProperty("Context",this.fullPath,dao,[
            "Desk",
            "Deep",
            "Phone",
            "Read"
        ]);
        return context;
    }
}