import { PluginSettings } from "src/Configuration/PluginSettings";
import { Property } from "src/Properties/Property";
import { FileModel } from "./FileModel";

export abstract class FileAsTaskModel{
    fileModel:FileModel;
    data:Record<string,string>;
    settings:PluginSettings;
    root:string;
    path:string;

    abstract createEmptyMarkdownFile(path:string):Promise<void>;
    
    setData(data:Record<string,string>){
        this.data = data;
    }

    setRoot(r:string){
        this.root = r;
    }

    setPath(p:string){
        this.path = p;
    }

    setFileModel(fm:FileModel){
        this.fileModel = fm;
    }

    setPluginSettings(settings:PluginSettings){
        this.settings = settings;
    }

    setSettings(settings:PluginSettings){
        this.settings = settings;
    }    

    persistYAMLProperties():void{
        let map = this.settings.getAsMap();
        map.forEach((value) => {
            if (value.getType() == "booleanYAML" || value.getType()=="whitelistYAML") {
                let property:Property = value.adaptToProperty(this.fileModel);
                if(value.propName in this.data){
                    property.setValue(this.data[value.propName])
                }
                else{
                    property.setValue(value.defaultValue);
                }
            }
        })
    }
}