import { Component } from "@angular/core";

@Component({
    selector : "facturacion-menu",
    templateUrl : "App/Shared/Menu/Views/Menu.Component.html",
    styleUrls : ["app/Shared/Menu/Styles/menu.component.css"]
})

export class MenuComponent 
{

    clearSessionStorage() {
        sessionStorage.clear();
    }

}