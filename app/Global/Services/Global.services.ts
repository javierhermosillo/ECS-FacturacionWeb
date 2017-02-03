import { Injectable } from "@angular/core";

@Injectable()
export class GlobalService {

    //API Url's'
    private apiUrl : string = "https://localhost:44302/api";
    private authApiUrl : string = "https://asalazar.ecsdev1.com/api";

    ApiUrl() : string {
        return this.apiUrl;
    }

    AuthApiUrl() : string {
        return this.authApiUrl;
    }

}
