import { MarkdownPostProcessor } from "obsidian";

export class CodeBlockProcessor {
  static process(source:string,el:HTMLElement):void{
    //static process(source:string,el:HTMLElement,ctx:MarkdownPostProcessor):void{
        const rows = source.split("\n").filter((row) => row.length > 0);
	  
        const table = el.createEl("table");
        const body = table.createEl("tbody");
  
        for (let i = 0; i < rows.length; i++) {
          const cols = rows[i].split(",");
  
          const row = body.createEl("tr");
  
          for (let j = 0; j < cols.length; j++) {
            row.createEl("td", { text: cols[j] });
          }
        }
    }
}