
export class Logger{
    rootEl:HTMLElement;
    constructor(el:HTMLElement){
        this.rootEl = el;
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