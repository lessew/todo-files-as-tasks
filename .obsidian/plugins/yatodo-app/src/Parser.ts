import { Configuration } from "./Configuration";

export interface Parser{
    parse(source:string):Configuration;
}