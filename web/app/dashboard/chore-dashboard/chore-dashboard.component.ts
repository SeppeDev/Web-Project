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

    /**
     * Variable for all chores
     */
    chores: any = [];

    /**
     * Variable for all categories
     */
    categories: any = [];

    constructor (private dashSvc: DashboardService) { }

    /**
     * Fires when component is loaded
     */
    ngOnInit () {
        this.getChores();
    }
    
    /**
     * Filter users list by selected category
     */
    changeCategory (category: any): void {
        console.log(this.chores);
        this.filteredChores = this.chores.filter((chore: any) => {
            return chore.category.id == category.id;
        });
    }

    /**
     * Reset users
     */
    reset (): void {
        this.filteredChores = this.chores;
    }

    // /**
    //  * Get all categories
    //  */
    // private getCategories (): void {
    //     this.dashSvc.getCategories()
    //         .then((data: any) => {
    //             this.categories = JSON.parse(data._body); 
    //             console.log(data);       
    //         }, (error: any) => {
    //             console.log(error);
    //         });
    // }

    /**
     * Get all chores
     */
    private getChores (): void {
        this.dashSvc.getChores()
            .then((data: any) => {
                this.chores = JSON.parse(data._body);                
                this.reset();
                this.extractCategories(this.chores);
            }, (error: any) => {
                console.log(error)
            });
    }

    /**
     * Extract used categories from chores
     */
    private extractCategories (chores: any) {
        chores.forEach((chore: any) => {
            console.log(this.categories);
            if(this.categories.length == 0) {
                this.categories.push(chore.category);
            } else {
                this.categories.forEach((category: any) => {
                    if(category.id != chore.category.id) {
                        this.categories.push(chore.category);
                    }
                });
            }
            

            /*if(!this.categories.includes(chore.category)) {
                this.categories.push(chore.category);
            } */           
        });
    }

    // /**
    //  * Get chores of certain category
    //  */
    // private getChoresByCategory (category: string): void {
    //     this.dashSvc.getChoresByCategory(category)
    //         .then((data: any) => {
    //             this.chores.push(data);
    //         }, (error: any) => {
    //             console.log(error);
    //         })
    // } 
}