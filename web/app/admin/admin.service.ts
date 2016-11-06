import { Injectable }   from "@angular/core";
import { Headers }      from "@angular/http";

import "rxjs/Rx";
import { AuthHttp } from "angular2-jwt";

import { Constants} from "../shared/constants";

@Injectable()
export class AdminService {
    /**
     * Base url for http requests
     */
    private baseUrl: string = Constants.API_BASE_URL;

    /**
     * Custom headers
     */
    private headers: Headers = new Headers({"Content-Type": "application/json"});

    constructor (private http: AuthHttp) { }

    /**
     * Get categories
     */
    getCategories () {
        let url = `${this.baseUrl}/categories`;
        return this.http.get(url).toPromise();
    }

    /**
     * Create new category
     */
    saveCategory (category: string) {
        let url = `${this.baseUrl}/categories`;
        return this.http.post(url, JSON.stringify({ name: category}), { headers: this.headers }).toPromise();
    }

    /**
     * Delete a category
     */
    deleteCategory (id: number) {
        let url = `${this.baseUrl}/categories/${id}`;
        return this.http.delete(url).toPromise();
    }

    /**
     * Get users
     */
    getUsers () {
        let url = `${this.baseUrl}/users/admin`;
        return this.http.get(url).toPromise();
    }

    /**
     * Get chores
     */
    getChores () {
        let url = `${this.baseUrl}/chores`;
        return this.http.get(url).toPromise();
    }
}