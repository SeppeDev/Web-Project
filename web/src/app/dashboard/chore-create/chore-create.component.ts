import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';

import { DashboardService } from '../dashboard.service';

@Component({
    selector: 'ch-chore-create',
    providers: [ DashboardService ],
    templateUrl: 'chore-create.component.html'
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

    /**
     * List of errors
     */
    errors: any = {};

    constructor (
        private dashSvc: DashboardService,
        private router: Router
    ) { }

    /**
     * Fires when component is loaded
     */
    ngOnInit () {
        this.chore = {
            category: ''
		};

        this.getCategories();
    }

    /**
     * Return to previous application state
     */
    goBack () {
        window.history.back();
    }

    /**
     * Validate chore creation form
     */
    validate () {
        this.errors = [];
        // console.log(this.chore);
        if (!this.chore.title || typeof(this.chore.title) === 'undefined') {
            this.errors.titleError = 'Vul dit veld aub in.';
        } else if (this.chore.title.length > 46) {
            this.errors.titleError = 'Dit veld mag max. 46 karakters bevatten';
        }

        if (!this.chore.description || typeof(this.chore.description) === 'undefined') {
            this.errors.descriptionError = 'Vul dit veld aub in.';
        } else if (this.chore.description.length > 500) {
            this.errors.descriptionError = 'Dit veld kan maximaal 500 karaters bevatten.';
        }

        if (!this.chore.location || typeof(this.chore.location) === 'undefined') {
            this.errors.locationError = 'Vul dit veld aub in.';
        } else if (this.chore.location.length > 46) {
            this.errors.locationError = 'Dit veld kan maximaal 46 karakters bevatten.';
        }

        if (this.chore.category === '') {
            this.errors.categoryError = 'Selecteer een categorie.';
        }

        if (Object.keys(this.errors).length === 0) {
            this.saveChore();
        }
    }

    /**
     * Get all categories
     */
    private getCategories () {
        this.dashSvc.getCategories()
            .then((data: any) => {
                // console.log(data);
                this.categories = JSON.parse(data._body);
            }, (error: any) => {
                // console.log(error);
            });
    }

    /**
     * Create new chore
     */
    private saveChore () {
        this.dashSvc.saveChore(this.chore)
            .then((data: any) => {
                this.router.navigate(['/hub/chores', JSON.parse(data._body).id]);
            }, (error: any) => {
                // console.log(error);
            });
    }
}
