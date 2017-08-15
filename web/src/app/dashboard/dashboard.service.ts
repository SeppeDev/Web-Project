import { Injectable }           from '@angular/core';
import { Response, Headers }    from '@angular/http';

import 'rxjs/Rx';
import { AuthHttp }     from 'angular2-jwt';

import { Constants }    from '../shared/constants';

@Injectable()
export class DashboardService {
    /**
     * Base url for requests in this service
     */
    private baseUrl: string;

    /**
     * Custom headers
     */
    private headers: Headers = new Headers({'Content-Type': 'application/json'});

    /**
     * Auth0 profile
     */
    authProfile: any = JSON.parse(localStorage.getItem('auth_profile'));

    constructor (private http: AuthHttp) {
        this.baseUrl = Constants.API_BASE_URL;
    }

    /**
     * Get all categories
     */
    getCategories () {
        const url = `${this.baseUrl}/categories`;
        return this.getData(url);
    }

    /**
     * Get all chores
     */
    getChores () {
        const url = `${this.baseUrl}/chores`;
        return this.getData(url);
    }

    /**
     * Get a chore
     */
    getChore (choreId: number) {
        const url = `${this.baseUrl}/chores/${choreId}`;
        return this.getData(url);
    }

    /**
     * Get all chores belonging to a category
     */
    getChoresByCategory (category: string) {
        const url = `${this.baseUrl}/${category}/chores`;
        return this.getData(url);
    }

    /**
     * Get specific user
     */
    getUser (userId: number) {
        const url = `${this.baseUrl}/users/id/${userId}`;
        return this.getData(url);
    }

    /**
     * Get all users
     */
    getUsers () {
        const url = `${this.baseUrl}/users`;
        return this.getData(url);
    }

    /**
     * Create new chore
     */
    saveChore (chore: any) {
        chore.user = JSON.parse(localStorage.getItem('user_profile'));
        const url = `${this.baseUrl}/chores`;
        return this.http.post(url, JSON.stringify(chore), { headers: this.headers }).toPromise();
    }

    /**
     * Perform http get request
     */
    private getData (url: string) {
        return this.http.get(url).toPromise();
    }
}
