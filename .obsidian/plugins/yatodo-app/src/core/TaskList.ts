import { Query } from "./Query";
import { Task } from "./Task";
import { File } from "./File";
import { TaskConfiguration } from "./TaskConfiguration";

export class TaskList{
    config:TaskConfiguration;
    tasks:Task[];

    constructor(files:File[],query:Query,tc:TaskConfiguration){
        this.config = tc;
        this.loadTodos(files);
        this.build(query);
    }

    private loadTodos(files:File[]){
        this.tasks = [];

        files.forEach(f => {
            let td:Task = new Task(f as File,this.config);
            this.tasks.push(td);
        })
    }

    filterByExcludingDirectoryName(directoryToIgnore:string):void{
       // return this;
    };

    filterByFileExtension(extension:string):void{
        //return this;
    };

    filterByStatus(s:string):void{
        let result:Task[]= this.tasks.filter(td => {
            return (td.status === s)
        })
        this.tasks = result;
    }

    filterByContext(c:string):void{
        let result:Task[] = this.tasks.filter(td => {
            return (td.context === c)
        })    
        this.tasks = result;
    }

    filterByPath(p:string):void{
        let result:Task[] = this.tasks.filter(aTask => {
            return (aTask.file.pathMatches(p));
        })    
        this.tasks = result;
    }

    get():Task[]{
        return this.tasks;
    }

    private build(q:Query):Task[]{
        this.filterByPath(q.rootPath);

        if(q.context){
            this.filterByContext(q.context);
        }
        if(q.status){
            this.filterByStatus(q.status);
        }

        return this.tasks;
    }

}