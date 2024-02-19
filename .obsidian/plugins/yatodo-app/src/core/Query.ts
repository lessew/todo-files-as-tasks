import { Status, Context } from "./FileProperties";
import { Folder } from "./Folder";

export type Query = {
    rootPath:string,
    context?:Context,
    status?:Status,
    project?:Folder
}