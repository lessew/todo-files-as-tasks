import { Resource } from "./Resource";

export interface FolderModel{
    name:string;
    extension:string;
    path:string;
    children:Resource[];
}