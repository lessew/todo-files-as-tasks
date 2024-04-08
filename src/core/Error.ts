
export abstract class FATError extends Error{
    message:string;
    constructor(message:string){
        super(message);
        this.message = message;
    }

    static isError(result:Error | unknown):result is Error{
      return result instanceof Error;
    }
    
    abstract type:string;
}

export class RootPathError extends FATError{
    type="RootPathError"
}

export class YAMLParseError extends FATError{
    type="YAMLError"
}

export class NoFilesFoundError extends FATError{
    type="NoFilesFound"
}

export class FilterNotAllowedError extends FATError{
    type="FilterNotAllowed"
}

export class ActionParseError extends FATError{
    type="ActionParseError"
}

