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
    private baseUrl: string = `${Constants.API_BASE_URL}`;

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
    getProfile () {
        let userId = JSON.parse(localStorage.getItem("auth_profile")).user_id;
        let url = `${this.baseUrl}/users/userid/${userId}`;
        return this.http.get(url).toPromise();      
    }

    /**
     * Get user chores
     */
    getUserChores () {
        let user = JSON.parse(localStorage.getItem("user_profile"));
        let url = `${this.baseUrl}/chores/user/${user.id}`;
        return this.http.get(url).toPromise();
    }

    /**
     * Get user chore by id
     */
    getChoreById (choreId: any) {
        let url = `${this.baseUrl}/chores/${choreId}`;
        return this.http.get(url).toPromise();
    }

    /**
     * Delete chore
     */
    deleteChore (choreId: number) {
        let url = `${this.baseUrl}/chores/${choreId}`;
        return this.http.delete(url).toPromise();
    }

    /**
     * Update a chore
     */
    updateChore (chore: any) {  
        let url = `${this.baseUrl}/chores/${chore.id}`;
        return this.http.put(url, chore, { headers: this.headers }).toPromise();
    }

    /**
     * Save user profile
     */
    saveProfile (profile: any) {
        profile.auth0Id = this.authProfile.user_id;
        profile.email = this.authProfile.email;
        
        let url = `${this.baseUrl}/users`;
        return this.http.post(url, JSON.stringify(profile), { headers: this.headers }).toPromise();
    }

    /**
     * Update user profile
     */
    updateProfile (profile: any) {
        let url = `${this.baseUrl}/users/${profile.id}`;
        return this.http.put(url, JSON.stringify(profile), { headers: this.headers }).toPromise();
    }

    /**
     * Get all categories
     */
    // getCategories () {
    //     let url = `${this.baseUrl}/categories`;
    //     return this.http.get(url).toPromise();
    // }
}