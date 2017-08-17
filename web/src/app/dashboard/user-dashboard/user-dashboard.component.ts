import { Component, OnInit } from '@angular/core';

import { DashboardService } from '../dashboard.service';

@Component({
    selector: 'ch-user-dashboard',
    providers: [ DashboardService ],
    templateUrl: 'user-dashboard.component.html'
})
export class UserDashboardComponent implements OnInit {
    /**
     * Users variable
     */
	users: any = [];

	/**
	 * Filtered users list
	 */
	filteredUsers: any = [];

	/**
	 * Current location to filter by
	 */
	location = '';

    constructor (private dashSvc: DashboardService) { }

    /**
     * Fires when component is loaded
     */
    ngOnInit () {
        this.getUsers();
    }

    /**
     * Reset users
     */
    reset (): void {
        this.filteredUsers = this.users;
	}

	/**
	 * Filter users list by location
	 */
	changeLocation () {
		console.log(this.location);
		this.filterUsers();
	}

	/**
	 * Filter lists
	 */
	private filterUsers () {
		this.filteredUsers = this.users.filter ((user: any) => {
			return user.location.toLowerCase().indexOf(this.location.toLowerCase()) > -1;
		});
	}

	/**
	 * Get all users
	 */
	private getUsers () {
		this.dashSvc.getUsers()
			.then((data: any) => {
				this.users = JSON.parse(data._body);
				this.reset();
			}, (error: any) => {
				// console.log(error);
			});
	}
}
