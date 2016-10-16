import { Component }    from "@angular/core";

import { AuthService }  from "./services/auth.service";

@Component({
    selector: "chorehub-app",
    providers: [ AuthService ],
    templateUrl: "app/app.component.html"
})
export class AppComponent {
    topMenuActive: boolean = false;
    bottomMenuActive: boolean = false;

    constructor (private authSvc: AuthService) { } 

    showTopMenu () {
        this.topMenuActive = !this.topMenuActive;
    }

    showBottomMenu () {
        this.bottomMenuActive = !this.bottomMenuActive;
    }
 }
