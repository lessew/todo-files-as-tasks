import { PropertyView } from "src/core/Interfaces/PropertyView";

export class LinkView extends PropertyView{

     build(rootElement:HTMLElement,linkText:string,href:string):void{
        let title:HTMLElement = rootElement.createEl("a",
            {
                text:linkText,
                href:href,
                cls:"internal-link",
                attr:{
                    target:"_blank",
                    ["data-href"]:href
                }
            }
        );

    }
}