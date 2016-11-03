import { Component } from "@angular/core";

@Component({
    selector: "ch-chore-detail",
    templateUrl: "app/dashboard/chore-detail/chore-detail.component.html"
})
export class ChoreDetailComponent {
    constructor () { }
    
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