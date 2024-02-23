import { YaTodoApp } from "src/core/YaTodoApp";
import { TestMockYatodoApp } from "./mainMockTestApp/TestMockYatodoApp";
import { StatusValues } from "../src/core/FileProperties";

describe('FilePropertyValues Values', () => {
    let statusValues:StatusValues; 

    test('check FilePropertyValues value initialization', () => {
        statusValues = new StatusValues();
        expect(statusValues.values.size).toBe(0)
    });
   
    test('check FilePropertyValues value can be added', () => {
        statusValues = new StatusValues();
        statusValues.addValue("inbox","Inbox");
        expect(statusValues.values.size).toBe(1)
        
    });

    test('check FilePropertyValues value can be added', () => {
        statusValues = new StatusValues();
        statusValues.addValue("inbox","Inbox");
        expect(statusValues.values.size).toBe(1)
    });

    test('check FilePropertyValues value is set after its added', () => {
        statusValues = new StatusValues();
        statusValues.addValue("inbox","Inbox");
        expect(statusValues.isSet("inbox")).toBe(true)
    });

    test('check FilePropertyValues returned after its added', () => {
        statusValues = new StatusValues();
        statusValues.addValue("inbox","Inbox");
        expect(statusValues.getValue("inbox")).toBe("Inbox")
    });

    test('check invalid returned after its added', () => {
        statusValues = new StatusValues();
        statusValues.addValue("inbox","Inbox");
        expect(statusValues.getValue("iiiinbox")).toBe(StatusValues.INVALID_VALUE)
    });
});