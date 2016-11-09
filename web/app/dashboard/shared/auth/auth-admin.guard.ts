import { CanActivate }  from "@angular/router";
import { Injectable }   from "@angular/core";

@Injectable()
export class AuthAdminGuard implements CanActivate {   
    constructor () { }
    
    /**
     * Only allow admins to go to the route
     */
    canActivate () : boolean {
        let profile = JSON.parse(localStorage.getItem("user_profile"));
        if (profile && profile.isAdmin == true) {
            return true;
        } else {
            return false;
        }
    }
}