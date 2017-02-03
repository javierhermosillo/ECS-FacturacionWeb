import { Component, Input } from "@angular/core";

@Component({
    selector : "ECS-BlockUI",
    templateUrl : "App/Common/BlockUI/Views/BlockUI.Component.html",
    styleUrls : ["App/Common/BlockUI/Styles/BlockUI.Component.css"]
})
export class BlockUIComponent{
    message : string = "Cargando información...";
}