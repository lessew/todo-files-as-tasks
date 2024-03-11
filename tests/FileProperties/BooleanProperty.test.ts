import { MockFileSystemFacade } from "./MockFileSystemFacade";
import { BooleanProperty } from "../../src/core/Files/FileProperties/BooleanProperty";
import { FileSystemFacade } from "../../src/core/Files/FileSystemFacade";
import { File } from "../../src/core/Files/File";
import * as exp from "constants";
import { FilePropertyDAO } from "src/core/Files/FileProperty";
import { MockFilePropertyDAO } from "./MockFilePropertyDAO";

class Helper{
  static getBooleanProperty():BooleanProperty{
      let fsf:FileSystemFacade = new MockFileSystemFacade();
      let f = new File("/path/",fsf);

      let bp = new BooleanProperty("BooleanProperty");
      let dao:FilePropertyDAO = new MockFilePropertyDAO(f,bp,fsf);
      bp.setDAO(dao);
      bp.setAllowedValues(["true","false"]);
      return bp;
  }
}

describe('BooleanProperty test', () => {
  const sp = Helper.getBooleanProperty();
  test('correct property value', () => {
    sp.value = "true";
      expect(sp.value).toBe("true");
  });
  test('toggle function', () => {
    sp.value = "true";
    expect(sp.value).toBe("true");
    const val1 = sp.toggle();
    expect(sp.value).toBe("false");
    expect (val1).toBe("false");
    const val2 = sp.toggle();
    expect(sp.value).toBe("true");
    expect (val2).toBe("true");
  });
});

describe('BooleanProperty with incorrect input', () => {
  const sp = Helper.getBooleanProperty();

  test('with three possible values', () => {
    try{
      sp.setAllowedValues(["true","false","error"]);
      expect(true).toBe(false);
    }
    catch(e){
      expect(true).toBe(true);
    }
  });

});