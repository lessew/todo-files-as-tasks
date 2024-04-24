import {FATError} from "../src/core/Error";


describe('Error test', () => {
    const fe = new FATError("rpe");
    const regularerror = new Error("Test");
    const randomobject = {message:"sdeafsdf"};

    test('Test isError', () => {   
        expect(FATError.isError(fe)).toBe(true);
        expect(FATError.isError(regularerror)).toBe(false);
        expect(FATError.isError(randomobject)).toBe(false);
    });
});