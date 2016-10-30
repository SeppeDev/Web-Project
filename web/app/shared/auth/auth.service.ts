import { Injectable }       from "@angular/core";
import { Response }         from "@angular/http";
import {    tokenNotExpired,
            AuthHttp }      from "angular2-jwt";

import { Constants }        from "../constants";

declare var Auth0Lock: any;

@Injectable()
export class AuthService {
    /**
     * Base url for http requests
     */
    private baseUrl: string = Constants.API_BASE_URL;

    /**
     * Auth0 lock instance
     */
    lock = new Auth0Lock(Constants.AUTH0_CLIENTID, Constants.AUTH0_DOMAIN, {});

    /**
     * User profile 
     */
    authProfile: any;

    constructor (private http: AuthHttp) {
         
        // Check for existence of token in localStorage
        if(this.authenticated) this.authProfile = JSON.parse(localStorage.getItem("auth_profile"));

        // Listen to auth0 authenticated event and set token & user profile
        this.lock.on("authenticated", (authResult: any) => {
            localStorage.setItem("id_token", authResult.idToken);
            
            this.getAuthProfile(authResult.idToken);    
        });
    }

    /**
     * Show auth0 lock - login screen
     */
    showLogin (): void {
        this.lock.show();
    }

    /**
     * Show auth0 lock - register screen
     */
    showRegister (): void {
        this.lock.show({
            initialScreen: "signUp"
        });
    }

    /**
     * Check if jwt token is expired
     */
    authenticated (): boolean {            
        return tokenNotExpired();
    }

    /**
     * Destroy jwt token to end session
     */
    logout (): void {
        localStorage.removeItem("id_token");
        localStorage.removeItem("auth_profile");
        this.authProfile = undefined;
    }

    /**
     * Decrypt jwt token to access user profile
     */
    private getAuthProfile (idToken: string): void {
        this.lock.getProfile(idToken, (error: any, profile: Object) => {
            if (error) 
            {
                console.log(error);
                return;    
            }

            this.authProfile = profile;
            localStorage.setItem("auth_profile", JSON.stringify(profile));
        });
    }

    /**
     * Get user profile
     */
    private getUserProfile () { 
        let url = `${this.baseUrl}/${this.authProfile.userId}`;

        this.http.get(url).flatMap(this.extractData).subscribe((data) => {
            
        });
    }
    
    /**
     * Extract json from response
     */
    private extractData (res: Response) {
        return res.json() || {}; 
    }
}