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
var AdminService = (function () {
    function AdminService(http) {
        this.http = http;
        /**
         * Base url for http requests
         */
        this.baseUrl = constants_1.Constants.API_BASE_URL;
        /**
         * Custom headers
         */
        this.headers = new http_1.Headers({ "Content-Type": "application/json" });
    }
    /**
     * Get categories
     */
    AdminService.prototype.getCategories = function () {
        var url = this.baseUrl + "/categories";
        return this.http.get(url).toPromise();
    };
    /**
     * Create new category
     */
    AdminService.prototype.saveCategory = function (category) {
        var url = this.baseUrl + "/categories";
        return this.http.post(url, JSON.stringify({ name: category }), { headers: this.headers }).toPromise();
    };
    /**
     * Delete a category
     */
    AdminService.prototype.deleteCategory = function (id) {
        var url = this.baseUrl + "/categories/" + id;
        return this.http.delete(url).toPromise();
    };
    /**
     * Get users
     */
    AdminService.prototype.getUsers = function () {
        var url = this.baseUrl + "/users/admin";
        return this.http.get(url).toPromise();
    };
    /**
     * Delete a user
     */
    AdminService.prototype.deleteUser = function (userId) {
        var url = this.baseUrl + "/users/" + userId;
        return this.http.delete(url).toPromise();
    };
    /**
     * Get chores
     */
    AdminService.prototype.getChores = function () {
        var url = this.baseUrl + "/chores";
        return this.http.get(url).toPromise();
    };
    AdminService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angular2_jwt_1.AuthHttp])
    ], AdminService);
    return AdminService;
}());
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map