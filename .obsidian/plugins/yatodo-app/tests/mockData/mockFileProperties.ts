import { ValidContextValues, ValidStatusValues } from "../../src/core/FileProperties";

export enum mockStatusIdValues {
    inbox = "inbox",
    done="done"
}

export enum mockContextIdValues {
    desk = "desk",
    deep_thinking = "deep_thinking"
}


let validStatusValuesInboxDone = new ValidStatusValues();
validStatusValuesInboxDone.addValue(mockStatusIdValues.inbox,mockStatusIdValues.inbox);
validStatusValuesInboxDone.addValue(mockStatusIdValues.done,mockStatusIdValues.done);

let validContextValuesDeskDeepThinking = new ValidContextValues();
validContextValuesDeskDeepThinking.addValue(mockContextIdValues.desk,mockContextIdValues.desk);
validContextValuesDeskDeepThinking.addValue(mockContextIdValues.deep_thinking,mockContextIdValues.deep_thinking);

export {validStatusValuesInboxDone};
export {validContextValuesDeskDeepThinking};

