import { Query } from "./Query";
import { FileAndFolderCollection } from "./FileAndFolderCollection";
import { Todo } from "./Todo";
import { File } from "./File";
import { Status, Context, StatusValues, ContextValues } from "./FileProperties";


export class TodoListBuilder{
    fileAndFolderCollection:FileAndFolderCollection;
    statusValues:StatusValues;
    contextValues:ContextValues;
    todos:Todo[];

    constructor(fc:FileAndFolderCollection,sv:StatusValues,cv:ContextValues){
        this.statusValues = sv;
        this.contextValues = cv;
        this.fileAndFolderCollection = fc;
        this.loadTodos();
    }

    private loadTodos(){
        this.todos = [];

        this.fileAndFolderCollection.files.forEach(f => {
            let td:Todo = new Todo(f as File,this.statusValues,this.contextValues);
            this.todos.push(td);
        })
    }

    filterByExcludingDirectoryName(directoryToIgnore:string):void{
       // return this;
    };

    filterByFileExtension(extension:string):void{
        //return this;
    };

    filterByStatus(s:Status):void{
        let result:Todo[]= this.todos.filter(td => {
            return (td.status === s)
        })
        this.todos = result;
    }

    filterByContext(c:Context):void{
        let result:Todo[] = this.todos.filter(td => {
            return (td.context === c)
        })    
        this.todos = result;
    }

    get():Todo[]{
        return this.todos;
    }

    build(q:Query):Todo[]{
        if(q.context){
            this.filterByContext(q.context);
        }
        if(q.status){
            this.filterByStatus(q.status);
        }

        return this.todos;
    }

}