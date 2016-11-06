import { Component }                        from "@angular/core";
import { Router, Event, NavigationStart }   from "@angular/router";

import { AuthService }  from "./shared/auth/auth.service";

@Component({
    selector: "chorehub-app",
    providers: [ AuthService ],
    templateUrl: "app/app.component.html"
})
export class AppComponent {
    topMenuActive:      boolean = false;
    bottomMenuActive:   boolean = false;
    hubMenuActive:      boolean = false;

    constructor (
        private authSvc: AuthService,
        private router: Router
    ) {         
        router.events.forEach((event: Event) => {
                if(event instanceof NavigationStart) {
                    this.topMenuActive = false;
                    this.bottomMenuActive = false;
                }            
            });
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
