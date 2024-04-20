import { FileModel } from "src/core/File";
import { BooleanYAMLProperty } from "../../src/core/Properties/BooleanYAMLProperty";
import { Whitelist } from "../../src/core/Whitelist";
import { MockFileModel } from "../../tests/Mocks/MockFileModel";


class Helper{
  static getBooleanProperty():BooleanYAMLProperty{
      return new BooleanYAMLProperty(
        "starred",
        "true",
      new Whitelist(["true","false"]),
      new MockFileModel("path",{starred:"false"}));
  }
}

describe('BooleanProperty test correct input', () => {
  let prop = Helper.getBooleanProperty();

  test('correct property value', () => {
      expect(prop.getValue()).toBe("false");
  });
  test("setter",()=>{
      prop.setValue("true")
      expect(prop.getValue()).toBe("true")
    })
    test("setter to invalid value",()=>{
      prop.setValue("invalid")
      expect(prop.getValue()).toBe("true")
    }) 
});


describe('BooleanProperty test toggle', () => {
  let prop = Helper.getBooleanProperty();

  test('toggle once', () => {
    let newval = prop.getNewToggleValue(prop.getValue());
    expect(newval).toBe("false");
  }); 
});

