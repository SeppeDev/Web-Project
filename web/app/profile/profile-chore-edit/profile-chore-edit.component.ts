import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params }   from "@angular/router";

import { ProfileService } from "../profile.service";

@Component({
    selector: "ch-profile-chore-edit",
    providers: [ ProfileService ],
    templateUrl: "app/profile/profile-chore-edit/profile-chore-edit.component.html"
})
export class ProfileChoreEditComponent implements OnInit {
    constructor(
        private profileSvc: ProfileService,
        private route: ActivatedRoute
    ) { }

    /**
     * Fires when component is loaded
     */
    ngOnInit() {
        let id: number;

        this.route.params.forEach((params: Params) => {
            id = +params["choreId"];
        })
        
        this.getChore(id);
    }

    /**
     * Get chore to edit
     */
    private getChore (id: number) {
        this.profileSvc.getChoreById(id)
            .then((data: any) => {
                console.log();
            }, (error: any) => {
                console.log();
            })
    }
}