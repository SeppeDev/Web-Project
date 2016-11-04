import { Component } from "@angular/core";

import { DashboardService } from "../dashboard.service";

@Component({
    selector: "ch-chore-create",
    templateUrl: "app/dashboard/chore-create/chore-create.component.html"
})
export class ChoreCreateComponent {
    /**
     * Chore being created
     */
    chore: any = {};

    constructor (private dashSvc: DashboardService) { }
}