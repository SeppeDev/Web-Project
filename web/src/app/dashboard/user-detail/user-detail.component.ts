import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { DashboardService } from '../dashboard.service';
import { AuthService }  from '../../shared/auth/auth.service';

@Component({
    selector: 'ch-user-detail',
    providers: [ DashboardService ],
    templateUrl: 'user-detail.component.html'
})
export class UserDetailComponent implements OnInit {

    /**
     * User variable
     */
    user: any = {
        image: {}
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
            const id = +params['userId'];
            this.getUser(id);
        });
    }

    /**
     * Go to previous application state
     */
    goBack () {
        window.history.back();
    }

    /**
     * Get user details
     */
    private getUser (userId: number): void {
        this.dashSvc.getUser(userId)
            .then((data: any) => {
                this.user = JSON.parse(data._body);
                // console.log(this.user);
            }, (error: any) => {
                // console.log(error);
            });
    }

    /**
     * Send an email to this person
     */
    sendMail () {
        this.email.recipient = this.user.email;
        this.email.content = '<p>Hallo ' + this.user.firstName +
                            '</br></br></br>' +
                            this.authSvc.authProfile.nickname + ' heeft je het volgende bericht gestuurd:' +
                            '</br></br>' +
                            this.email.message +
                            '</br></br>' +
                            'Contacteer hem/haar op ' + this.authSvc.authProfile.name +
                            '</br></br>' +
                            'Groetjes' +
                            '</br>' +
                            'Het ChoreHubTeam' +
                            '</p>';

        this.dashSvc.sendMail(this.email)
            .then((data: any) => {
                this.email.sent = true;
            }, (error: any) => {
                // console.log(error);
            });
    }
}
