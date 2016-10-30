import { Component, OnInit }    from "@angular/core";
import { ActivatedRoute }       from "@angular/router";

import { ProfileService }   from "../profile.service";

@Component({
    selector: "ch-edit-profile",
    providers: [ ProfileService ],
    templateUrl: "app/profile/edit-profile/edit-profile.component.html"
})
export class EditProfileComponent implements OnInit {
    state: String;
    profile: any = {};

    constructor (
        private profileSvc: ProfileService,
        private route: ActivatedRoute   
    ) { }

    /**
     * Fires when component is loaded
     */
    ngOnInit () {     
        this.route.data.forEach((data: any) => data.state == "edit" ? this.state = "Bewerk" : this.state = "Maak");
    }

    /**
     * Validate profile data
     */
    validate () {
        this.save();
    }

    /**
     * Save edited profile
     */
    private save () {
        console.log(this.profile);
        console.log(this.profileSvc.authProfile.userId);
        // let userId = this.profileSvc.authProfile.userId;
        // this.profileSvc.saveProfile(this.profile, userId);
    }
}