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
var AdminChoresComponent = (function () {
    function AdminChoresComponent(adminSvc) {
        this.adminSvc = adminSvc;
        /**
         * All chores
         */
        this.chores = [];
    }
    /**
     * Fires when component is loaded
     */
    AdminChoresComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.adminSvc.getChores()
            .then(function (data) {
            _this.chores = JSON.parse(data._body);
            console.log(data);
        }, function (error) {
            console.log(error);
        });
    };
    /**
     * Deletes a chore
     */
    AdminChoresComponent.prototype.deleteChore = function (choreId) {
        this.adminSvc.deleteChore(choreId)
            .then(function (data) {
            console.log(data);
        }, function (error) {
            console.log(error);
        });
    };
    AdminChoresComponent = __decorate([
        core_1.Component({
            selector: "ch-admin-chores",
            providers: [admin_service_1.AdminService],
            templateUrl: "app/admin/admin-chores/admin-chores.component.html"
        }), 
        __metadata('design:paramtypes', [admin_service_1.AdminService])
    ], AdminChoresComponent);
    return AdminChoresComponent;
}());
exports.AdminChoresComponent = AdminChoresComponent;
//# sourceMappingURL=admin-chores.component.js.map