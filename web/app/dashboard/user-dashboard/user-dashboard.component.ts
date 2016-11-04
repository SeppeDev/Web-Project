import { Component, OnInit } from "@angular/core";

import { DashboardService } from "../dashboard.service";

@Component({
    selector: "ch-user-dashboard",
    templateUrl: "app/dashboard/user-dashboard/user-dashboard.component.html"
})
export class UserDashboardComponent implements OnInit {
    // categories: String[] = [];
    selectedCategory: String = "Cooking";
    filteredUsers: any;

    constructor (private dashSvc: DashboardService) { }

    /**
     * Fires when component is loaded
     */
    ngOnInit () {
        // this.getCategories();
        this.reset();
    }

    /**
     * Filter users list by selected category
     */
    changeCategory (category: any): void {
        this.filteredUsers = this.users.filter((user: any) => {
            return user.categories.includes(category);
        });
    }

    /**
     * Reset users
     */
    private reset (): void {
        this.filteredUsers = this.users;
    }

    /**
     * Get all categories
     */
    private getCategories (): void {
        this.dashSvc.getCategories()
            .subscribe((data: any) => {
                this.categories.push(data);            
            }, (error: any) => {
                console.log(error);
            });
    }

    /**
     * Test data
     */
    users: any = [
        {
            firstName: "Benno",
            lastName: "Meysmans",
            categories: ["Shopping", "Cleaning"],
            description: "Lorem Ipsum Zever",
            email: "test@example.com",
            isAdmin: false,
            image: "https://www.solo.be/uploadedimages/ingredienten/960x446/960/446/appel.jpg"
        },
        {
            firstName: "Seppe",
            lastName: "Goossens",
            categories: ["Cooking", "Shopping"],
            description: "Lorem Ipsum Zever",
            email: "test2@example.com",
            isAdmin: false,
            image: "https://www.solo.be/uploadedimages/ingredienten/960x446/960/446/appel.jpg"
        },
        {
            firstName: "Jonas",
            lastName: "Van Eeckhout",
            categories: ["Zeveren", "Shopping"],
            description: "Lorem Ipsum Zever",
            email: "test3@example.com",
            isAdmin: false,
            image: "https://www.solo.be/uploadedimages/ingredienten/960x446/960/446/appel.jpg"
        },{
            firstName: "Josh",
            lastName: "Pearson",
            categories: ["Playing", "Overwatch"],
            description: "Lorem Ipsum Zever",
            email: "test@example.com",
            isAdmin: false,
            image: "https://www.solo.be/uploadedimages/ingredienten/960x446/960/446/appel.jpg"
        }
    ];

    categories: any = [
        "Shopping", "Cleaning", "Playing", "Cooking", "Overwatch"
    ];
}