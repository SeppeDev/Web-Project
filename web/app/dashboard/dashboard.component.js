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
var dashboard_service_1 = require("./dashboard.service");
var DashboardComponent = (function () {
    function DashboardComponent(dashSvc) {
        this.dashSvc = dashSvc;
        this.categories = [];
        this.chores = [];
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.getCategories();
        this.chore = {
            title: "Title",
            User: {
                FirstName: "Benno",
                LastName: "Meysmans",
                Description: "Lorem Ipsum Zever",
                Email: "test@example.com",
                isAdmin: false,
                Image: "https://www.solo.be/uploadedimages/ingredienten/960x446/960/446/appel.jpg"
            },
            Description: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsumLorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsumLorem ipsum"
        };
    };
    DashboardComponent.prototype.clear = function () {
        this.chores = [];
    };
    DashboardComponent.prototype.getCategories = function () {
        var _this = this;
        this.dashSvc.getCategories()
            .subscribe(function (data) {
            _this.categories.push(data);
        }, function (error) {
            console.log(error);
        });
    };
    DashboardComponent.prototype.getChores = function () {
        var _this = this;
        this.dashSvc.getChores()
            .subscribe(function (data) {
            _this.chores.push(data);
        }, function (error) {
            console.log(error);
        });
    };
    DashboardComponent.prototype.getChoresByCategory = function (category) {
        var _this = this;
        this.dashSvc.getChoresByCategory(category)
            .subscribe(function (data) {
            _this.chores.push(data);
        }, function (error) {
            console.log(error);
        });
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: "chorehub-dashboard",
            templateUrl: "app/dashboard/dashboard.component.html"
        }), 
        __metadata('design:paramtypes', [dashboard_service_1.DashboardService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map