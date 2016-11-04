import { Component }    from "@angular/core";

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

    constructor (private authSvc: AuthService) { } 

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
