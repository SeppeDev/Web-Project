import { Component, OnInit } from "@angular/core";

import { AdminService } from "../admin.service";

@Component({
    selector: "ch-admin-users",
    providers: [ AdminService ],
    templateUrl: "app/admin/admin-users/admin-users.component.html"
})
export class AdminUsersComponent implements OnInit {
    /**
     * All users
     */
    users: any;

    constructor (private adminSvc: AdminService) { }

    /**
     * Fires when component is loaded
     */  
    ngOnInit () {
        this.getUsers();
    }

    /**
     * Gets all users
     */
    private getUsers() {
        this.adminSvc.getUsers()
            .then((data: any) => {
                console.log(data);
                this.users = JSON.parse(data._body);
                console.log(this.users);
            }, (error: any) => {
                console.log(error);
            })
    }
}