import { App, MarkdownView } from "obsidian";
import { ObsidianWrapper } from "../obsidian/ObsidianWrapper";

export class PropertyView{
    obsidianApp:App;
    statusNotSet:string = "◌";
    statusInvalid:string = "⊗";
    editIcon:string = "✎";
    newWindowIcon:string = "✇";

    constructor(app:App){
        this.obsidianApp = app;
    }

    refreshUI():void{
        ObsidianWrapper.getInstance().refreshUI();
    }
}