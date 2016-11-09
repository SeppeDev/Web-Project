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
        /**
         * Users variable
         */
        this.users = [];
    }
    /**
     * Fires when component is loaded
     */
    UserDashboardComponent.prototype.ngOnInit = function () {
        this.getUsers();
    };
    /**
     * Get all users
     */
    UserDashboardComponent.prototype.getUsers = function () {
        var _this = this;
        this.dashSvc.getUsers()
            .then(function (data) {
            _this.users = JSON.parse(data._body);
        }, function (error) {
            // console.log(error);
        });
    };
    UserDashboardComponent = __decorate([
        core_1.Component({
            selector: "ch-user-dashboard",
            providers: [dashboard_service_1.DashboardService],
            templateUrl: "app/dashboard/user-dashboard/user-dashboard.component.html"
        }), 
        __metadata('design:paramtypes', [dashboard_service_1.DashboardService])
    ], UserDashboardComponent);
    return UserDashboardComponent;
}());
exports.UserDashboardComponent = UserDashboardComponent;
//# sourceMappingURL=user-dashboard.component.js.map