import { Injectable } from "@angular/core";

import { Constants }    from "../shared/constants";
import { AuthHttp }     from "angular2-jwt";

@Injectable()
export class ProfileService {
    /**
     * Base url for service http calls.
     */
    private baseUrl: string = Constants.API_BASE_URL;

    constructor (private http: AuthHttp) { }

    /**
     * Get user profile
     */
    getProfile (userId: string) {
        this.http.get(`${this.baseUrl}/${userId}`);       
    }

    saveProfile (profile: Object) {

    }
}