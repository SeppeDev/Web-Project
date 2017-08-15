import { Component, OnInit } from '@angular/core';

import { AdminService } from '../admin.service';

@Component({
    selector: 'ch-admin-users',
    providers: [ AdminService ],
    templateUrl: 'admin-users.component.html'
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
     * Delete a user
     */
    deleteUser (user: any) {
        this.adminSvc.deleteUser(user.id)
            .then((data: any) => {
                // console.log(data);
                this.users = this.users.filter((u: any) => u.id !== user.id);
            }, (error: any) => {
                // console.log(error);
            });
    }

    /**
     * Gets all users
     */
    private getUsers() {
        this.adminSvc.getUsers()
            .then((data: any) => {
                // console.log(data);
                this.users = JSON.parse(data._body);
                this.users = this.users.filter((user: any) => {
                    return user.auth0Id !== JSON.parse(localStorage.getItem('auth_profile')).user_id;
                });

                // console.log(this.users);
            }, (error: any) => {
                // console.log(error);
            });
    }
}
