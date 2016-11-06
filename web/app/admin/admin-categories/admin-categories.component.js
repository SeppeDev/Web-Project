"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var admin_service_1 = require("../admin.service");
var AdminCategoriesComponent = (function () {
    function AdminCategoriesComponent(adminSvc) {
        this.adminSvc = adminSvc;
    }
    /**
     * Fires when component is loaded
     */
    AdminCategoriesComponent.prototype.ngOnInit = function () {
        this.getCategories();
    };
    AdminCategoriesComponent.prototype.validate = function () {
        this.newCategoryError = "";
        if (!this.newCategory || typeof (this.newCategory) == "undefined") {
            this.newCategoryError = "Geef een nieuwe categorie in.";
        }
        if (this.newCategoryError == "") {
            this.saveCategory();
        }
    };
    /**
     * Delete a category
     */
    AdminCategoriesComponent.prototype.deleteCategory = function (id) {
        var _this = this;
        this.adminSvc.deleteCategory(id)
            .then(function (data) {
            console.log(data);
            _this.categories = _this.categories.filter(function (category) { return category.id != id; });
        }, function (error) {
            console.log(error);
        });
    };
    /**
     * Get all categories
     */
    AdminCategoriesComponent.prototype.getCategories = function () {
        var _this = this;
        this.adminSvc.getCategories()
            .then(function (data) {
            _this.categories = JSON.parse(data._body);
        }, function (error) {
            console.log(error);
        });
    };
    /**
     * Create new category
     */
    AdminCategoriesComponent.prototype.saveCategory = function () {
        var _this = this;
        this.adminSvc.saveCategory(this.newCategory)
            .then(function (data) {
            _this.categories.push(JSON.parse(data._body));
        }, function (error) {
            console.log(error);
        });
    };
    AdminCategoriesComponent = __decorate([
        core_1.Component({
            selector: "ch-admin-categories",
            providers: [admin_service_1.AdminService],
            templateUrl: "app/admin/admin-categories/admin-categories.component.html"
        }), 
        __metadata('design:paramtypes', [admin_service_1.AdminService])
    ], AdminCategoriesComponent);
    return AdminCategoriesComponent;
}());
exports.AdminCategoriesComponent = AdminCategoriesComponent;
//# sourceMappingURL=admin-categories.component.js.map