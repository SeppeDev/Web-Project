import { Component }                from "@angular/core";
import { ActivatedRoute, Params }   from "@angular/router";
import { Location }                 from "@angular/common";

@Component({
    selector: "ch-chore-detail",
    templateUrl: "app/dashboard/chore-detail/chore-detail.component.html"
})
export class ChoreDetailComponent {
    constructor (
        private route: ActivatedRoute,
        private location: Location
    ) { }
    
    /**
     * Fires when component is loaded
     */
    ngOnInit (): void {
        this.route.params.forEach((params: Params) => {
            let name = params["choreName"];
        });
    }
    
    /**
     * Go to previous application state
     */
    goBack () {
        this.location.back();
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
        description: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsumLorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsumLorem ipsum";
    }
}