import { Component } from '@angular/core';

import { AuthService } from '../shared/auth/auth.service';

@Component({
    selector: 'ch-home',
    templateUrl: 'home.component.html'
})
export class HomeComponent {
    constructor (public authSvc: AuthService ) { }
 }
