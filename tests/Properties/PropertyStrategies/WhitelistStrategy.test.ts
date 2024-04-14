import { PropertySettings } from "src/core/PropertySettings";
import { BooleanStrategy } from "src/core/PropertyStrategies/YAMLStrategies/BooleanStrategy";




class Helper{
    static getWhitelistStrategy():WhitelistStrategy{
        const settings = {
            allowedValues:["true","false"],
            defaultValue:"true"
        }as PropertySettings

        return new WhitelistStrategy(settings);
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
    test('should throw error', () =>{
        const invalidDefaultValue = {
            allowedValues:["true","false"],
            defaultValue:"none"
        }
        expect(new BooleanStrategy(invalidDefaultValue)).toThrow("Defaultvalue is not a valid value");

        const invalidAllowedValues = {
            allowedValues:["true","false","shouldnotbehere"],
            defaultValue:"true"
        }

        expect(new BooleanStrategy(invalidAllowedValues)).toThrow("Defaultvalue is not a valid value");


        expect(strat.getNewToggleValue("zero")).toBe("true");
        expect(strat.getNewToggleValue("")).toBe("true");
    })
}); 