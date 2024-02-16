import { Query } from "./Query";
import { FileAndFolderCollection } from "./FileAndFolderCollection";
import { Todo } from "./Todo";
import { Status, Context } from "./FileProperties";
import { File } from "./File";

export class TodoListBuilder{
    fileAndFolderCollection:FileAndFolderCollection;
    todos:Todo[];

    constructor(fc:FileAndFolderCollection){
        this.fileAndFolderCollection = fc;
        this.loadTodos();
    }

    private loadTodos(){
        this.todos = [];

        this.fileAndFolderCollection.files.forEach(f => {
            let td:Todo = new Todo(f as File);
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