import { Component, OnInit } from "@angular/core";

import { DashboardService } from "../dashboard.service";

@Component({
    selector: "ch-chore-dashboard",
    providers: [ DashboardService ],
    templateUrl: "app/dashboard/chore-dashboard/chore-dashboard.component.html"
})
export class ChoreDashboardComponent implements OnInit {
    selectedCategory: String = "Cooking";
    filteredChores: any;

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
        console.log(this.chores);
        this.filteredChores = this.chores.filter((chore: any) => {
            return chore.category == category;
        });
    }

    /**
     * Reset users
     */
    reset (): void {
        this.filteredChores = this.chores;
    }

    /**
     * Get all categories
     */
    private getCategories (): void {
        this.dashSvc.getCategories()
            .then((data: any) => {
                this.categories.push(data);            
            }, (error: any) => {
                console.log(error);
            });
    }

    /**
     * Get all chores
     */
    private getChores (): void {
        this.dashSvc.getChores()
            .then((data: any) => {
                this.chores.push(data);
            }, (error: any) => {
                console.log(error)
            });
    }

    /**
     * Get chores of certain category
     */
    private getChoresByCategory (category: string): void {
        this.dashSvc.getChoresByCategory(category)
            .then((data: any) => {
                this.chores.push(data);
            }, (error: any) => {
                console.log(error);
            })
    }

    /**
     * Test data
     */
    chores: any = [
        {
            title: "Title",
            category: "Shopping",
            author: {
                firstName: "Benno",
                lastName: "Meysmans",
                description: "Lorem Ipsum Zever",
                email: "test@example.com",
                isAdmin: false,
                image: "https://www.solo.be/uploadedimages/ingredienten/960x446/960/446/appel.jpg"
            },
            description: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsumLorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsumLorem ipsum";
        },
        {
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
        },
        {
            title: "Title",
            category: "Playing",
            author: {
                firstName: "Benno",
                lastName: "Meysmans",
                description: "Lorem Ipsum Zever",
                email: "test@example.com",
                isAdmin: false,
                image: "https://www.solo.be/uploadedimages/ingredienten/960x446/960/446/appel.jpg"
            },
            description: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsumLorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsumLorem ipsum";
        },
        {
            title: "Title",
            category: "Overwatch",
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
    ];

    categories: any = [
        "Shopping", "Cleaning", "Playing", "Cooking", "Overwatch"
    ];    
}