import { ValidStatusValues } from "../src/core/FilePropertyValues";

describe('FilePropertyValues Values', () => {
    let statusValues:ValidStatusValues; 

    test('check FilePropertyValues value initialization', () => {
        statusValues = new ValidStatusValues();
        expect(statusValues.values.size).toBe(0)
    });
   
    test('check FilePropertyValues value can be added', () => {
        statusValues = new ValidStatusValues();
        statusValues.addValue("inbox","Inbox");
        expect(statusValues.values.size).toBe(1)
        
    });

    test('check FilePropertyValues value can be added', () => {
        statusValues = new ValidStatusValues();
        statusValues.addValue("inbox","Inbox");
        expect(statusValues.values.size).toBe(1)
    });

    test('check FilePropertyValues value is set after its added', () => {
        statusValues = new ValidStatusValues();
        statusValues.addValue("inbox","Inbox");
        expect(statusValues.isSet("inbox")).toBe(true)
    });

    test('check FilePropertyValues returned after its added', () => {
        statusValues = new ValidStatusValues();
        statusValues.addValue("inbox","Inbox");
        expect(statusValues.getValue("inbox")).toBe("Inbox")
    });

    test('check invalid returned after its added', () => {
        statusValues = new ValidStatusValues();
        statusValues.addValue("inbox","Inbox");
        expect(statusValues.getValue("iiiinbox")).toBe(ValidStatusValues.INVALID_VALUE)
    });

    test('check getAllHumanReadableValues', () => {
        statusValues = new ValidStatusValues();
        statusValues.addValue("inbox","Inbox");
        statusValues.addValue("next","Next");
        expect(statusValues.getAllHumanReadableValues()).toEqual(["Inbox","Next"]);
    });

    test('check getAllIds', () => {
        statusValues = new ValidStatusValues();
        statusValues.addValue("inbox","Inbox");
        statusValues.addValue("next","Next");
        expect(statusValues.getAllIds()).toEqual(["inbox","next"]);
    });
});

describe('FilePropertyValues settting and getting default value', () => {
    let sv = new ValidStatusValues();
    sv.addValue("inbox","Inbox");

    test('check getter when its not set', () => {
        expect(sv.default).toBe(ValidStatusValues.INVALID_VALUE)
    });

    test('check getter when it is set', () => {
        sv.default = "inbox";
        expect(sv.default).toBe("inbox")
    });

    test('check getter when its key does not exist', () => {
        sv.default = "done";
        expect(sv.default).toBe(ValidStatusValues.INVALID_VALUE);
    });
});
   