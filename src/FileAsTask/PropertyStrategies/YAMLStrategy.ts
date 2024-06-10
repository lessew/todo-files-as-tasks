import { Whitelist } from "./Whitelist";


export abstract class YAMLStrategy{}

export class WhitelistStrategy extends YAMLStrategy{
    private whitelist:Whitelist;

    constructor(wl:Whitelist,){
        super();
        this.whitelist = wl;
    }

    validate(newValue:string):boolean{
        return newValue in this.whitelist;
    }

    getType():string{
        return "whitelist";
    }
}

export class BooleanStrategy extends YAMLStrategy{
    private defaultValue:string;
    private whitelist:Whitelist

    constructor(wl:Whitelist){ 
        super();
        this.validateInit(wl);
        this.whitelist = wl;
    }

    validateInit(wl:Whitelist){
        if(wl.size()!=2){
            throw new Error(`Boolean field must have exactly 2 options but found "${wl.size()}"`);
        }
        return {
            whitelist: this.whitelist.toString(),
            type:"boolean"
        }
    }

    fromJSON(data: unknown): void {
        let struct = data as {
            whitelist:string[],
            type:string
        }
        if(struct.type!="boolean"){
            throw new Error(`Can't instantiate boolean yaml property with type set to ${struct.type}`);
        }
        let wl = new Whitelist(struct.whitelist);
        this.validateInit(wl)
        this.whitelist = wl;
    }

}


//export class FreeTextStrategy extends PropertyStrategy{
    /**
     * log(allowed.test("works"))
     * log(allowed.test("works-"))
     * log(allowed.test("works/"))
     * log(allowed.test("works//"))
     * log(allowed.test("notworks&"))
     **/
  /*  private allowed:RegExp = /^[a-zA-Z\/\.]+$/;
    private defaultValue = "";

    validate(newValue: string): boolean {
        return this.allowed.test(newValue);
    }
    
}
*/