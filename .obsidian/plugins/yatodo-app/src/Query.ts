import { Status, Context } from "./FileProperties";

export type Query = {
    rootPath:string,
    context?:Context,
    status?:Status
}