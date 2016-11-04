import { Injectable }           from "@angular/core";
import { Response, Headers }    from "@angular/http";

import { Constants }    from "../shared/constants";
import { AuthHttp }     from "angular2-jwt";

@Injectable()
export class ProfileService {
    /**
     * Base url for service http calls.
     */
    private baseUrl: string = `${Constants.API_BASE_URL}/users`;

    /**
     * Auth0 profile
     */
    authProfile: any = JSON.parse(localStorage.getItem("auth_profile"));

    /**
     * Custom headers
     */
    headers: Headers = new Headers({"Content-type": "application/json"});

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
    saveProfile (profile: any) {
        profile.Auth0Id = this.authProfile.user_id;
        profile.Email = this.authProfile.email;
        
        let url = `${this.baseUrl}`;
        return this.http.post(url, JSON.stringify(profile), { headers: this.headers })
                    .flatMap(this.extractData);
    }

    /**
     * Extract json from response
     */
    private extractData (res: Response) {
        return res.json() || {}; 
    }
}