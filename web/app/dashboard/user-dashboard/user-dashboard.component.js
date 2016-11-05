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
var UserDashboardComponent = (function () {
    function UserDashboardComponent(dashSvc) {
        this.dashSvc = dashSvc;
        // categories: String[] = [];
        this.selectedCategory = "Cooking";
        /**
         * Test data
         */
        this.users = [
            {
                firstName: "Benno",
                lastName: "Meysmans",
                categories: ["Shopping", "Cleaning"],
                description: "Lorem Ipsum Zever",
                email: "test@example.com",
                isAdmin: false,
                image: "https://www.solo.be/uploadedimages/ingredienten/960x446/960/446/appel.jpg"
            },
            {
                firstName: "Seppe",
                lastName: "Goossens",
                categories: ["Cooking", "Shopping"],
                description: "Lorem Ipsum Zever",
                email: "test2@example.com",
                isAdmin: false,
                image: "https://www.solo.be/uploadedimages/ingredienten/960x446/960/446/appel.jpg"
            },
            {
                firstName: "Jonas",
                lastName: "Van Eeckhout",
                categories: ["Zeveren", "Shopping"],
                description: "Lorem Ipsum Zever",
                email: "test3@example.com",
                isAdmin: false,
                image: "https://www.solo.be/uploadedimages/ingredienten/960x446/960/446/appel.jpg"
            }, {
                firstName: "Josh",
                lastName: "Pearson",
                categories: ["Playing", "Overwatch"],
                description: "Lorem Ipsum Zever",
                email: "test@example.com",
                isAdmin: false,
                image: "https://www.solo.be/uploadedimages/ingredienten/960x446/960/446/appel.jpg"
            }
        ];
        this.categories = [
            "Shopping", "Cleaning", "Playing", "Cooking", "Overwatch"
        ];
    }
    /**
     * Fires when component is loaded
     */
    UserDashboardComponent.prototype.ngOnInit = function () {
        // this.getCategories();
        this.reset();
    };
    /**
     * Filter users list by selected category
     */
    UserDashboardComponent.prototype.changeCategory = function (category) {
        this.filteredUsers = this.users.filter(function (user) {
            return user.categories.includes(category);
        });
    };
    /**
     * Reset users
     */
    UserDashboardComponent.prototype.reset = function () {
        this.filteredUsers = this.users;
    };
    /**
     * Get all categories
     */
    UserDashboardComponent.prototype.getCategories = function () {
        var _this = this;
        this.dashSvc.getCategories()
            .then(function (data) {
            _this.categories.push(data);
        }, function (error) {
            console.log(error);
        });
    };
    UserDashboardComponent = __decorate([
        core_1.Component({
            selector: "ch-user-dashboard",
            templateUrl: "app/dashboard/user-dashboard/user-dashboard.component.html"
        }), 
        __metadata('design:paramtypes', [dashboard_service_1.DashboardService])
    ], UserDashboardComponent);
    return UserDashboardComponent;
}());
exports.UserDashboardComponent = UserDashboardComponent;
//# sourceMappingURL=user-dashboard.component.js.map