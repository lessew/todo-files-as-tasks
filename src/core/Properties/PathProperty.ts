import { FileModel } from "../Interfaces/FileModel";
import { Property } from "../Property";
import { PathStrategy } from "../PropertyStrategies/PathStrategy";

export class PathProperty extends Property{
    
    strategy:PathStrategy;

    constructor(strat:PathStrategy,file:FileModel){
        super(file);
        this.strategy = strat;
    }

    getValue(): string {
        return this.strategy.getValue(file.path);
    }

    setValue(val: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}