import { triggerAsyncId } from "async_hooks";
import { App,Editor,MarkdownEditView,MarkdownView,TFile,normalizePath,Events } from "obsidian";
import { Main } from "../Main";


// TODO make obsidianApp private and create proxy methods. To allow mock
export class ObsidianWrapper{
    private static instance:ObsidianWrapper;
    obsidianApp:App;
    rootPath:string;
    mains:Main[];
   
    public static async init(main:Main, app:App,rootPath:string){
        console.log(ObsidianWrapper.instance)
        if(typeof ObsidianWrapper.instance === "undefined"){
            ObsidianWrapper.instance = new ObsidianWrapper();
            ObsidianWrapper.instance.obsidianApp = app;
            ObsidianWrapper.instance.mains = [];
        }
        ObsidianWrapper.instance.rootPath = rootPath;
        ObsidianWrapper.instance.mains.push(main);
    }

    public static getInstance():ObsidianWrapper{
        return ObsidianWrapper.instance;
    }

    getTFile(path:string):TFile{
        return this.obsidianApp.vault.getAbstractFileByPath(path) as TFile;
    }

    normalizePath(rp:string):string{
        return normalizePath(rp);
    }

    // TODO FIX does not work in editor view
    refreshUI():void{

        setTimeout(
            () => {
                console.log("refresh");
                this.mains.forEach((main) =>{
                    main.load();
                });
                /*
                //this.main.load();
                //console.log(this.obsidianApp.workspace.getActiveViewOfType(MarkdownView))
                //this.obsidianApp.workspace.getActiveViewOfType(MarkdownView)?.previewMode.rerender(true);
                
                const view = this.obsidianApp.workspace.getActiveViewOfType(MarkdownView) as MarkdownView;
                const editor:Editor = view.editor as Editor;
                const currentText = editor.getValue() + " " as string;
                //editor.setValue(currentText);

                //console.log(editor.getValue());
                //editor.focus();
                //editor.setValue(editor.getValue());
                //this.obsidianApp.workspace.trigger('editor-change',editor,view);
                //this.obsidianApp.workspace.trigger('css-change',editor,view);
                let file = this.obsidianApp.workspace.getActiveFile() as TFile;
                this.obsidianApp.vault.modify(file,currentText)
                //console.log(this.obsidianApp.vault)
                //window.tmpie = this.obsidianApp;
                //editor.setValue
                // option: touch the file. not sure of event is fired
                //this.obsidianApp.vault.process(file, (data) => {
                //    return data;
                //  })
                */
            }
        ,500)  
    }

}