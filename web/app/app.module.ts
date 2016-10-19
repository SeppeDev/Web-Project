import { NgModule }         from "@angular/core";
import { BrowserModule }    from "@angular/platform-browser";
import { FormsModule }      from "@angular/forms";
import { RouterModule }     from "@angular/router";
import { AUTH_PROVIDERS }   from "angular2-jwt";

// Import components
import { AppComponent }         from "./app.component";
import { HomeComponent }        from "./home/home.component";
import { InfoComponent }        from "./info/info.component";
import { DashboardComponent }   from "./dashboard/dashboard.component";

// Import guard 
import { AuthGuard }    from "./shared/auth/auth.guard";
import { AuthService }  from "./shared/auth/auth.service";

@NgModule({

    // Imported modules
    imports: [ 
        BrowserModule, 
        FormsModule,

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
                canActivate: [ AuthGuard ],
                children: [
                    {
                        path: "",
                        component: DashboardComponent
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
        DashboardComponent
    ],

    // Register providers
    providers: [
        AUTH_PROVIDERS,
        AuthGuard,
        AuthService
    ],

    // Base component
    bootstrap: [ AppComponent ]
})
export class AppModule { }
