import { MessageBus } from "./../../../Common/Bus/MessageBus";

export interface IServiceNotAvailable extends MessageBus.IBusMessage {
    Status : string;
}