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
var angular2_jwt_1 = require("angular2-jwt");
var constants_1 = require("../shared/constants");
var AuthService = (function () {
    function AuthService() {
        var _this = this;
        // Create auth0 lock instance
        this.lock = new Auth0Lock(constants_1.Constants.AUTH0_CLIENTID, constants_1.Constants.AUTH0_DOMAIN, {});
        // Check for existence of token in localStorage
        if (this.authenticated)
            this.userProfile = JSON.parse(localStorage.getItem("user_profile"));
        // Listen to auth0 authenticated event and set token & user profile
        this.lock.on("authenticated", function (authResult) {
            localStorage.setItem("id_token", authResult.idToken);
            _this.getProfile(authResult.idToken);
        });
    }
    /**
     * Show auth0 lock - login screen
     */
    AuthService.prototype.showLogin = function () {
        this.lock.show();
    };
    /**
     * Show auth0 lock - register screen
     */
    AuthService.prototype.showRegister = function () {
        this.lock.show({
            initialScreen: "signUp"
        });
    };
    /**
     * Check if jwt token is expired
     */
    AuthService.prototype.authenticated = function () {
        return angular2_jwt_1.tokenNotExpired();
    };
    /**
     * Destroy jwt token to end session
     */
    AuthService.prototype.logout = function () {
        localStorage.removeItem("id_token");
        localStorage.removeItem("user_profile");
        this.userProfile = undefined;
    };
    /**
     * Decrypt jwt token to access user profile
     */
    AuthService.prototype.getProfile = function (idToken) {
        var _this = this;
        this.lock.getProfile(idToken, function (error, profile) {
            if (error) {
                console.log(error);
                return;
            }
            _this.userProfile = profile;
            localStorage.setItem("user_profile", JSON.stringify(profile));
        });
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map