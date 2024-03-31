
import { BooleanProperty } from "../../src/core/Properties/BooleanProperty";
import { PropertyDAO } from "../../src/core/Interfaces/PropertyDAO";
import { MockPropertyDAO } from "../../tests/Mocks/MockPropertyDAO";

class Helper{
  static getProperty(initialValue:string,options:string[]):BooleanProperty{
    let dao:PropertyDAO = new MockPropertyDAO(initialValue);
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
  let dao:PropertyDAO = new MockPropertyDAO("true");

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