import { Whitelist } from "./PropertyStrategies/Whitelist";
import { BooleanStrategy, WhitelistStrategy, YAMLStrategy } from "./PropertyStrategies/YAMLStrategy";

 export class PropertyFactory{
    static create(name:string,data:unknown):YAMLStrategy{
        if(name=="boolean"){
            let wl = data as string[];
            return new BooleanStrategy(new Whitelist(wl));
        }
        //else if(name=="whitelist"){
        let wl = data as string[];
        return new WhitelistStrategy(new Whitelist(wl));
        //}
        
    }
 }