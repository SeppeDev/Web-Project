import { Component }    from "@angular/core";

import { AuthService } from "../shared/auth/auth.service"; 

@Component({
    selector: "chorehub-home",
    templateUrl: "app/home/home.component.html"
})
export class HomeComponent {
    constructor (private authSvc: AuthService ) { }
 }
