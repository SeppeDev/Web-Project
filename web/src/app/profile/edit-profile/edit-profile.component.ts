import { Component, OnInit, EventEmitter, NgZone  } from '@angular/core';
import { ActivatedRoute, Router }                   from '@angular/router';

import { ProfileService }   from '../profile.service';
import { Constants }        from '../../shared/constants';

@Component({
    selector: 'ch-edit-profile',
    providers: [ ProfileService ],
    templateUrl: 'edit-profile.component.html'
})
export class EditProfileComponent implements OnInit {
    /**
     * State of component
     */
    state: String;

    /**
     * List of validation errors
     */
    errors: any = {};

    /**
     * User profile
     */
    profile: any = {};

    /**
     * Has the user selected a profile picture?
     */
    hasFile: boolean;

    /**
     * n2-uploader options
     */
    ngUploadOptions: Object;

    /**
     * Event emitter for uploads
     */
    private uploadEvents: EventEmitter<any> = new EventEmitter();
    private zone: NgZone;

    constructor (
        private profileSvc: ProfileService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    /**
     * Fires when component is loaded
     */
    ngOnInit () {
        this.hasFile = false;

        this.zone = new NgZone({ enableLongStackTrace: false });

        this.route.data.forEach((data: any) => {
            if (data.state === 'edit') {
                this.state = 'Bewerk';
                this.profileSvc.getProfile()
                    .then((response: any) => {
                        this.profile = JSON.parse(response._body);
                    }, (error: any) => {
                        console.log(error);
                    });

            } else {
                this.state = 'Maak';
                this.profile = {
                    isPublic: ''
                };
            }
        });

        this.ngUploadOptions = {
            url: 'https://api.imgur.com/3/image',
            authToken: Constants.IMGUR_CLIENTID,
            authTokenPrefix: 'Client-ID',
            fieldName: 'image'
        };
    }

    /**
     * Validate profile data
     */
    validate () {
        this.errors = {};

        if (!this.profile.firstName || typeof(this.profile.firstName) === 'undefined') {
            this.errors.firstNameError = 'Vul dit veld aub in.';
        } else if (this.profile.firstName.length > 46) {
            this.errors.firstNameError = 'Dit veld kan maximaal 46 letters bevatten.';
        }

        if (!this.profile.lastName || typeof(this.profile.lastName) === 'undefined') {
            this.errors.lastNameError = 'Vul dit veld aub in.';
        } else if (this.profile.lastName.length > 46) {
            this.errors.lastNameErrors = 'Dit veld kan maximaal 46 letters bevatten';
        }

        if (!this.profile.description || typeof(this.profile.description) === 'undefined') {
            this.errors.descriptionError = 'Vul dit veld aub in.';
        } else if (this.profile.description.length > 500) {
            this.errors.descriptionError = 'Dit veld kan maximaal 500 letters bevatten';
        }

        if (!this.profile.location || typeof(this.profile.location) === 'undefined') {
            this.errors.locationError = 'Vul dit veld aub in.';
        } else if (this.profile.location.length > 46) {
            this.errors.locationError = 'Dit veld kan maximaal 46 letters bevatten';
        }

        if (this.profile.isPublic === null || typeof(this.profile.isPublic) === 'undefined' || this.profile.isPublic === '') {
            this.errors.isPublicError = 'Selecteer een optie aub.';
        }

        console.log(this.errors);
        console.log(this.profile);

        if (Object.keys(this.errors).length === 0) {
            this.state === 'Maak' ? this.saveProfile() : this.updateProfile();
        }
    }

    /**
     * Checks if there are any errors
     */
    hasErrors() {
        return Object.keys(this.errors).length > 0;
    }

    /**
     * Handle upload event
     */
    handleUpload(data: any): void {
        this.zone.run(() => {
            if (data.response && JSON.parse(data.response).success) {
				const parsedResponse = JSON.parse(data.response);
				this.hasFile = true;
                this.profile.image = {
                    link: parsedResponse.data.link
				};
				console.log('image uploaded');
            }
        });
    }

    /**
     * Return to previous state
     */
    goBack () {
        window.history.back();
    }

    /**
     * Save edited profile
     */
    private saveProfile () {
		console.log('saving profile');
        this.profileSvc.saveProfile(this.profile).then((data: any) => {
			console.log(data);
            localStorage.setItem('is_first_time', 'true');
            localStorage.setItem('user_profile', data._body);
            this.router.navigate(['/instructions']);
        }, (error: any) => {
            console.log(error);
        });
    }

    /**
     * Update existing user profile
     */
    private updateProfile () {
		console.log('updating profile');
        this.profileSvc.updateProfile(this.profile).then((data: any) => {
			console.log(data);
            localStorage.removeItem('user_profile');
            localStorage.setItem('user_profile', data._body);
            this.goBack();
        }, (error: any) => {
            console.log(error);
        });
    }
}
