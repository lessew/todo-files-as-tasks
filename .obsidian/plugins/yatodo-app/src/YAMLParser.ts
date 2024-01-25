import { Configuration } from "./Configuration";
import { Parser } from "./Parser";

export class YAMLParser implements Parser{
    parse(source:string):Configuration{
        return new Configuration();
    }
}