import { MessageBus } from "./../../../Common/Bus/MessageBus";

export interface IErrorMessage extends MessageBus.IBusMessage {
    Status : string;
}