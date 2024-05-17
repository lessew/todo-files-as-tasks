import { PropertyView } from "../PropertyView";

export class LinkView extends PropertyView{
    linkText:string;
    href:string;


    constructor(linkText:string,href:string){
        super();
        this.linkText = linkText;
        this.href = href
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