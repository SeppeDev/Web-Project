import { Component, OnInit } from "@angular/core";

import { DashboardService } from "../dashboard.service";

@Component({
    selector: "ch-user-detail",
    template: "<h1>User Detail</h1>"
})
export class UserDetailComponent implements OnInit {
    /**
     * The user in this detail view
     */
    user: any;

    constructor (private dashSvc: DashboardService) { }
    
    ngOnInit () {
        this.getUser("lelqol");
    }

    private getUser (userName: string) {
        this.dashSvc.getUser(userName).subscribe((user) => {
            this.user = user;
        });
    }    
}