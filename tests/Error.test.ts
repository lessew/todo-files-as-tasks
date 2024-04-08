import {FATError,YAMLParseError,RootPathError,NoFilesFoundError} from "../src/core/Error";


describe('Error test', () => {
    const rpe = new RootPathError("rpe");
    const ype = new YAMLParseError('ype');
    const nffe = new NoFilesFoundError('nffe');
    const randomobject = {message:"sdeafsdf"};

    test('Test isError', () => {   
        expect(FATError.isError(rpe)).toBe(true);
        expect(FATError.isError(ype)).toBe(true);
        expect(FATError.isError(nffe)).toBe(true);
        expect(FATError.isError(randomobject)).toBe(false);
    });
});