import { Component, OnInit } from '@angular/core';

import { DashboardService } from '../dashboard.service';

@Component({
    selector: 'ch-chore-dashboard',
    providers: [ DashboardService ],
    templateUrl: 'chore-dashboard.component.html'
})
export class ChoreDashboardComponent implements OnInit {
	/**
	 * Current category to filter by
	 */
	selectedCategory: any;

	/**
	 * Current location to filter by
	 */
	location = '';

	/**
	 * Filtered list of chores
	 */
	filteredChores: any;

    /**
     * Variable for all chores
     */
    chores: any = [];

    /**
     * Variable for all categories
     */
    categories: any = [];

    constructor (private dashSvc: DashboardService) { }

    /**
     * Fires when component is loaded
     */
    ngOnInit () {
        this.getChores();
    }

    /**
     * Filter chores list by selected category
     */
    changeCategory (category: any): void {
		this.selectedCategory = category;
		this.filterChores();
	}

	/**
	 * Filter chores list by location
	 */
	changeLocation () {
		console.log(this.location);
		this.filterChores();
	}

    /**
     * Reset users
     */
    reset (): void {
        this.filteredChores = this.chores;
	}

	/**
	 * Filter lists
	 */
	private filterChores () {
		if (this.selectedCategory) {
			this.filteredChores = this.chores.filter ((chore: any) => {
				return chore.category.id === this.selectedCategory.id && chore.location.toLowerCase().indexOf(this.location.toLowerCase()) > -1;
			});
		} else {
			this.filteredChores = this.chores.filter ((chore: any) => {
				return chore.location.toLowerCase().indexOf(this.location.toLowerCase()) > -1;
			});
		}
	}

    /**
     * Get all chores
     */
    private getChores (): void {
        this.dashSvc.getChores()
            .then((data: any) => {
                this.chores = JSON.parse(data._body);
                this.reset();
                this.extractCategories(this.chores);
            }, (error: any) => {
                // console.log(error)
            });
    }

    /**
     * Extract used categories from chores
     */
    private extractCategories (chores: any) {
        chores.forEach((chore: any) => {
            // if(this.chores.length == 0) {
                this.categories.push(chore.category);
            // } else {


            // }
        });

        const filtered = this.unique(this.categories);
        // console.log(filtered);
    }

    private unique (a: any) {
        a.sort();

        for (let i = 1; i < a.length; ) {
            if (a[i - 1].id === a[i].id) {
                a.splice(i, 1);
            } else {
                i++;
            }
        }
        return a;
    }

    // /**
    //  * Get chores of certain category
    //  */
    // private getChoresByCategory (category: string): void {
    //     this.dashSvc.getChoresByCategory(category)
    //         .then((data: any) => {
    //             this.chores.push(data);
    //         }, (error: any) => {
    //             // console.log(error);
    //         })
    // }
}
