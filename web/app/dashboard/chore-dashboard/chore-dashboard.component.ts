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
            // if(this.chores.length == 0) {                
                this.categories.push(chore.category);
            // } else {


            // }
        });

        let filtered = this.unique(this.categories);
        console.log(filtered);
    }

    private unique (a: any){
        a.sort();

        for(var i = 1; i < a.length; ) {
            if(a[i-1].id == a[i].id) {
                a.splice(i, 1);
            } else {
                i++;
            }
        }
        return a;
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