import { Component, OnInit }        from "@angular/core";
import { ActivatedRoute, Params }   from "@angular/router";

import { DashboardService } from "../dashboard.service";

@Component({
    selector: "ch-user-detail",
    providers: [ DashboardService ],
    templateUrl: "app/dashboard/user-detail/user-detail.component.html"
})
export class UserDetailComponent implements OnInit {
    
    /**
     * User variable
     */
    user: any = {
        image: {}
    };
    
    constructor (
        private dashSvc: DashboardService,
        private route: ActivatedRoute
    ) { }
    
    /**
     * Fires when component is loaded
     */
    ngOnInit (): void {
        this.route.params.forEach((params: Params) => {
            let id = +params["userId"];
            this.getUser(id);
        })
    }
    
    /**
     * Go to previous application state
     */
    goBack () {
        window.history.back();
    }

    /**
     * Get user details
     */
    private getUser (userId: number): void {
        this.dashSvc.getUser(userId)
            .then((data: any) => {
                this.user = JSON.parse(data._body);
                console.log(this.user);
            }, (error: any) => {
                console.log(error);
            });       
    }    
}