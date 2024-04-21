
export class FATError extends Error{
    message:string;
    constructor(message:string){
        super(message);
        this.message = message;
    }

    static isError(result:FATError | unknown):result is FATError{
      return result instanceof Error;
    }
}


