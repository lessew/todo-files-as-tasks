import { ContextValues, StatusValues } from "../../src/core/FileProperties";

export enum mockStatusIdValues {
    inbox = "inbox",
    done="done",
    waiting_for="waiting_for",
    next="next",
    deferred="deferred"
}

export enum mockStatusHumanReadableValues {
    inbox = "Inbox",
    done="Done",
    waiting_for="Waiting For",
    next="Next",
    deferred="Deferred"
}

export enum mockContextIdValues {
    desk = "desk",
    deep_thinking = "deep_thinking",
    phone = "phone",
    read = "read"
}

export enum mockContextHumanReadableValues {
    desk = "Desk",
    deep_thinking = "Deep Thinking",
    phone = "Phone",
    read = "Read"
}

let statusValuesInboxDone = new StatusValues();
statusValuesInboxDone.addValue(mockStatusIdValues.inbox,mockStatusHumanReadableValues.inbox);
statusValuesInboxDone.addValue(mockStatusIdValues.done,mockStatusHumanReadableValues.done);

let contextValuesDeskDeepThinking = new ContextValues();
contextValuesDeskDeepThinking.addValue(mockContextIdValues.desk,mockContextHumanReadableValues.desk);
contextValuesDeskDeepThinking.addValue(mockContextIdValues.deep_thinking,mockContextHumanReadableValues.deep_thinking);

export {statusValuesInboxDone};
export {contextValuesDeskDeepThinking};

