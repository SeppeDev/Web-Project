import { Component, OnInit } from "@angular/core";

import { AdminService } from "../admin.service";

@Component({
    selector: "ch-admin-chores",
    providers: [ AdminService ],
    templateUrl: "app/admin/admin-chores/admin-chores.component.html"
})
export class AdminChoresComponent implements OnInit {
    constructor(private adminSvc: AdminService) { }

    ngOnInit() {
        this.adminSvc.getChores()
            .then((data: any) => {
                console.log(data);
            }, (error: any) => {
                console.log(error);
            })
     }
}