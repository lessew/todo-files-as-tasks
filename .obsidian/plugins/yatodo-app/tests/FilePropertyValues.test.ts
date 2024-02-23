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
});