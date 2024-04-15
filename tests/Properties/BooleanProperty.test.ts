import { BooleanYAMLProperty } from "src/core/Properties/BooleanYAMLProperty";


class Helper{
  static getBooleanProperty():BooleanYAMLProperty{
     // return new BooleanYAMLProperty(,settings,file)
  }
}

/*
import { BooleanProperty } from "../../src/core/Properties/BooleanProperty";
import { PropertyModel } from "../../src/core/Interfaces/PropertyModel";
import { MockPropertyModel } from "../../tests/Mocks/MockPropertyModel";

class Helper{
  static getProperty(initialValue:string,options:string[]):BooleanProperty{
    let dao:PropertyModel = new MockPropertyModel(initialValue);
    let prop = new BooleanProperty("flagged","dummyfileid",dao,{allowedValues:options,defaultValue:""});
    return prop;
  }
}

// TODO: test defaultvalue behaviour

describe('BooleanProperty test correct input', () => {
  let prop = Helper.getProperty("true",["true","false"]);

  test('correct property value', () => {
      expect(prop.getValue()).toBe("true");
  });
});

describe('BooleanProperty test incorrect input:more than 2 values', () => {
  let options = ["true","false","athird"];
  let dao:PropertyModel = new MockPropertyModel("true");

  test('incorrect property value should throw error', () => {
    try{
      let prop = new BooleanProperty("flagged","dummyfileid",dao,{allowedValues:options,defaultValue:""});
      expect(true).toBe(false);
    }
    catch(e){
      expect(true).toBe(true)
    }
  });
});

describe('BooleanProperty test toggle', () => {
  let prop = Helper.getProperty("true",["true","false"]);

  test('toggle once', () => {
    prop.toggle();
    expect(prop.getValue()).toBe("false");
  });
  test('toggle twice', () => {
    prop.toggle();
    expect(prop.getValue()).toBe("true");
  });
  test('toggle thrice', () => {
    prop.toggle();
    expect(prop.getValue()).toBe("false");
  });

});

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
*/