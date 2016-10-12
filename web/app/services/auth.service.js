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
        this.lock = new Auth0Lock(constants_1.Constants.AUTH0_CLIENTID, constants_1.Constants.AUTH0_DOMAIN, {});
        this.lock.on("authenticated", function (authResult) {
            localStorage.setItem("id_token", authResult.idToken);
            _this.getProfile(authResult.idToken);
        });
    }
    AuthService.prototype.showLogin = function () {
        this.lock.show();
    };
    AuthService.prototype.showRegister = function () {
        this.lock.show({
            initialScreen: "signUp"
        });
    };
    AuthService.prototype.authenticated = function () {
        return angular2_jwt_1.tokenNotExpired();
    };
    AuthService.prototype.logout = function () {
        localStorage.removeItem("id_token");
        localStorage.removeItem("user_profile");
        this.userProfile = undefined;
    };
    AuthService.prototype.getProfile = function (idToken) {
        var _this = this;
        this.lock.getProfile(idToken, function (error, profile) {
            if (error) {
                console.log(error);
                return;
            }
            localStorage.setItem("user_profile", JSON.stringify(profile));
            _this.userProfile = profile;
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