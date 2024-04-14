import { PropertySettings } from "../../../src/core/PropertySettings";
import { BooleanStrategy } from "../../../src/core/PropertyStrategies/YAMLStrategies/BooleanStrategy";

class Helper{
    static getBooleanStrategy():BooleanStrategy{
        const settings = {
            allowedValues:["true","false"],
            defaultValue:"true"
        }as PropertySettings

        return new BooleanStrategy(settings);
    }
}

describe('booleanstrategy:toggle', () => {
    let strat = Helper.getBooleanStrategy();

    test('correct values', () => {
        expect(strat.getNewToggleValue("true")).toBe("false");
        expect(strat.getNewToggleValue("false")).toBe("true");
    });  
    test('incorrect values', () =>{
        expect(strat.getNewToggleValue("zero")).toBe("true");
        expect(strat.getNewToggleValue("")).toBe("true");
    })
    test('should throw error: invalid default value', () =>{
        const invalidDefaultValue = {
            allowedValues:["true","false"],
            defaultValue:"none"
        }
        try{
            new BooleanStrategy(invalidDefaultValue);
            expect(true).toBe(false);
        }
        catch(e){
            expect(true).toBe(true)
        }
    });

    test('should throw error: invalid allowed values', () =>{
        const invalidAllowedValues = {
            allowedValues:["true","false","shouldnotbehere"],
            defaultValue:"true"
        }
        try{
            new BooleanStrategy(invalidAllowedValues);
            expect(true).toBe(false);
        }
        catch(e){
            expect(true).toBe(true)
        }


    })
}); 