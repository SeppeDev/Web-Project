import { Component, OnInit } from "@angular/core";

import { DashboardService } from "./dashboard.service";

@Component({
    selector: "chorehub-dashboard",
    templateUrl: "app/dashboard/dashboard.component.html"
})
export class DashboardComponent implements OnInit {
    categories: String[] = [];
    
    constructor (private dashSvc: DashboardService) { }

    ngOnInit () {
        this.getCategories();
    }

    private getCategories (): void {
        this.dashSvc.getCategories()
            .subscribe((data: any) => {
                this.categories.push(data);            
            }, (error: any) => {
                console.log(error);
            });
    }


}