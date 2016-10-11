import { NgModule }         from "@angular/core";
import { BrowserModule }    from "@angular/platform-browser";
import { FormsModule }      from "@angular/forms";
import { HttpModule }       from "@angular/http";
import { RouterModule }     from "@angular/router";

// Import components
import { AppComponent }     from "./app.component";
import { HomeComponent }    from "./home/home.component";

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
                component: HomeComponent       
            }
        ])
    ],

    // Declared view classes
    declarations: [ 
        AppComponent,
        HomeComponent
    ],
    
    // Base component
    bootstrap: [ AppComponent ]
})
export class AppModule { }
