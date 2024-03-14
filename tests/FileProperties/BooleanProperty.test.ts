
import { BooleanProperty } from "../../src/core/Files/Properties/BooleanProperty";
import { PropertyDAO } from "../../src/core/Interfaces/PropertyDAO";
import { MockPropertyDAO } from "../../tests/Mocks/MockPropertyDAO";



describe('BooleanProperty test correct input', () => {
  let options = ["true","false"];
  let dao:PropertyDAO = new MockPropertyDAO("true");
  let prop = new BooleanProperty("flagged","dummyfileid",dao,options);

  test('correct property value', () => {
      expect(prop.value).toBe("true");
  });
});

describe('BooleanProperty test incorrect input:more than 2 values', () => {
  let options = ["true","false","athird"];
  let dao:PropertyDAO = new MockPropertyDAO("true");

  test('incorrect property value should throw error', () => {
    try{
      let prop = new BooleanProperty("flagged","dummyfileid",dao,options);
      expect(true).toBe(false);
    }
    catch(e){
      expect(true).toBe(true)
    }
  });
});

describe('BooleanProperty test toggle', () => {
  let options = ["true","false"];
  let dao:PropertyDAO = new MockPropertyDAO("true");
  let prop = new BooleanProperty("flagged","dummyfileid",dao,options);
  test('toggle once', () => {
    prop.toggle();
    expect(prop.value).toBe("false");
  });
  test('toggle twice', () => {
    prop.toggle();
    expect(prop.value).toBe("true");
  });
  test('toggle thrice', () => {
    prop.toggle();
    expect(prop.value).toBe("false");
  });

});