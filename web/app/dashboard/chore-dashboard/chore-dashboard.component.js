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
var dashboard_service_1 = require("../dashboard.service");
var ChoreDashboardComponent = (function () {
    function ChoreDashboardComponent(dashSvc) {
        this.dashSvc = dashSvc;
        this.selectedCategory = "Cooking";
        /**
         * Variable for all chores
         */
        this.chores = [];
        /**
         * Variable for all categories
         */
        this.categories = [];
    }
    /**
     * Fires when component is loaded
     */
    ChoreDashboardComponent.prototype.ngOnInit = function () {
        this.getChores();
    };
    /**
     * Filter users list by selected category
     */
    ChoreDashboardComponent.prototype.changeCategory = function (category) {
        console.log(this.chores);
        this.filteredChores = this.chores.filter(function (chore) {
            return chore.category == category;
        });
    };
    /**
     * Reset users
     */
    ChoreDashboardComponent.prototype.reset = function () {
        this.filteredChores = this.chores;
    };
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
    ChoreDashboardComponent.prototype.getChores = function () {
        var _this = this;
        this.dashSvc.getChores()
            .then(function (data) {
            _this.chores = JSON.parse(data._body);
            _this.reset();
            _this.extractCategories(_this.chores);
        }, function (error) {
            console.log(error);
        });
    };
    /**
     * Extract used categories from chores
     */
    ChoreDashboardComponent.prototype.extractCategories = function (chores) {
        var _this = this;
        chores.forEach(function (chore) {
            if (_this.categories.indexOf(chore.category) == -1) {
                _this.categories.push(chore.category);
            }
        });
        console.log(this.categories);
    };
    ChoreDashboardComponent = __decorate([
        core_1.Component({
            selector: "ch-chore-dashboard",
            providers: [dashboard_service_1.DashboardService],
            templateUrl: "app/dashboard/chore-dashboard/chore-dashboard.component.html"
        }), 
        __metadata('design:paramtypes', [dashboard_service_1.DashboardService])
    ], ChoreDashboardComponent);
    return ChoreDashboardComponent;
}());
exports.ChoreDashboardComponent = ChoreDashboardComponent;
//# sourceMappingURL=chore-dashboard.component.js.map