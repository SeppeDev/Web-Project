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
var router_1 = require("@angular/router");
var auth_service_1 = require("./shared/auth/auth.service");
var AppComponent = (function () {
    function AppComponent(authSvc, router) {
        var _this = this;
        this.authSvc = authSvc;
        this.router = router;
        this.topMenuActive = false;
        this.bottomMenuActive = false;
        this.hubMenuActive = false;
        router.events.forEach(function (event) {
            if (event instanceof router_1.NavigationStart) {
                _this.topMenuActive = false;
                _this.bottomMenuActive = false;
            }
        });
    }
    AppComponent.prototype.showTopMenu = function () {
        this.topMenuActive = !this.topMenuActive;
    };
    AppComponent.prototype.showBottomMenu = function () {
        this.bottomMenuActive = !this.bottomMenuActive;
    };
    AppComponent.prototype.showHubMenu = function () {
        this.hubMenuActive = !this.hubMenuActive;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "chorehub-app",
            providers: [auth_service_1.AuthService],
            templateUrl: "app/app.component.html"
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map