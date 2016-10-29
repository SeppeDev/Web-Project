import { Component, OnInit }    from "@angular/core";
import { ActivatedRoute }       from "@angular/router";

import { ProfileService } from "../profile.service";

@Component({
    selector: "ch-edit-profile",
    providers: [ ProfileService ],
    templateUrl: "app/profile/edit-profile/edit-profile.component.html"
})
export class EditProfileComponent implements OnInit {
    state: String;

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
        this.profileSvc.saveProfile({});
    }
}