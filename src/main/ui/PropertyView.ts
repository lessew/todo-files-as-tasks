import { App } from "obsidian";
import { Property } from "src/core/Interfaces/Property";

export class PropertyView{
    obsidianApp:App;
    prop:Property;

    constructor(prop:Property,app:App){
        this.obsidianApp = app;
        this.prop = prop;
    }
}