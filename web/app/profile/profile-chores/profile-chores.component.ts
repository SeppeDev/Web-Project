import { Component, OnInit } from "@angular/core";

import { ProfileService } from "../profile.service";

@Component({
    selector: "ch-profile-chores",
    providers: [ ProfileService ],
    templateUrl: "app/profile/profile-chores/profile-chores.component.html"
})
export class ProfileChoresComponent implements OnInit {
    /**
     * Chores belonging to this user
     */
    chores: any = [];

    constructor (private profileSvc: ProfileService) { }

    /**
     * Fires when component is loaded
     */
    ngOnInit () {
        this.getChores();
    }

    deleteChore (id: number) {
        this.profileSvc.deleteChore(id)
            .then((data: any) => {
                this.chores = this.chores.filter((chore: any) => chore.id != id);
            }, (error: any) => {
                console.log(error);
            })
    }

    /**
     * Get all categories
     */
    private getChores() {
        this.profileSvc.getUserChores()
            .then((data: any) => {
                this.chores = JSON.parse(data._body);
            }, (error: any) => {
                console.log(error);
            })
    }
}