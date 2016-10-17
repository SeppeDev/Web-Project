import { Component } from "@angular/core";

@Component({
    selector: "chorehub-dashboard",
    templateUrl: "app/dashboard/dashboard.component.html"
})
export class DashboardComponent {
    categories: String[];
    
    constructor () { 
        this.categories = [
            "Do Shit",
            "Do Some More Shit",
            "Shit to be done",
            "Clean my shit"
        ]
    }

    private getCategories (): String[] {
        return [];
    }


}