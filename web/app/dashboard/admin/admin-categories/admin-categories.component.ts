import { Component, OnInit } from "@angular/core";

import { AdminService } from "../admin.service";

@Component({
    selector: "ch-admin-categories",
    providers: [ AdminService ],
    templateUrl: "app/admin/admin-categories/admin-categories.component.html"
})
export class AdminCategoriesComponent implements OnInit {
    /**
     * All categories
     */
    categories: any;

    /**
     * New category validation error
     */
    newCategoryError: string;

    /**
     * New category to be added
     */
    newCategory: string;

    constructor (private adminSvc: AdminService) { }

    /**
     * Fires when component is loaded
     */   
    ngOnInit () {
        this.getCategories();
    }

    validate () {
        this.newCategoryError = "";

        if(!this.newCategory || typeof(this.newCategory) == "undefined") {
            this.newCategoryError = "Geef een nieuwe categorie in.";
        }

        if(this.newCategoryError == "") {
            this.saveCategory();
        }
    }

    /**
     * Delete a category
     */
    deleteCategory (id: number) {
        this.adminSvc.deleteCategory(id)
            .then((data) => {
                // console.log(data);
                this.categories = this.categories.filter((category: any) => category.id != id );
            }, (error) => {
                // console.log(error);
            })
    }

    /**
     * Get all categories
     */
    private getCategories () {
        this.adminSvc.getCategories()
            .then((data: any) => {
                this.categories = JSON.parse(data._body);
            }, (error: any) => {
                // console.log(error);
            });
    }

    /**
     * Create new category
     */
    private saveCategory () {
        this.adminSvc.saveCategory(this.newCategory)
            .then((data: any) => {
                this.categories.push(JSON.parse(data._body));
            }, (error: any) => {
                // console.log(error);
            })
    }

}