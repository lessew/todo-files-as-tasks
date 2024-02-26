import { ValidContextValues, ValidProjectValues, ValidStatusValues } from "./FilePropertyValues";

export class TaskConfiguration{
    validProjectValues:ValidProjectValues;
    validStatusValues:ValidStatusValues;
    validContextValues:ValidContextValues;

    constructor(vpv:ValidProjectValues,vsv:ValidStatusValues,vcv:ValidContextValues){
        this.validProjectValues = vpv;
        this.validContextValues = vcv;
        this.validStatusValues = vsv;
    }
}