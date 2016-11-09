import { Component, OnInit }                from "@angular/core";
import { ActivatedRoute, Params }   from "@angular/router";

import { DashboardService } from "../dashboard.service";

@Component({
    selector: "ch-chore-detail",
    providers: [ DashboardService ],
    templateUrl: "app/dashboard/chore-detail/chore-detail.component.html"
})
export class ChoreDetailComponent implements OnInit {

    /**
     * User variable
     */
    chore: any = {
        category: {},
        user: {}
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
            let id = +params["choreId"];
            this.getChore(id);
        });
    }
    
    /**
     * Go to previous application state
     */
    goBack () {
        window.history.back();
    }

    /**
     * Get chore details
     */
    private getChore (choreId: number): void {
        this.dashSvc.getChore(choreId)
            .then((data: any) => {
                this.chore = JSON.parse(data._body);
                // console.log(this.chore);
            }, (error: any) => {
                // console.log(error);
            });       
    }
}