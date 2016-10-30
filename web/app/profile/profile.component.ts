import { Component } from "@angular/core";

import { ProfileService } from "./profile.service";

@Component({
    selector: "ch-profile",
    providers: [ ProfileService ],
    templateUrl: "app/profile/profile.component.html"
})
export class ProfileComponent { 
    /**
     * User profile
     */
    profile: any;

    /**
     * Auth0 profile
     */
    private authProfile: any;

    constructor (private profileSvc: ProfileService) { }

    private getProfile () {
        this.profileSvc.getProfile(this.authProfile.userId);
    }
}