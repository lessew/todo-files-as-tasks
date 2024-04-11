import { FATPROPERTY, FATProperty } from "src/core/FileAsTaskSettings";
import { BasenameProperty } from "src/core/Properties/BasenameProperty";
import { BooleanProperty } from "src/core/Properties/BooleanProperty";
import { ToplevelFolderProperty } from "src/core/Properties/ToplevelFolderProperty";
import { WhitelistProperty } from "src/core/Properties/WhitelistProperty";

export class Title extends BasenameProperty{}

export class Project extends ToplevelFolderProperty{}
      
export class Context extends WhitelistProperty{
    getName():FATProperty{
        return FATPROPERTY.context;
    }
}

export class Status extends WhitelistProperty{
    getName():FATProperty{
        return FATPROPERTY.status;
    }
}

export class Starred extends BooleanProperty{
    getName():FATProperty{
        return FATPROPERTY.starred;
    }
}