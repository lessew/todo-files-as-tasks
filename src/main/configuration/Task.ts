import { File } from "src/core/Files/File";
import { FileSystemFacade } from "src/core/Files/FileSystemFacade";
import { FileProperty } from "src/core/Files/FileProperty";
import { WhitelistProperty } from "src/core/Files/FileProperties/WhiteListProperty";
import { StringProperty } from "src/core/Files/FileProperties/StringProperty";
import { BooleanProperty } from "src/core/Files/FileProperties/BooleanProperty";
import { YAMLPropertyDAO } from "src/core/Files/FilePropertyDAOs/YAMLPropertyDAO";
import { TopLevelFolderPropertyDAO } from "src/core/Files/FilePropertyDAOs/TopLevelFolderPropertyDAO";


export class Task extends File {
    properties: Record<string, FileProperty>;
   
    constructor(fullPath:string,fsf:FileSystemFacade){
        super(fullPath,fsf);
              
        this.properties = {
            "title":this.getTitleProperty(),
            "project":this.getProjectProperty(),
            "starred":this.getStarredProperty(),
            "status":this.getStatusProperty(),
            "context":this.getContextProperty()
        }
    }

    getTitleProperty():StringProperty{
        let title = new StringProperty("Title");
        let dao = new YAMLPropertyDAO(this,title,this.fileSystemFacade);
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