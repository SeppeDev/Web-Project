import { Component } from "@angular/core";

import { AuthService } from "../shared/auth/Auth.Service";

@Component({
    selector: "ch-profile",
    providers: [ AuthService ],
    templateUrl: "app/profile/profile.component.html"
})
export class ProfileComponent { 
    /**
     * User profile
     */
    profile: Object;

    constructor (private authSvc: AuthService) {
        console.log(this.authSvc.userProfile);
    }
}