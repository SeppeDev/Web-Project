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
var AdminUsersComponent = (function () {
    function AdminUsersComponent(adminSvc) {
        this.adminSvc = adminSvc;
    }
    /**
     * Fires when component is loaded
     */
    AdminUsersComponent.prototype.ngOnInit = function () {
        this.getUsers();
    };
    AdminUsersComponent.prototype.deleteUser = function (user) {
        var _this = this;
        this.adminSvc.deleteUser(user.id)
            .then(function (data) {
            // console.log(data);
            _this.users = _this.users.filter(function (u) { return u.id != user.id; });
        }, function (error) {
            // console.log(error);
        });
    };
    /**
     * Gets all users
     */
    AdminUsersComponent.prototype.getUsers = function () {
        var _this = this;
        this.adminSvc.getUsers()
            .then(function (data) {
            // console.log(data);
            _this.users = JSON.parse(data._body);
            _this.users = _this.users.filter(function (user) {
                return user.auth0Id != JSON.parse(localStorage.getItem("auth_profile")).user_id;
            });
            // console.log(this.users);
        }, function (error) {
            // console.log(error);
        });
    };
    AdminUsersComponent = __decorate([
        core_1.Component({
            selector: "ch-admin-users",
            providers: [admin_service_1.AdminService],
            templateUrl: "app/admin/admin-users/admin-users.component.html"
        }), 
        __metadata('design:paramtypes', [admin_service_1.AdminService])
    ], AdminUsersComponent);
    return AdminUsersComponent;
}());
exports.AdminUsersComponent = AdminUsersComponent;
//# sourceMappingURL=admin-users.component.js.map