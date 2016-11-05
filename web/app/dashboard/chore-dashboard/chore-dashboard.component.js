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
         * Test data
         */
        this.chores = [
            {
                title: "Title",
                category: "Shopping",
                author: {
                    firstName: "Benno",
                    lastName: "Meysmans",
                    description: "Lorem Ipsum Zever",
                    email: "test@example.com",
                    isAdmin: false,
                    image: "https://www.solo.be/uploadedimages/ingredienten/960x446/960/446/appel.jpg"
                },
                description: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsumLorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsumLorem ipsum"
            },
            {
                title: "Title",
                category: "Cleaning",
                author: {
                    firstName: "Benno",
                    lastName: "Meysmans",
                    description: "Lorem Ipsum Zever",
                    email: "test@example.com",
                    isAdmin: false,
                    image: "https://www.solo.be/uploadedimages/ingredienten/960x446/960/446/appel.jpg"
                },
                description: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsumLorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsumLorem ipsum"
            },
            {
                title: "Title",
                category: "Playing",
                author: {
                    firstName: "Benno",
                    lastName: "Meysmans",
                    description: "Lorem Ipsum Zever",
                    email: "test@example.com",
                    isAdmin: false,
                    image: "https://www.solo.be/uploadedimages/ingredienten/960x446/960/446/appel.jpg"
                },
                description: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsumLorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsumLorem ipsum"
            },
            {
                title: "Title",
                category: "Overwatch",
                author: {
                    firstName: "Benno",
                    lastName: "Meysmans",
                    description: "Lorem Ipsum Zever",
                    email: "test@example.com",
                    isAdmin: false,
                    image: "https://www.solo.be/uploadedimages/ingredienten/960x446/960/446/appel.jpg"
                },
                description: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsumLorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsumLorem ipsum"
            }
        ];
        this.categories = [
            "Shopping", "Cleaning", "Playing", "Cooking", "Overwatch"
        ];
    }
    /**
     * Fires when component is loaded
     */
    ChoreDashboardComponent.prototype.ngOnInit = function () {
        // this.getCategories();
        this.reset();
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
    /**
     * Get all categories
     */
    ChoreDashboardComponent.prototype.getCategories = function () {
        var _this = this;
        this.dashSvc.getCategories()
            .then(function (data) {
            _this.categories.push(data);
        }, function (error) {
            console.log(error);
        });
    };
    /**
     * Get all chores
     */
    ChoreDashboardComponent.prototype.getChores = function () {
        var _this = this;
        this.dashSvc.getChores()
            .then(function (data) {
            _this.chores.push(data);
        }, function (error) {
            console.log(error);
        });
    };
    /**
     * Get chores of certain category
     */
    ChoreDashboardComponent.prototype.getChoresByCategory = function (category) {
        var _this = this;
        this.dashSvc.getChoresByCategory(category)
            .then(function (data) {
            _this.chores.push(data);
        }, function (error) {
            console.log(error);
        });
    };
    ChoreDashboardComponent = __decorate([
        core_1.Component({
            selector: "ch-chore-dashboard",
            templateUrl: "app/dashboard/chore-dashboard/chore-dashboard.component.html"
        }), 
        __metadata('design:paramtypes', [dashboard_service_1.DashboardService])
    ], ChoreDashboardComponent);
    return ChoreDashboardComponent;
}());
exports.ChoreDashboardComponent = ChoreDashboardComponent;
//# sourceMappingURL=chore-dashboard.component.js.map