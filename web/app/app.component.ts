import { Component }    from "@angular/core";

import { AuthService }  from "./services/auth.service";

@Component({
    selector: "chorehub-app",
    providers: [ AuthService ],
    templateUrl: "app/app.component.html"
})
export class AppComponent {
    constructor (private authSvc: AuthService) { } 

    showLogin () {
        this.authSvc.showLogin();
    }

    showRegister () {
        this.authSvc.showRegister();
    }
 }
