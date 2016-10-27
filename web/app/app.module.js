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
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var angular2_jwt_1 = require("angular2-jwt");
// Import components
var app_component_1 = require("./app.component");
var home_component_1 = require("./home/home.component");
var info_component_1 = require("./info/info.component");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var profile_component_1 = require("./profile/profile.component");
// Import guard 
var auth_guard_1 = require("./shared/auth/auth.guard");
var auth_service_1 = require("./shared/auth/auth.service");
// Import services
var dashboard_service_1 = require("./dashboard/dashboard.service");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            // Imported modules
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                // Routes
                router_1.RouterModule.forRoot([
                    {
                        path: "",
                        redirectTo: "/home",
                        pathMatch: "full"
                    },
                    {
                        path: "home",
                        component: home_component_1.HomeComponent
                    },
                    {
                        path: "info",
                        component: info_component_1.InfoComponent
                    },
                    {
                        path: "hub",
                        canActivate: [auth_guard_1.AuthGuard],
                        children: [
                            {
                                path: "",
                                component: dashboard_component_1.DashboardComponent
                            }
                        ]
                    },
                    {
                        path: "profile",
                        component: profile_component_1.ProfileComponent
                    }
                ])
            ],
            // Declared view classes
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                info_component_1.InfoComponent,
                dashboard_component_1.DashboardComponent,
                profile_component_1.ProfileComponent
            ],
            // Register providers
            providers: [
                angular2_jwt_1.AUTH_PROVIDERS,
                auth_guard_1.AuthGuard,
                auth_service_1.AuthService,
                dashboard_service_1.DashboardService
            ],
            // Base component
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map