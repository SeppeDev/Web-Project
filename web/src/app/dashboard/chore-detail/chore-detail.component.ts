import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { DashboardService } from '../dashboard.service';
import { AuthService }  from '../../shared/auth/auth.service';

@Component({
    selector: 'ch-chore-detail',
    providers: [ DashboardService ],
    templateUrl: 'chore-detail.component.html'
})
export class ChoreDetailComponent implements OnInit {

    /**
     * User variable
     */
    chore: any = {
        category: {},
        user: {}
    };

    /**
     * Email variable
     */
    email: any = {
        sent: false
    };

    /**
     * List of errors
     */
    errors: any = {};

    constructor (
        private dashSvc: DashboardService,
        private authSvc: AuthService,
        private route: ActivatedRoute
    ) { }

    /**
     * Fires when component is loaded
     */
    ngOnInit (): void {
        this.route.params.forEach((params: Params) => {
            const id = +params['choreId'];
            this.getChore(id);
        });
    }

    /**
     * Validate profile data
     */
    validate () {
        this.errors = {};

        if (!this.email.message || typeof(this.email.message) === 'undefined') {
            this.errors.MessageError = 'Vul dit veld aub in.';
        } else if (this.email.message.length > 500) {
            this.errors.MessageError = 'Dit veld kan maximaal 500 tekens bevatten.';
        }

        console.log(this.errors);

        if (Object.keys(this.errors).length === 0) {
            this.sendMail();
        }
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

    /**
     * Send an email to this person
     */
    sendMail () {
        this.email.recipient = this.chore.user.email;
        this.email.content = '<p>Hallo ' + this.chore.user.firstName +
                            '</br></br></br>' +
                            this.authSvc.userProfile.firstName + ' ' + this.authSvc.userProfile.lastName  +
                            ' heeft gereageerd op je "' + this.chore.title +
                            '" klusje met het volgende:' +
                            '</br></br>' +
                            this.email.message +
                            '</br></br>' +
                            'Contacteer hem/haar op ' + this.authSvc.authProfile.name +
                            '</br></br>' +
                            'Groetjes' +
                            '</br>' +
                            'Het ChoreHub team' +
                            '</p>';

        this.dashSvc.sendMail(this.email)
            .then((data: any) => {
                this.email.sent = true;
            }, (error: any) => {
                // console.log(error);
            });
    }
}
