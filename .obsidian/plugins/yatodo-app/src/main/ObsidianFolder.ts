import { Folder } from "src/core/Folder";


export class ObsidianFolder extends Folder{
    name:string;

    constructor(name:string){
        super();
        this.name = name;
    }
}