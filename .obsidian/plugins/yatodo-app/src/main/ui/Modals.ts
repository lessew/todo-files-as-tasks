import { App, Modal } from "obsidian";

export class SelectProjectModal extends Modal{
    constructor(app:App){
        super(app);
    }

    onOpen(): void {
        let {contentEl} = this;
        contentEl.setText("shizzzznet bizley");
    }

    onClose(): void{
        let {contentEl} = this;
        contentEl.empty();
    }
}

export class SelectProjectController {
    
}