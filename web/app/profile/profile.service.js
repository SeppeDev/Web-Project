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
var ProfileService = (function () {
    function ProfileService(http) {
        this.http = http;
        /**
         * Base url for service http calls.
         */
        this.baseUrl = constants_1.Constants.API_BASE_URL + "/users";
        /**
         * Auth0 profile
         */
        this.authProfile = JSON.parse(localStorage.getItem("auth_profile"));
        /**
         * Custom headers
         */
        this.headers = new http_1.Headers({ "Content-Type": "application/json" });
    }
    /**
     * Get user profile
     */
    ProfileService.prototype.getProfile = function (userId) {
        var url = this.baseUrl + "/" + userId;
        return this.http.get(url).toPromise();
    };
    /**
     * Get user chores
     */
    ProfileService.prototype.getUserChores = function () {
        var url = this.baseUrl + "/chores/";
        return this.http.get(url).toPromise();
    };
    /**
     * Get user chore by id
     */
    ProfileService.prototype.getChoreById = function (id) {
        var url = this.baseUrl + "/chores/" + id;
        return this.http.get(url).toPromise();
    };
    /**
     * Save user profile
     */
    ProfileService.prototype.saveProfile = function (profile) {
        profile.auth0Id = this.authProfile.user_id;
        profile.email = this.authProfile.email;
        var url = "" + this.baseUrl;
        return this.http.post(url, JSON.stringify(profile), { headers: this.headers }).toPromise();
    };
    /**
     * Update user profile
     */
    ProfileService.prototype.updateProfile = function (profile) {
        var url = this.baseUrl + "/" + profile.id;
        return this.http.put(url, JSON.stringify(profile), { headers: this.headers }).toPromise();
    };
    ProfileService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angular2_jwt_1.AuthHttp])
    ], ProfileService);
    return ProfileService;
}());
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map