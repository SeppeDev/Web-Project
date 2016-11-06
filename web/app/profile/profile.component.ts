import { Component, OnInit } from "@angular/core";

import { ProfileService } from "./profile.service";

@Component({
    selector: "ch-profile",
    providers: [ ProfileService ],
    templateUrl: "app/profile/profile.component.html"
})
export class ProfileComponent implements OnInit { 
    /**
     * User profile
     */
    profile: any = {
        image: {}
    };

    constructor (private profileSvc: ProfileService) { }

    /**
     * Fires when component is loaded
     */
    ngOnInit () {
        this.getProfile();
    }

    /**
     * Get logged in user profile
     */
    private getProfile () {
        this.profileSvc.getProfile()
            .then((data: any) => {
                this.profile = JSON.parse(data._body);
            }, (error: any) => {
                console.log(error);
            });
    }
}