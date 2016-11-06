import { Injectable }   from "@angular/core";
import { Response }     from "@angular/http";

import "rxjs/Rx";
import { AuthHttp }     from "angular2-jwt";

import { Constants }    from "../shared/constants";

@Injectable()
export class DashboardService {
    /**
     * Base url for requests in this service
     */
    private baseUrl: string;

    /**
     * Auth0 profile
     */
    authProfile: any = JSON.parse(localStorage.getItem("auth_profile"));

    constructor (private http: AuthHttp) {
        this.baseUrl = Constants.API_BASE_URL;
    }

    /**
     * Get all categories
     */
    getCategories () {
        let url = `${this.baseUrl}/categories`;
        return this.getData(url);
    }

    /**
     * Get all chores
     */
    getChores () {
        let url = `${this.baseUrl}/chores`;
        return this.getData(url);
    }

    /**
     * Get all chores belonging to a category
     */
    getChoresByCategory (category: string) {        
        let url = `${this.baseUrl}/${category}/chores`;
        return this.getData(url);
    }

    /**
     * Get specific user
     */
    getUser (userId: number) {
        let url = `${this.baseUrl}/user/${userId}`;
        return this.getData(url);
    }

    /**
     * Perform http get request 
     */
    private getData (url: string) {
        return this.http.get(url).toPromise();
    }
}