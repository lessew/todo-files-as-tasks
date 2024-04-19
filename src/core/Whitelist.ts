
export class Whitelist {
    private values:string[];

    constructor(vals:string[]){
        this.values = vals;
    }

    contains(name:string):boolean{
        return this.values.includes(name);
    }

    toRecord():Record<string,string>{
        return {}
    }

    toString():string{
        return "[" + this.values.concat(",") + "]";
    }

    joinByComma():string{
        return this.values.join(",");
    }

    setByStringSeperatedByComma(str:string){
        this.values = str.trim().split(",");
    }

    size():number{
        return this.values.length;
    }

    toArray():string[]{
        return this.values;
    }

}