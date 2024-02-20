export enum Context{
    desk="desk",
    phone="phone",
    read="read",
    deep_thinking="deep_thinking",
    none="none"
}

export enum Status{
    inbox="inbox",
    next="next",
    waiting_for="waiting_for",
    deferred="deferred",
    none="none"
}


export class ContextHumanRedeadableHelper {
    static humanReadableValues = {
        "desk": "Desk",
        "phone": "Phone",
        "read": "Read",
        "deep_thinking": "Deep Thinking",
        "none": "None"
    }

    static getFieldId(){
        return "context";
    }
    static getHumanReadableValue(c:Context):string{
        const v = c as string;
        if(v in this.humanReadableValues){
            return this.humanReadableValues[v as keyof typeof this.humanReadableValues];
        }
        return "";
    }

    static getHumanReadableFieldName(){
        return "Context";
    }
}

export class StatusHumanRedeadableHelper {
    static humanReadableValues = {
        "inbox": "Inbox",
        "waiting_for": "Waiting For",
        "deferred": "Deferred",
        "next":"Next",
        "none": "None"
    }

    static getFieldId(){
        return "status";
    }
    static getHumanReadableValue(s:Status):string{
        const v = s as string;
        if(v in this.humanReadableValues){
            return this.humanReadableValues[v as keyof typeof this.humanReadableValues];
        }
        return "";
    }

    static getHumanReadableFieldName(){
        return "Status";
    }
}