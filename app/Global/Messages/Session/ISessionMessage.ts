import { MessageBus } from "./../../../Common/Bus/MessageBus";

export interface ISessionChanged extends MessageBus.IBusMessage {
    Status : string;
}