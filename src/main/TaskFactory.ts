import { File } from "src/core/Files/File";
import { FileProperty } from "src/core/Files/FileProperty";
import { WhitelistProperty } from "src/core/Files/FileProperties/WhiteListProperty";
import { StringProperty } from "src/core/Files/FileProperties/StringProperty";
import { BooleanProperty } from "src/core/Files/FileProperties/BooleanProperty";
import { YAMLPropertyDAO } from "./YAMLPropertyDAO";
import { TopLevelFolderPropertyDAO } from "src/main/obsidian/TopLevelFolderPropertyDAO2";

export class TaskFactory{

    static createTask(fullPath:string):File{
        let task = new File(fullPath);
        task.properties = TaskFactory.getProperties();
        
        return task;
    }

    static getProperties():Record<string,FileProperty>{
        const f = new TaskFactory();

        let properties: Record<string, FileProperty> = {
            "title":f.getTitleProperty(),
            "project":f.getProjectProperty(),
            "starred":f.getStarredProperty(),
            "status":f.getStatusProperty(),
            "context":f.getContextProperty()
        }
        return properties;
    }

    getTitleProperty():StringProperty{
        let title = new StringProperty("Title");
        let dao = new YAMLPropertyDAO(title);
        title.setDAO(dao);
        return title;
    }
    
    getProjectProperty():WhitelistProperty{
        let project = new WhitelistProperty("Project");
        let dao = new TopLevelFolderPropertyDAO(this,project,this.fileSystemFacade);
        project.setDAO(dao);
        let vals = this.fileSystemFacade.getFolders();
        project.setAllowedValues(vals);
        return project;
    }

    getStarredProperty():BooleanProperty{
        let starred = new BooleanProperty("Starred");
        starred.setAllowedValues([
            "starred",
            "unstarred"
        ])
        let dao = new YAMLPropertyDAO(this,starred,this.fileSystemFacade);
        starred.setDAO(dao);
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