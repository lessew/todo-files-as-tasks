import { FileAsTask } from "../FileAsTask";
import { PropertyView } from "./PropertyView";

export class LinkView extends PropertyView{
    linkText:string;
    href:string;
    fat:FileAsTask;

    constructor(linkText:string,fat:FileAsTask){
        super();
        this.linkText = linkText;
        this.href = this.fat.getLink();
    }

     build(rootElement:HTMLElement):void{
        let title:HTMLElement = rootElement.createEl("a",
            {
                text:this.linkText,
                href:this.href,
                cls:"internal-link",
                attr:{
                    target:"_blank",
                    ["data-href"]:this.href
                }
            }
        );

    }
}