import { Component, OnInit } from "@angular/core";

import { AdminService } from "../admin.service";

@Component({
    selector: "ch-admin-chores",
    providers: [ AdminService ],
    templateUrl: "app/admin/admin-chores/admin-chores.component.html"
})
export class AdminChoresComponent implements OnInit {
    /**
     * All chores
     */
    chores: any = [];
    
    constructor(private adminSvc: AdminService) { }

    /**
     * Fires when component is loaded
     */
    ngOnInit() {
        this.getChores();
    }

     /**
      * Deletes a chore
      */    
    deleteChore (choreId: number) {
        this.adminSvc.deleteChore(choreId)
            .then((data: any) => {
                // console.log(data);
            }, (error: any) => {
                // console.log(error);
            });
    } 

    /**
     * Get all chores
     */
    private getChores () {
        this.adminSvc.getChores()
            .then((data: any) => {
                this.chores = JSON.parse(data._body);
                // console.log(data);
            }, (error: any) => {
                // console.log(error);
            })
    }
}