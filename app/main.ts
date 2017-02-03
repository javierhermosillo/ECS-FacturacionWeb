import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app.module";
import { enableProdMode } from "@angular/core";



 let options = {
      autoDismiss: false,
      positionClass: "toast-bottom-right",
    };


const platform = platformBrowserDynamic();
enableProdMode();
platform.bootstrapModule(AppModule);
