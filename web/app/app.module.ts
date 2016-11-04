import { NgModule }         from "@angular/core";
import { BrowserModule }    from "@angular/platform-browser";
import { FormsModule }      from "@angular/forms";
import { RouterModule }     from "@angular/router";
import { HttpModule }       from "@angular/http";
import { AUTH_PROVIDERS }   from "angular2-jwt";

// Import components
import { AppComponent }             from "./app.component";
import { HomeComponent }            from "./home/home.component";
import { InfoComponent }            from "./info/info.component";
import { UserDashboardComponent }   from "./dashboard/user-dashboard/user-dashboard.component";
import { UserDetailComponent}       from "./dashboard/user-detail/user-detail.component";
import { ChoreDashboardComponent }  from "./dashboard/chore-dashboard/chore-dashboard.component";
import { ChoreDetailComponent}      from "./dashboard/chore-detail/chore-detail.component";
import { ChoreCreateComponent }     from "./dashboard/chore-create/chore-create.component";
import { ProfileComponent }         from "./profile/profile.component";
import { EditProfileComponent }     from "./profile/edit-profile/edit-profile.component";

// Import guard 
import { AuthGuard }    from "./shared/auth/auth.guard";
import { AuthService }  from "./shared/auth/auth.service";

// Import services
import { DashboardService } from "./dashboard/dashboard.service";

@NgModule({

    // Imported modules
    imports: [ 
        BrowserModule, 
        FormsModule,
        HttpModule,

        // Routes
        RouterModule.forRoot([
            {
                path: "",
                redirectTo: "/home",
                pathMatch: "full"
            },
            {
                path: "home", 
                component: HomeComponent       
            },
            {
                path: "info",
                component: InfoComponent
            },
            {
                path: "hub",
                canActivate: [  ],
                children: [
                    {
                        path: "users",
                        children: [
                            {
                                path: "",
                                component: UserDashboardComponent
                            },
                            {
                                path: ":userName",
                                component: UserDetailComponent
                            }
                        ]
                    },
                    {
                        path: "chores",
                        children: [
                            {
                                path: "",
                                component: ChoreDashboardComponent
                            },
                            {
                                path: "create",
                                component: ChoreCreateComponent
                            },
                            {
                                path: ":choreName",
                                component: ChoreDetailComponent
                            }                            
                        ]
                    }
                ]
            },
            {
                path: "profile",
                canActivate: [  ],
                children: [
                    {
                        path: "",
                        component: ProfileComponent
                    },
                    {
                        path: "create",
                        data: {
                            state: "create"
                        },
                        component: EditProfileComponent
                    },
                    {
                        path: "edit",
                        data: {
                            state: "edit"
                        },                        
                        component: EditProfileComponent
                    }
                ]
            }
        ])
    ],

    // Declared view classes
    declarations: [ 
        AppComponent,
        HomeComponent,
        InfoComponent,
        UserDashboardComponent,
        ChoreDashboardComponent,
        ProfileComponent,
        EditProfileComponent,
        UserDetailComponent,
        ChoreDetailComponent,
        ChoreCreateComponent
    ],

    // Register providersz
    providers: [
        AUTH_PROVIDERS,
        AuthGuard,
        AuthService,
        DashboardService
    ],

    // Base component
    bootstrap: [ AppComponent ]
})
export class AppModule { }
