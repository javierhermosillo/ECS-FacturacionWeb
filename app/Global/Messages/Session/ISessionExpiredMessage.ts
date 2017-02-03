import { MessageBus } from "./../../../Common/Bus/MessageBus";

export interface ISessionExpired extends MessageBus.IBusMessage {
    Status : string;
}