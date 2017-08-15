import { CanActivate, Router }  from '@angular/router';
import { Injectable }           from '@angular/core';

@Injectable()
export class AuthProfileGuard implements CanActivate {
    constructor (private router: Router) { }

    /**
     * Only allow logged in users to go to the route
     */
    canActivate (): boolean {
        const profile = JSON.parse(localStorage.getItem('user_profile'));
        if (profile) {
            return true;
        } else {
            this.router.navigate(['/profile/create']);
            return false;
        }
    }
}
