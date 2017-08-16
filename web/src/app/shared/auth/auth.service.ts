import { Injectable }       from '@angular/core';
import { Router }           from '@angular/router';
import {    tokenNotExpired,
			AuthHttp }      from 'angular2-jwt';
import * as auth0 			from 'auth0-js';
import 'rxjs/Rx';

import { Constants }        from '../constants';

@Injectable()
export class AuthService {
	/**
	 * Base url for request in this service.
	 */
	private baseUrl = `${Constants.API_BASE_URL}/users`;

	/**
	 * The auth0 profile of the user.
	 */
	authProfile: any = {};

	/**
	 * Is the current logged in user an admin.
	 */
	isAdmin = false;

	/**
	 * Auth0 instance.
	 */
	auth0 = new auth0.WebAuth({
		clientID: 'CspFnfCiZtsSKP89ej6v85rNAquCwBdP',
		domain: 'chorehub.eu.auth0.com',
		responseType: 'token id_token',
		audience: 'https://chorehub.eu.auth0.com/userinfo',
		redirectUri: 'http://localhost:4200/callback',
		scope: 'openid profile'
	});

	constructor(
		public router: Router,
		public http: AuthHttp
	) { }

	/**
	 * Checks for logged in user.
	 */
	public handleAuthentication (): void {
		this.auth0.parseHash((err, authResult) => {
			if (authResult && authResult.accessToken && authResult.idToken) {
				window.location.hash = '';
				this.setSession(authResult);
				this.getAuthProfile(authResult.accessToken);
				this.router.navigate(['/home']);
			} else if (err) {
				this.router.navigate(['/home']);
				console.log(err);
			}
		});
	}

	/**
	 * Sets the session after authentication.
	 */
	private setSession (authResult): void {
		// Set the time that the access token will expire at
		const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
		localStorage.setItem('access_token', authResult.accessToken);
		localStorage.setItem('id_token', authResult.idToken);
		localStorage.setItem('expires_at', expiresAt);
	}

	/**
	 * Go to the login page.
	 */
	public login (): void {
		this.auth0.authorize();
	}

	/**
	 * Destroy the current session.
	 */
	public logout (): void {
		// Remove tokens and expiry time from localStorage
		localStorage.removeItem('access_token');
		localStorage.removeItem('id_token');
		localStorage.removeItem('expires_at');
		localStorage.removeItem('auth_profile');
		// Go back to the home route
		this.router.navigate(['/']);
	}

	/**
	 * Checks if there is an authenticated user.
	 */
	public authenticated (): boolean {
		// Check whether the current time is past the
		// access token's expiry time
		const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
		return new Date().getTime() < expiresAt;
	}

    /**
     * Decrypt jwt token to access user profile
     */
    private getAuthProfile (accessToken: string): void {
		this.auth0.client.userInfo(accessToken, (err, profile) => {
			if (profile) {
				this.authProfile = profile;
				this.authProfile.user_id = profile.sub;
				localStorage.setItem('auth_profile', JSON.stringify(profile));
				this.getUserProfile(this.authProfile.user_id);
			}
		});
    }

    /**
     * Get user profile
     */
    private getUserProfile (userId): void {
        const url = `${this.baseUrl}/userid/${this.authProfile.user_id}`;

        this.http.get(url).toPromise()
            .then((data: any) => {
                localStorage.setItem('user_profile', data._body);
                this.isAdmin = JSON.parse(data._body).isAdmin;
                console.log(data);
            }, (error: any) => {
				this.router.navigate(['/profile/create']);
				console.log(error);
            });
    }
}
