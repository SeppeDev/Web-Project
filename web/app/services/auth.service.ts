import { Injectable }       from "@angular/core";
import { tokenNotExpired }  from "angular2-jwt";

declare var Auth0Lock: any;

@Injectable()
export class AuthService {
    lock = new Auth0Lock('YOUR_CLIENT_ID', 'YOUR_NAMESPACE', {});

    constructor () {
        this.lock.on("authenticated", (authResult: any) => {
            localStorage.setItem("id_token", authResult.idToken);
        });
    }

    showLogin () {
        this.lock.show();
    }

    showRegister () {
        
    }
}