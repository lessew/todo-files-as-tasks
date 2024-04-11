
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