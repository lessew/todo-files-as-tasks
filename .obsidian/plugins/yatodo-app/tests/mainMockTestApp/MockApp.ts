import { TaskConfiguration } from "src/core/TaskConfiguration";
import { File } from "../../src/core/File";
import { ValidContextValues, ValidProjectValues, ValidStatusValues } from "src/core/FilePropertyValues";
import { TaskList } from "src/core/TaskList";

export class MockApp{
  
    private _mockedInputFiles:File[] = [];
    config:TaskConfiguration;
    taskList:TaskList;


    constructor(){
        let projectVals = new ValidProjectValues();
        projectVals.addValue("errands","Errands")
        projectVals.addValue("work","Work");

        let contextVals = new ValidContextValues();
        contextVals.addValue("desk","Desk");
        contextVals.addValue("deep_work","Deep Work");

        let statusVals = new ValidStatusValues();
        contextVals.addValue("inbox","Inbox");
        contextVals.addValue("done","Done");

        this.config = new TaskConfiguration(projectVals,contextVals,statusVals);
    }


    setMarkdownFiles(inputs:File[]):void{
        this._mockedInputFiles = inputs;
    }

    getAllMarkdowndownFiles(): File[] {
        return this._mockedInputFiles;
    }
    
}