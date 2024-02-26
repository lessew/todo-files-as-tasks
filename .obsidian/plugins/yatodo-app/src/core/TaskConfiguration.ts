import { ValidContextValues, ValidProjectValues, ValidStarredValues, ValidStatusValues } from "./FilePropertyValues";

export class TaskConfiguration{
    validProjectValues:ValidProjectValues;
    validStatusValues:ValidStatusValues;
    validContextValues:ValidContextValues;
    validStarredValues:ValidStarredValues;

    constructor(vpv:ValidProjectValues,vsv:ValidStatusValues,vcv:ValidContextValues,vstv:ValidStarredValues){
        this.validProjectValues = vpv;
        this.validContextValues = vcv;
        this.validStatusValues = vsv;
        this.validStarredValues = vstv;
    }
}