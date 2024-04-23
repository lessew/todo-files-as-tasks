import { BooleanYAMLProperty } from "../../../src/core/Properties/BooleanYAML/BooleanYAMLProperty";
import { Whitelist } from "../../../src/core/Whitelist";
import { MockFileModel } from "../../Mocks/MockFileModel";


class Helper{
  static getBooleanProperty():BooleanYAMLProperty{
      return new BooleanYAMLProperty(
        "starred",
        "true",
      new Whitelist(["true","false"]),
      new MockFileModel("path",{starred:"false"}));
  }
}

describe('BooleanProperty test correct value', () => {
  let prop = Helper.getBooleanProperty();

  test('correct property value', () => {
      expect(prop.getValue()).toBe("false");
  });
});

  
describe('BooleanProperty test correct value set', () => {
  let prop = Helper.getBooleanProperty();
  prop.setValue("true");

  test("setter",()=>{
      expect(prop.getValue()).toBe("true")
    })
});

describe('BooleanProperty test incorrectly used getter', () => {
  let prop = Helper.getBooleanProperty();
  prop.setValue("invalid");

    test("setter to invalid value",()=>{
      expect(prop.getValue()).toBe("false")
    }) 
});


describe('BooleanProperty test toggle', () => {
  let prop = Helper.getBooleanProperty();
  let newval = prop.getNewToggleValue(prop.getValue());

  test('toggle once', () => {
    expect(newval).toBe("true");
  }); 
});

