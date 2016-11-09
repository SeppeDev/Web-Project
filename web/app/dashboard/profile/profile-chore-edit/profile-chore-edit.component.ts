import { Component, OnInit }                from "@angular/core";
import { ActivatedRoute, Params, Router }   from "@angular/router";

import { ProfileService } from "../profile.service";

@Component({
    selector: "ch-profile-chore-edit",
    providers: [ ProfileService ],
    templateUrl: "app/profile/profile-chore-edit/profile-chore-edit.component.html"
})
export class ProfileChoreEditComponent implements OnInit {
    /**
     * Chore to edit
     */
    chore: any = {
        category: ""
    };

    /**
     * Validation errors
     */
    errors: any = {};

    /**
     * Existing chore categories
     */
    categories: any;

    constructor(
        private profileSvc: ProfileService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    /**
     * Fires when component is loaded
     */
    ngOnInit() {
        let id: number;

        this.route.params.forEach((params: Params) => {
            id = +params["choreId"];
        })
        
        // this.getCategories();
        this.getChore(id);
    }

    /**
     * Return to previous application state
     */
    goBack () {
        window.history.back();
    }

    /**
     * Validate chore editing form
     */
    validate () {
        this.errors = [];
        
        if(!this.chore.title || typeof(this.chore.title) == "undefined") {
            this.errors.titleError = "Geef een titel in.";
        } else if (this.chore.title.length > 46) {
            this.errors.titleError = "Dit veld kan maximaal 46 karakters bevatten";
        }

        if(!this.chore.description || typeof(this.chore.description) == "undefined") {
            this.errors.descriptionError = "Voeg een beschrijving toe."
        }

        if(!this.chore.location || typeof(this.chore.location) == "undefined") {
            this.errors.locationError = "Geef een locatie in.";
        } else if (this.chore.location.length > 46) {
            this.errors.locationError = "Dit veld kan maximaal 46 karakters bevatten";
        }

        // if(this.chore.category == "") {
        //     this.errors.categoryError = "Selecteer een categorie.";
        // }

        if(Object.keys(this.errors).length == 0) {
            this.updateChore();
        }
    }

    /**
     * Get chore to edit
     */
    private getChore (id: number) {
        this.profileSvc.getChoreById(id)
            .then((data: any) => {
                this.chore = JSON.parse(data._body);
                // console.log(this.chore);
            }, (error: any) => {
                // console.log();
            })
    }

    /**
     * Get all categories
     */
    // private getCategories () {
    //     this.profileSvc.getCategories()   
    //         .then((data: any) => {
    //             // console.log(data);
    //             this.categories = JSON.parse(data._body);
    //         }, (error: any) => {
    //             // console.log(error);
    //         });
    // }

    /**
     * Update chore
     */
    private updateChore () {
        this.profileSvc.updateChore(this.chore)
            .then((data: any) => {
                // console.log(data);
                this.router.navigate(["/hub/chores", this.chore.id]);
            }, (error: any) => {
                // console.log(error);
            })
    }
}