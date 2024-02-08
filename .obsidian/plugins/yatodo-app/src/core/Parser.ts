import { Query } from "./Query";

export interface Parser{
    parse(source:string):Query;
}