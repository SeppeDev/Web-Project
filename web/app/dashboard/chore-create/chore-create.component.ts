import { Component, OnInit } from "@angular/core";

import { DashboardService } from "../dashboard.service";

@Component({
    selector: "ch-chore-create",
    providers: [ DashboardService ],
    templateUrl: "app/dashboard/chore-create/chore-create.component.html"
})
export class ChoreCreateComponent implements OnInit {
    /**
     * Chore being created
     */
    chore: any;

    /**
     * Existing chore categories
     */
    categories: any;

    constructor (private dashSvc: DashboardService) { }

    /**
     * Fires when component is loaded
     */  
    ngOnInit () {
        this.chore = {
            category: ""
        }
        this.getCategories();
    }

    test () {
        console.log(this.chore);
    }

    /**
     * Get all categories
     */
    private getCategories () {
        this.dashSvc.getCategories()   
            .then((data: any) => {
                console.log(data);
                this.categories = JSON.parse(data._body);
            }, (error: any) => {
                console.log(error);
            });
    }
}