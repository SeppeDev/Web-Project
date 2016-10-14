import { Injectable }       from "@angular/core";
import { tokenNotExpired }  from "angular2-jwt";

import { Constants }        from "../shared/constants";

declare var Auth0Lock: any;

@Injectable()
export class AuthService {
    // Create auth0 lock instance
    lock = new Auth0Lock(Constants.AUTH0_CLIENTID, Constants.AUTH0_DOMAIN, {});

    // Create userProfile instance
    userProfile: Object;

    constructor () {
        // Check for existence of token in localStorage
        if(this.authenticated) this.userProfile = JSON.parse(localStorage.getItem("user_profile"));

        // Listen to auth0 authenticated event and set token & user profile
        this.lock.on("authenticated", (authResult: any) => {
            localStorage.setItem("id_token", authResult.idToken);
            
            this.getProfile(authResult.idToken);    
        });
    }

    /**
     * Show auth0 lock - login screen
     */
    showLogin () {
        this.lock.show();
    }

    /**
     * Show auth0 lock - register screen
     */
    showRegister () {
        this.lock.show({
            initialScreen: "signUp"
        });
    }

    /**
     * Check if jwt token is expired
     */
    authenticated () {            
        return tokenNotExpired();
    }

    /**
     * Destroy jwt token to end session
     */
    logout () {
        localStorage.removeItem("id_token");
        localStorage.removeItem("user_profile");
        this.userProfile = undefined;
    }

    /**
     * Decrypt jwt token to access user profile
     */
    private getProfile (idToken: string) {
        this.lock.getProfile(idToken, (error: any, profile: Object) => {
            if (error) 
            {
                console.log(error);
                return;    
            }

            this.userProfile = profile;
            localStorage.setItem("user_profile", JSON.stringify(profile));
        });
    }
}