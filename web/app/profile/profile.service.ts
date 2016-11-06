import { Injectable }           from "@angular/core";
import { Response, Headers }    from "@angular/http";

import "rxjs/Rx";
import { AuthHttp }     from "angular2-jwt";

import { Constants }    from "../shared/constants";

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
    private headers: Headers = new Headers({"Content-Type": "application/json"});

    constructor (private http: AuthHttp) { }

    /**
     * Get user profile
     */
    getProfile (userId: string) {
        let url = `${this.baseUrl}/${userId}`;
        return this.http.get(url).toPromise();      
    }

    /**
     * Get user chores
     */
    getUserChores () {
        let url = `${this.baseUrl}/chores/`;
        return this.http.get(url).toPromise();
    }

    /**
     * Get user chore by id
     */
    getChoreById (id: any) {
        let url = `${this.baseUrl}/chores/${id}`;
        return this.http.get(url).toPromise();
    }

    /**
     * Save user profile
     */
    saveProfile (profile: any) {
        profile.auth0Id = this.authProfile.user_id;
        profile.email = this.authProfile.email;
        
        let url = `${this.baseUrl}`;
        return this.http.post(url, JSON.stringify(profile), { headers: this.headers }).toPromise();
    }

    /**
     * Update user profile
     */
    updateProfile (profile: any) {
        let url = `${this.baseUrl}/${profile.id}`;
        return this.http.put(url, JSON.stringify(profile), { headers: this.headers }).toPromise();
    }
}