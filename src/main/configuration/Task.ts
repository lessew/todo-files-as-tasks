import { File } from "src/core/Files/File";
import { FileSystemFacade } from "src/core/Files/FileSystemFacade";
import { FileProperty } from "src/core/Files/FileProperty";
import { WhitelistProperty } from "src/core/Files/FileProperties/WhiteListProperty";
import { StringProperty } from "src/core/Files/FileProperties/StringProperty";
import { BooleanProperty } from "src/core/Files/FileProperties/BooleanProperty";


export class Task extends File {
    properties: Record<string, FileProperty>;
   
    constructor(fullPath:string,fs:FileSystemFacade){
        super(fullPath,fs);
              
        this.properties = {
            "title":new StringProperty(this,"Title"),
            "project":this.getProjectProperty(),
            "starred":this.getStarredProperty(),
            "status":this.getStatusProperty(),
            "context":this.getContextProperty()
        }
    }

    getProjectProperty():WhitelistProperty{
        let project = new WhitelistProperty(this,"Project");
        project.setAllowedValues(["tbi"]);
        return project;
    }

    getStarredProperty():BooleanProperty{
        let starred = new BooleanProperty(this,"Starred");
        starred.setAllowedValues([
            "starred",
            "unstarred"
        ])
        return starred;
    }

    getStatusProperty():WhitelistProperty{
        let status = new WhitelistProperty(this,"Status");
        status.setAllowedValues([
            "Inbox",
            "Next",
            "Deferred",
            "Waiting",
            "Done"
        ]);
        return status;
    }

    getContextProperty():WhitelistProperty{
        let context = new WhitelistProperty(this,"Context");
        context.setAllowedValues([
            "Desk",
            "Deep",
            "Phone",
            "Read"
        ]);
        return context;
    }

  }