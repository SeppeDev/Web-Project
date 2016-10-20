import { Component, OnInit } from "@angular/core";

import { DashboardService } from "./dashboard.service";

@Component({
    selector: "chorehub-dashboard",
    templateUrl: "app/dashboard/dashboard.component.html"
})
export class DashboardComponent implements OnInit {
    categories: String[] = [];
    chores: {}[] = []
    chore: {};

    constructor (private dashSvc: DashboardService) { }

    ngOnInit () {
        this.getCategories();

        this.chore = {
            title: "Title",
            User: {
                FirstName: "Benno",
                LastName: "Meysmans",
                Email: "test@example.com",
                isAdmin: false,
                Image: "https://www.solo.be/uploadedimages/ingredienten/960x446/960/446/appel.jpg"
            },
            Description: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsumLorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsumLorem ipsum";
        } 
    }

    private clear (): void {
        this.chores = [];
    }

    private getCategories (): void {
        this.dashSvc.getCategories()
            .subscribe((data: any) => {
                this.categories.push(data);            
            }, (error: any) => {
                console.log(error);
            });
    }

    private getChores (): void {
        this.dashSvc.getChores()
            .subscribe((data: any) => {
                this.chores.push(data);
            }, (error: any) => {
                console.log(error)
            });
    }

    private getChoresByCategory (category: string): void {
        this.dashSvc.getChoresByCategory(category)
            .subscribe((data: any) => {
                this.chores.push(data);
            }, (error: any) => {
                console.log(error);
            })
    }
}