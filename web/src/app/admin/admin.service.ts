import { Injectable }   from '@angular/core';
import { Headers }      from '@angular/http';

import 'rxjs/Rx';
import { AuthHttp } from 'angular2-jwt';

import { Constants} from '../shared/constants';

@Injectable()
export class AdminService {
    /**
     * Base url for http requests
     */
    private baseUrl: string = Constants.API_BASE_URL;

    /**
     * Custom headers
     */
    private headers: Headers = new Headers({'Content-Type': 'application/json'});

    constructor (private http: AuthHttp) { }

    /**
     * Get categories
     */
    getCategories () {
        const url = `${this.baseUrl}/categories`;
        return this.http.get(url).toPromise();
    }

    /**
     * Create new category
     */
    saveCategory (category: string) {
        const url = `${this.baseUrl}/categories`;
        return this.http.post(url, JSON.stringify({ name: category}), { headers: this.headers }).toPromise();
    }

    /**
     * Delete a category
     */
    deleteCategory (id: number) {
        const url = `${this.baseUrl}/categories/${id}`;
        return this.http.delete(url).toPromise();
    }

    /**
     * Get users
     */
    getUsers () {
        const url = `${this.baseUrl}/users/admin`;
        return this.http.get(url).toPromise();
    }

    /**
     * Delete a user
     */
    deleteUser (userId: number) {
        const url = `${this.baseUrl}/users/${userId}`;
        return this.http.delete(url).toPromise();
    }

    /**
     * Get chores
     */
    getChores () {
        const url = `${this.baseUrl}/chores`;
        return this.http.get(url).toPromise();
    }

    /**
     * Delete a chore
     */
    deleteChore (choreId: number) {
        const url = `${this.baseUrl}/chores/${choreId}`;
        return this.http.delete(url).toPromise();
    }
}
