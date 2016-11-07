import { Injectable }       from "@angular/core";
import { Router }           from "@angular/router";

import {    tokenNotExpired,
            AuthHttp }      from "angular2-jwt";
import "rxjs/Rx";

import { Constants }        from "../constants";

declare var Auth0Lock: any;

@Injectable()
export class AuthService {
    /**
     * Base url for http requests
     */
    private baseUrl: string = `${Constants.API_BASE_URL}/users`;

    /**
     * Auth0 lock instance
     */
    lock = new Auth0Lock(Constants.AUTH0_CLIENTID, Constants.AUTH0_DOMAIN, {});

    /**
     * Auth0 profile 
     */
    authProfile: any;

    /**
     * Does the user have a profile with Chorehub?
     */
    hasProfile: boolean = false;

    /**
     * Is the current user an admin?
     */
    isAdmin: boolean = false;

    constructor (
        private http: AuthHttp,
        private router: Router
    ) {         
        // Check for existence of token in localStorage
        if(this.authenticated()) this.authProfile = JSON.parse(localStorage.getItem("auth_profile"));

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
        localStorage.removeItem("user_profile");
        this.authProfile = undefined;
        this.router.navigate(["/home"]);
        window.location.reload();
    }

    /**
     * Decrypt jwt token to access user profile
     */
    private getAuthProfile (idToken: string): void {
        this.lock.getProfile(idToken, (error: any, profile: any) => {
            if (error) 
            {
                console.log(error);
                return;    
            }        
            
            this.authProfile = profile;
            localStorage.setItem("auth_profile", JSON.stringify(profile));

            this.getUserProfile();
        });
    }

    /**
     * Get user profile
     */
    private getUserProfile () { 
        let url = `${this.baseUrl}/userid/${this.authProfile.user_id}`;

        this.http.get(url).toPromise()
            .then((data: any) => {
                localStorage.setItem("user_profile", data._body);
                this.isAdmin = JSON.parse(data._body).isAdmin;
                console.log(data);
            }, (error) => {
                this.router.navigate(["/profile/create"]);
            });
    } 
}