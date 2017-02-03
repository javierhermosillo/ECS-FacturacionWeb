import { Injectable } from "@angular/core";
import { MessageBus } from "./MessageBus";

@Injectable()
export class BusService {
    public channel;

    constructor() {
        this.channel = new MessageBus.Channel();
    }
}