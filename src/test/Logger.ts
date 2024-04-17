
export class Logger{
    rootEl:HTMLElement;
    constructor(el:HTMLElement){
        this.rootEl = el;
    }

    em(message:string){
        this.rootEl.createEl("i",{text:message})
    }
    
    heading(message:string){
        this.rootEl.createEl("h1",{text:message});
    }

    headingSub(message:string){
        this.rootEl.createEl("h2",{text:message});
    }

    headingSubSub(message:string){
        this.rootEl.createEl("h3",{text:message});
    }

    

    log(message:string){
        this.rootEl.createEl("div",{text:"🔵 " + message});
    }

    success(message:string){
        this.rootEl.createEl("div",{text:"🟢 " + message})
    }

    warn(message:string){
        this.rootEl.createEl("div",{text:"🔴 " + message,});
    }

    error(message:string){
        this.rootEl.createEl("div",{text:"🟠 " + message});
    }
}