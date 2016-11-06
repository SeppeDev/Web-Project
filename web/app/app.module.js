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
var ng2_uploader_1 = require("ng2-uploader");
// Import components
var app_component_1 = require("./app.component");
var home_component_1 = require("./home/home.component");
var info_component_1 = require("./info/info.component");
var user_dashboard_component_1 = require("./dashboard/user-dashboard/user-dashboard.component");
var user_detail_component_1 = require("./dashboard/user-detail/user-detail.component");
var chore_dashboard_component_1 = require("./dashboard/chore-dashboard/chore-dashboard.component");
var chore_detail_component_1 = require("./dashboard/chore-detail/chore-detail.component");
var chore_create_component_1 = require("./dashboard/chore-create/chore-create.component");
var profile_component_1 = require("./profile/profile.component");
var profile_chores_component_1 = require("./profile/profile-chores/profile-chores.component");
var profile_chore_edit_component_1 = require("./profile/profile-chore-edit/profile-chore-edit.component");
var edit_profile_component_1 = require("./profile/edit-profile/edit-profile.component");
var admin_categories_component_1 = require("./admin/admin-categories/admin-categories.component");
var admin_users_component_1 = require("./admin/admin-users/admin-users.component");
var admin_chores_component_1 = require("./admin/admin-chores/admin-chores.component");
// Import guard 
var auth_guard_1 = require("./shared/auth/auth.guard");
// Import services
var auth_service_1 = require("./shared/auth/auth.service");
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
                        path: "admin",
                        children: [
                            {
                                path: "categories",
                                component: admin_categories_component_1.AdminCategoriesComponent
                            },
                            {
                                path: "users",
                                component: admin_users_component_1.AdminUsersComponent
                            },
                            {
                                path: "chores",
                                component: admin_chores_component_1.AdminChoresComponent
                            }
                        ]
                    },
                    {
                        path: "hub",
                        canActivate: [],
                        children: [
                            {
                                path: "users",
                                children: [
                                    {
                                        path: "",
                                        component: user_dashboard_component_1.UserDashboardComponent
                                    },
                                    {
                                        path: ":userId",
                                        component: user_detail_component_1.UserDetailComponent
                                    }
                                ]
                            },
                            {
                                path: "chores",
                                children: [
                                    {
                                        path: "",
                                        component: chore_dashboard_component_1.ChoreDashboardComponent
                                    },
                                    {
                                        path: "create",
                                        component: chore_create_component_1.ChoreCreateComponent
                                    },
                                    {
                                        path: ":choreId",
                                        component: chore_detail_component_1.ChoreDetailComponent
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        path: "profile",
                        canActivate: [],
                        children: [
                            {
                                path: "",
                                component: profile_component_1.ProfileComponent
                            },
                            {
                                path: "create",
                                data: {
                                    state: "create"
                                },
                                component: edit_profile_component_1.EditProfileComponent
                            },
                            {
                                path: "edit",
                                data: {
                                    state: "edit"
                                },
                                component: edit_profile_component_1.EditProfileComponent
                            },
                            {
                                path: "chores",
                                children: [
                                    {
                                        path: "",
                                        component: profile_chores_component_1.ProfileChoresComponent
                                    },
                                    {
                                        path: "edit/:choreId",
                                        component: profile_chore_edit_component_1.ProfileChoreEditComponent
                                    }
                                ]
                            }
                        ]
                    }
                ])
            ],
            // Declared view classes
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                info_component_1.InfoComponent,
                user_dashboard_component_1.UserDashboardComponent,
                chore_dashboard_component_1.ChoreDashboardComponent,
                profile_component_1.ProfileComponent,
                edit_profile_component_1.EditProfileComponent,
                profile_chores_component_1.ProfileChoresComponent,
                profile_chore_edit_component_1.ProfileChoreEditComponent,
                user_detail_component_1.UserDetailComponent,
                chore_detail_component_1.ChoreDetailComponent,
                chore_create_component_1.ChoreCreateComponent,
                admin_categories_component_1.AdminCategoriesComponent,
                admin_users_component_1.AdminUsersComponent,
                admin_chores_component_1.AdminChoresComponent,
                // External directives
                ng2_uploader_1.UPLOAD_DIRECTIVES
            ],
            // Register providersz
            providers: [
                angular2_jwt_1.AUTH_PROVIDERS,
                auth_guard_1.AuthGuard,
                auth_service_1.AuthService
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