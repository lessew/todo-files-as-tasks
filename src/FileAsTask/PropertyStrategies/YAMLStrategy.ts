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

}

export class BooleanStrategy extends YAMLStrategy{
    private whitelist:Whitelist

    constructor(wl:Whitelist){ 
        super();
        if(wl.size()!=2){
            throw new Error(`Boolean field must have exactly 2 options but found "${wl.size()}"`);
        }
        this.whitelist = wl;
    }
    validate(newValue:string):boolean{
        return newValue in this.whitelist;
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