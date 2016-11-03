import { Injectable }   from "@angular/core";
import { Response }     from "@angular/http";

import { Constants }    from "../shared/constants";
import { AuthHttp }     from "angular2-jwt";

@Injectable()
export class ProfileService {
    /**
     * Base url for service http calls.
     */
    private baseUrl: string = Constants.API_BASE_URL;

    /**
     * Auth0 profile
     */
    authProfile: any = JSON.parse(localStorage.getItem("auth_profile"));

    constructor (private http: AuthHttp) { }

    /**
     * Get user profile
     */
    getProfile (userId: string) {
        let url = `${this.baseUrl}/${userId}`;
        return this.http.get(url)
                    .flatMap(this.extractData);       
    }

    /**
     * Save user profile
     */
    saveProfile (profile: Object, userId: string) {
        let url = `${this.baseUrl}/${userId}`;
        return this.http.post(url, profile)
                    .flatMap(this.extractData);
    }
    
    /**
     * Extract json from response
     */
    private extractData (res: Response) {
        return res.json() || {}; 
    }
}