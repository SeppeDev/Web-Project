import { NgModule }         from "@angular/core";
import { BrowserModule }    from "@angular/platform-browser";
import { FormsModule }      from "@angular/forms";
import { RouterModule }     from "@angular/router";
import { AUTH_PROVIDERS }   from "angular2-jwt";

// Import components
import { AppComponent }     from "./app.component";
import { HomeComponent }    from "./home/home.component";
import { InfoComponent }    from "./info/info.component";

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
            }
        ])
    ],

    // Declared view classes
    declarations: [ 
        AppComponent,
        HomeComponent,
        InfoComponent
    ],

    // Register providers
    providers: [
        AUTH_PROVIDERS
    ],

    // Base component
    bootstrap: [ AppComponent ]
})
export class AppModule { }
