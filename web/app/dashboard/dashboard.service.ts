import { AuthHttp }     from "angular2-jwt";
import { Injectable }   from "@angular/core";
import { Response }     from "@angular/http";

import { Constants }    from "../shared/constants";

@Injectable()
export class DashboardService {
    private baseUrl: string;

    constructor (private http: AuthHttp) {
        this.baseUrl = Constants.API_BASE_URL;
    }

    getCategories () {
        let url = `${this.baseUrl}/values`;
        return this.getData(url);
    }

    getChores () {
        let url = `${this.baseUrl}/chores`;
        return this.getData(url);
    }

    getChoresByCategory (category: string) {        
        let url = `${this.baseUrl}/${category}/chores`;
        return this.getData(url);
    }

    private getData (url: string) {
        return this.http.get(url)
                    .flatMap(this.extractData);
    }

    private extractData (res: Response) {
        return res.json() || {}; 
    }
}