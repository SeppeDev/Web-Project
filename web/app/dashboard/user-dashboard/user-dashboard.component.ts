import { Component, OnInit } from "@angular/core";

import { DashboardService } from "../dashboard.service";

@Component({
    selector: "ch-user-dashboard",
    providers: [ DashboardService ],
    templateUrl: "app/dashboard/user-dashboard/user-dashboard.component.html"
})
export class UserDashboardComponent implements OnInit {
    /**
     * Users variable
     */
    users: any = [];

    constructor (private dashSvc: DashboardService) { }

    /**
     * Fires when component is loaded
     */
    ngOnInit () {
        this.getUsers();
    }
 
    /**
     * Get all users
     */
    private getUsers () {
        this.dashSvc.getUsers()
            .then((data: any) => {
                this.users = JSON.parse(data._body);
                console.log(this.users);
            }, (error: any) => {
                console.log(error);
            });
    }
}