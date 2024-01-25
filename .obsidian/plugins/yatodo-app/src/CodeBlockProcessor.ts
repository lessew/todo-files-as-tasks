import { MarkdownPostProcessor } from "obsidian";
import * as yaml from 'js-yaml';

export class CodeBlockProcessor {
  static process(source:string,el:HTMLElement):void{
    //static process(source:string,el:HTMLElement,ctx:MarkdownPostProcessor):void{

    try {
      const parsedData:any = yaml.load(source);
      console.log("pasred",parsedData);
      console.log(parsedData.domain)
      if (parsedData) {
        // Output each parsed variable to the console
        Object.keys(parsedData).forEach(key => {
          console.log(`${key}--`, parsedData[key]);
        });
      }
      //return parsedData;
    } catch (error) {
      console.error('Error parsing YAML:', error);
      //return null;
    }

        const rows = source.split("\n").filter((row) => row.length > 0);
	  console.log(source);
    console.log(el);
    /*
        const table = el.createEl("table");
        const body = table.createEl("tbody");
  
        for (let i = 0; i < rows.length; i++) {
          const cols = rows[i].split(",");
  
          const row = body.createEl("tr");
  
          for (let j = 0; j < cols.length; j++) {
            row.createEl("td", { text: cols[j] });
          }
        }*/
    }
}