import { Component }                from "@angular/core";
import { ActivatedRoute, Params }   from "@angular/router";

import { DashboardService } from "../dashboard.service";

@Component({
    selector: "ch-chore-detail",
    providers: [ DashboardService ],
    templateUrl: "app/dashboard/chore-detail/chore-detail.component.html"
})
export class ChoreDetailComponent {
    constructor (
        private route: ActivatedRoute
    ) { }
    
    /**
     * Fires when component is loaded
     */
    ngOnInit (): void {
        this.route.params.forEach((params: Params) => {
            let id = +params["choreId"];
        });
    }
    
    /**
     * Go to previous application state
     */
    goBack () {
        window.history.back();
    }

    chore: any = {
        title: "Title",
        category: "Cleaning",
        author: {
            firstName: "Benno",
            lastName: "Meysmans",
            description: "Lorem Ipsum Zever",
            email: "test@example.com",
            isAdmin: false,
            image: "https://www.solo.be/uploadedimages/ingredienten/960x446/960/446/appel.jpg"
        },
        description: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsumLorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsumLorem ipsum"
    }
}