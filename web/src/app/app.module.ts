import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule }          from '@angular/forms';
import { RouterModule }         from '@angular/router';
import { HttpModule }           from '@angular/http';
import { Ng2UploaderModule }    from 'ng2-uploader';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

// Import components
import { AppComponent }                 from './app.component';
import { HomeComponent }                from './home/home.component';
import { InfoComponent }                from './info/info.component';
import { UserDashboardComponent }       from './dashboard/user-dashboard/user-dashboard.component';
import { UserDetailComponent}           from './dashboard/user-detail/user-detail.component';
import { ChoreDashboardComponent }      from './dashboard/chore-dashboard/chore-dashboard.component';
import { ChoreDetailComponent}          from './dashboard/chore-detail/chore-detail.component';
import { ChoreCreateComponent }         from './dashboard/chore-create/chore-create.component';
import { ProfileComponent }             from './profile/profile.component';
import { ProfileChoresComponent }       from './profile/profile-chores/profile-chores.component';
import { ProfileChoreEditComponent }    from './profile/profile-chore-edit/profile-chore-edit.component';
import { EditProfileComponent }         from './profile/edit-profile/edit-profile.component';
import { AdminCategoriesComponent }     from './admin/admin-categories/admin-categories.component';
import { AdminUsersComponent }          from './admin/admin-users/admin-users.component';
import { AdminChoresComponent }         from './admin/admin-chores/admin-chores.component';

// Import guard
import { AuthGuard }        from './shared/auth/auth.guard';
import { AuthProfileGuard } from './shared/auth/auth-profile.guard';
import { AuthAdminGuard }   from './shared/auth/auth-admin.guard';

// Import services
import { AuthService }  from './shared/auth/auth.service';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('id_token')),
  }), http, options);
}

@NgModule({

    // Imported modules
    imports: [
        BrowserModule,
        FormsModule,
		HttpModule,
		Ng2UploaderModule,

        // Routes
        RouterModule.forRoot([
            {
                path: '',
                redirectTo: '/home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'info',
                component: InfoComponent
            },
            {
                path: 'admin',
                canActivate: [ AuthGuard, AuthAdminGuard ],
                children: [
                    {
                        path: 'categories',
                        component: AdminCategoriesComponent
                    },
                    {
                        path: 'users',
                        component: AdminUsersComponent
                    },
                    {
                        path: 'chores',
                        component: AdminChoresComponent
                    }
                ]
            },
            {
                path: 'hub',
                canActivate: [ AuthGuard ],
                children: [
                    {
                        path: 'users',
                        children: [
                            {
                                path: '',
                                component: UserDashboardComponent
                            },
                            {
                                path: ':userId',
                                component: UserDetailComponent
                            }
                        ]
                    },
                    {
                        path: 'chores',
                        children: [
                            {
                                path: '',
                                component: ChoreDashboardComponent
                            },
                            {
                                path: 'create',
                                canActivate: [ AuthProfileGuard ],
                                component: ChoreCreateComponent
                            },
                            {
                                path: ':choreId',
                                component: ChoreDetailComponent
                            }
                        ]
                    }
                ]
            },
            {
                path: 'profile',
                children: [
                    {
                        path: '',
                        canActivate: [ AuthGuard, AuthProfileGuard ],
                        component: ProfileComponent
                    },
                    {
                        path: 'create',
                        data: {
                            state: 'create'
                        },
                        component: EditProfileComponent
                    },
                    {
                        path: 'edit',
                        canActivate: [ AuthGuard, AuthProfileGuard ],
                        data: {
                            state: 'edit'
                        },
                        component: EditProfileComponent
                    },
                    {
                        path: 'chores',
                        canActivate: [ AuthGuard, AuthProfileGuard ],
                        children: [
                            {
                                path: '',
                                component: ProfileChoresComponent
                            },
                            {
                                path: 'edit/:choreId',
                                component: ProfileChoreEditComponent
                            }
                        ]
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
        ProfileChoresComponent,
        ProfileChoreEditComponent,
        UserDetailComponent,
        ChoreDetailComponent,
        ChoreCreateComponent,
        AdminCategoriesComponent,
        AdminUsersComponent,
        AdminChoresComponent,

        // External directives
        // Ng2UploaderModule
    ],

    // Register providers
    providers: [
        AuthGuard,
        AuthProfileGuard,
        AuthAdminGuard,
        AuthService,
		{
			provide: AuthHttp,
			useFactory: authHttpServiceFactory,
			deps: [ Http, RequestOptions ]
		}
    ],

    // Base component
    bootstrap: [ AppComponent ]
})
export class AppModule { }
