import { BooleanYAMLProperty } from "../../../src/Properties/BooleanYAML/BooleanYAMLProperty";
import { BooleanYAMLPropertySettings } from "../../../src/Properties/BooleanYAML/BooleanYAMLPropertySettings";
import { Whitelist } from "../../../src/Properties/Whitelist";


class Helper{
  static getBooleanProperty():BooleanYAMLProperty{
      return new BooleanYAMLProperty(
        "starred",
        "true",
      new Whitelist(["true","false"]),
      new MockFileModel("path","path",{starred:"false"}));
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


describe('BooleanYAMLPropertySettings: wrong input', () => {
  let propSettings = new BooleanYAMLPropertySettings("status","Inbox",new Whitelist(["Inbox","Done"]));

  const file = new MockFileModel("/test/","/test/home/fixroof.md",{status:"Done22"});
  let prop = propSettings.adaptToProperty(file);

  test('test if value is loaded correctly', () => {
     expect(prop.getValue()).toBe("Done22");
  });  
});
