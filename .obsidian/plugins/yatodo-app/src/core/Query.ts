import { Status, Context } from "./FilePropertyValues";
import { Folder } from "./Folder";

export type Query = {
    rootPath:string,
    context?:Context,
    status?:Status,
    project?:Folder
}