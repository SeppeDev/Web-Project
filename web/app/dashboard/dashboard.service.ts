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
        return this.http.get(this.baseUrl + "values")
                    .flatMap(this.extractData);
    }

    private extractData (res: Response) {
        return res.json() || {}; 
    }
}