import { CanActivate } from "@angular/router";
import { Injectable }  from "@angular/core";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {   
    constructor (private authSvc: AuthService) { }
    
    /**
     * Only allow authenticated users to go to the route
     */
    canActivate () : boolean {
        if(this.authSvc.authenticated()) {
            return true;
        } else {
            this.authSvc.lock.show();
            return false;
        }
    }
}