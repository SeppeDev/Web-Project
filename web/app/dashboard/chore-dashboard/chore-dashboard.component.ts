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
        this.getCategories();
        this.reset();
    }
    
    /**
     * Filter users list by selected category
     */
    changeCategory (category: any): void {
        console.log(this.chores);
        this.filteredChores = this.chores.filter((chore: any) => {
            return chore.category == category.name;
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
                this.categories = JSON.parse(data._body);   
                console.log(this.categories);         
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
                this.chores = JSON.parse(data._body);
                console.log(this.chores);
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
}