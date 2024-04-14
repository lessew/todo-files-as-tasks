import { PropertySettings } from "src/core/PropertySettings";
import { PathStrategy } from "../PathStrategy";

export class BasenameStrategy extends PathStrategy{
    settings:PropertySettings;

    getValue(path:string):string{
        return this.getBasename(path);
    }
}