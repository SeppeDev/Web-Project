import { Component, OnInit } from "@angular/core";

import { ProfileService } from "../profile.service";

@Component({
    selector: "ch-profile-chores",
    providers: [ ProfileService ],
    templateUrl: "app/profile/profile-chores/profile-chores.component.html"
})
export class ProfileChoresComponent implements OnInit {
    constructor (private profileSvc: ProfileService) { }

    /**
     * Fires when component is loaded
     */
    ngOnInit () {
        this.getCategories();
    }

    /**
     * Get all categories
     */
    private getCategories() {
        this.profileSvc.getUserChores()
            .then((data: any) => {
                console.log(data);
            }, (error: any) => {
                console.log(error);
            })
    }
}