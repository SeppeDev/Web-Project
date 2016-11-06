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
var http_1 = require("@angular/http");
require("rxjs/Rx");
var angular2_jwt_1 = require("angular2-jwt");
var constants_1 = require("../shared/constants");
var DashboardService = (function () {
    function DashboardService(http) {
        this.http = http;
        /**
         * Custom headers
         */
        this.headers = new http_1.Headers({ "Content-Type": "application/json" });
        /**
         * Auth0 profile
         */
        this.authProfile = JSON.parse(localStorage.getItem("auth_profile"));
        this.baseUrl = constants_1.Constants.API_BASE_URL;
    }
    /**
     * Get all categories
     */
    DashboardService.prototype.getCategories = function () {
        var url = this.baseUrl + "/categories";
        return this.getData(url);
    };
    /**
     * Get all chores
     */
    DashboardService.prototype.getChores = function () {
        var url = this.baseUrl + "/chores";
        return this.getData(url);
    };
    /**
     * Get all chores belonging to a category
     */
    DashboardService.prototype.getChoresByCategory = function (category) {
        var url = this.baseUrl + "/" + category + "/chores";
        return this.getData(url);
    };
    /**
     * Get specific user
     */
    DashboardService.prototype.getUser = function (userId) {
        var url = this.baseUrl + "/users/id/" + userId;
        return this.getData(url);
    };
    /**
     * Get all users
     */
    DashboardService.prototype.getUsers = function () {
        var url = this.baseUrl + "/users";
        return this.getData(url);
    };
    /**
     * Create new chore
     */
    DashboardService.prototype.saveChore = function (chore) {
        chore.user = JSON.parse(localStorage.getItem("user_profile"));
        var url = this.baseUrl + "/chores";
        return this.http.post(url, JSON.stringify(chore), { headers: this.headers }).toPromise();
    };
    /**
     * Perform http get request
     */
    DashboardService.prototype.getData = function (url) {
        return this.http.get(url).toPromise();
    };
    DashboardService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angular2_jwt_1.AuthHttp])
    ], DashboardService);
    return DashboardService;
}());
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map