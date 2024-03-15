import { Property } from "src/core/Interfaces/Property";
import { File,WhitelistProperty,StringProperty,BooleanProperty } from "src/core/core-module";
import { YAMLPropertyDAO,PathPropertyDAO,ObsidianWrapper } from "../main/obsidian/obsidian-module";

export class TaskFactory{

    wrapper:ObsidianWrapper;
    fullPath:string;

    constructor(wrapper:ObsidianWrapper,fullPath:string){
        this.wrapper = wrapper;
        this.fullPath = fullPath;
    }

    static createTask(fullPath:string):File{
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
    
    getProjectProperty():WhitelistProperty{
        let dao = new PathPropertyDAO();
        let projects = this.wrapper.getFolders();
        let project = new WhitelistProperty("Project",this.fullPath,dao,projects);
        project.setAllowedValues(projects);
        return project;
    }

    getStarredProperty():BooleanProperty{
        let dao = new YAMLPropertyDAO();
        let starred = new BooleanProperty("Starred",);
        starred.setAllowedValues([
            "starred",
            "unstarred"
        ])
        return starred;
    }

    getStatusProperty():WhitelistProperty{
        let status = new WhitelistProperty("Status");
        status.setAllowedValues([
            "Inbox",
            "Next",
            "Deferred",
            "Waiting",
            "Done"
        ]);
        let dao = new YAMLPropertyDAO(this,status,this.fileSystemFacade);
        status.setDAO(dao);

        return status;
    }

    getContextProperty():WhitelistProperty{
        let context = new WhitelistProperty("Context");
        context.setAllowedValues([
            "Desk",
            "Deep",
            "Phone",
            "Read"
        ]);
        let dao = new YAMLPropertyDAO(this,context,this.fileSystemFacade);
        context.setDAO(dao);
        return context;
    }
}