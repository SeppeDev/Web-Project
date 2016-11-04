import { Component, OnInit }        from "@angular/core";
import { ActivatedRoute, Params }   from "@angular/router";
import { Location }                 from "@angular/common";

import { DashboardService } from "../dashboard.service";

@Component({
    selector: "ch-user-detail",
    templateUrl: "app/dashboard/user-detail/user-detail.component.html"
})
export class UserDetailComponent implements OnInit {
    constructor (
        private dashSvc: DashboardService,
        private route: ActivatedRoute,
        private location: Location
    ) { }
    
    /**
     * Fires when component is loaded
     */
    ngOnInit (): void {
        this.route.params.forEach((params: Params) => {
            let name = params["userName"];
            this.getUser(name);
        })
    }
    
    /**
     * Go to previous application state
     */
    goBack () {
        this.location.back();
    }

    /**
     * Get user details
     */
    private getUser (userName: string): void {
        console.log(userName);
        // this.dashSvc.getUser(userName).subscribe((user) => {
        //     this.user = user;
        // });
    }    

    /**
     * The user in this detail view
     */
    user: any = {
        firstName: "Benno",
        lastName: "Meysmans",
        categories: ["Cooking", "Shopping"],
        description: "Lorem Ipsum Zever",
        email: "test2@example.com",
        isAdmin: false,
        image: "https://www.solo.be/uploadedimages/ingredienten/960x446/960/446/appel.jpg"
    }
}