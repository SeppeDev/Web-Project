import { Injectable }       from "@angular/core";
import { tokenNotExpired }  from "angular2-jwt";

import { Constants }        from "../shared/constants";

declare var Auth0Lock: any;

@Injectable()
export class AuthService {
    lock = new Auth0Lock(Constants.AUTH0_CLIENTID, Constants.AUTH0_DOMAIN, {});
    userProfile: Object;

    constructor () {
        if(this.authenticated) this.userProfile = JSON.parse(localStorage.getItem("user_profile"));
        console.log(this.userProfile);

        this.lock.on("authenticated", (authResult: any) => {
            localStorage.setItem("id_token", authResult.idToken);
            
            this.getProfile(authResult.idToken);    
        });
    }

    showLogin () {
        this.lock.show();
    }

    showRegister () {
        this.lock.show({
            initialScreen: "signUp"
        });
    }

    authenticated () {
        
        console.log(JSON.parse(localStorage.getItem("user_profile")));      
        return tokenNotExpired();
    }

    logout () {
        localStorage.removeItem("id_token");
        localStorage.removeItem("user_profile");
        this.userProfile = undefined;
    }

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