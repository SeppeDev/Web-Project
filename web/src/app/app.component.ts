import { Component }                         from '@angular/core';
import { Router, Event, NavigationStart }    from '@angular/router';

import { AuthService }  from './shared/auth/auth.service';

@Component({
    selector: 'app-root',
    providers: [ AuthService ],
    templateUrl: 'app.component.html'
})
export class AppComponent {
    topMenuActive = false;
    bottomMenuActive = false;
	hubMenuActive = false;

    constructor (
        public authSvc: AuthService,
        private router: Router
    ) {
        router.events.forEach((event: Event) => {
                if (event instanceof NavigationStart) {
                    window.scrollTo(0, 0);
                    this.topMenuActive = false;
                    this.bottomMenuActive = false;
                }
			});

			this.authSvc.handleAuthentication();
    }

    showTopMenu (): void {
        this.topMenuActive = !this.topMenuActive;
    }

    showBottomMenu (): void {
        this.bottomMenuActive = !this.bottomMenuActive;
    }

    showHubMenu (): void {
        this.hubMenuActive = !this.hubMenuActive;
    }
 }
