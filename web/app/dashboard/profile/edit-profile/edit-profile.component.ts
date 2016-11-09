import { Component, OnInit, EventEmitter, NgZone  } from "@angular/core";
import { ActivatedRoute }                           from "@angular/router";

import { ProfileService }   from "../profile.service";
import { Constants }        from "../../shared/constants";

@Component({
    selector: "ch-edit-profile",
    providers: [ ProfileService ],
    templateUrl: "app/profile/edit-profile/edit-profile.component.html"
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
        private route: ActivatedRoute   
    ) { }

    /**
     * Fires when component is loaded
     */
    ngOnInit () {    
        this.hasFile = false;

        this.zone = new NgZone({ enableLongStackTrace: false }); 

        this.route.data.forEach((data: any) => {
            if(data.state  == "edit") {
                this.state = "Bewerk";
                this.profileSvc.getProfile()
                    .then((data: any) => {
                        this.profile = JSON.parse(data._body);
                    }, (error: any) => {
                        // console.log(error);
                    })

            } else {
                this.state = "Maak";
                this.profile = {
                    isPublic: ""
                };
            }
        });

        this.ngUploadOptions = {
            url: "https://api.imgur.com/3/image",
            autoUpload: false,
            authToken: Constants.IMGUR_CLIENTID,
            authTokenPrefix: "Client-ID",
            fieldName: "image"
        };        
    }

    /**
     * Validate profile data
     */
    validate () {
        this.errors = {};

        if(!this.profile.firstName || typeof(this.profile.firstName) == "undefined") {
            this.errors.firstNameError = "Vul dit veld aub in.";
        } else if (this.profile.firstName.length > 46) {
            this.errors.firstNameError = "Dit veld kan maximaal 46 letters bevatten.";
        }

        if(!this.profile.lastName || typeof(this.profile.lastName) == "undefined") {
            this.errors.lastNameError = "Vul dit veld aub in.";
        } else if (this.profile.lastName.length > 46) {
            this.errors.lastNameErrors = "Dit veld kan maximaal 46 letters bevatten";
        }

        if(!this.profile.description || typeof(this.profile.description) == "undefined") {
            this.errors.descriptionError = "Vul dit veld aub in.";
        } else if (this.profile.description.length > 500) {
            this.errors.descriptionError = "Dit veld kan maximaal 500 letters bevatten";            
        }

        if(!this.profile.location || typeof(this.profile.location) == "undefined") {
            this.errors.locationError = "Vul dit veld aub in.";
        } else if (this.profile.location.length > 46) {
            this.errors.locationError = "Dit veld kan maximaal 46 letters bevatten";            
        }        

        if(this.profile.isPublic == null || typeof(this.profile.isPublic) == "undefined") {
            this.errors.isPublicError = "Selecteer een optie aub.";
        }

        if(!this.hasFile && this.state == "Maak") {
            this.errors.pictureError = "Selecteer een profielfoto";
        }

        if(Object.keys(this.errors).length == 0) {
            this.startUpload();
        } 
    }

    /**
     * File input change listener
     */
    fileChange (fileInput: any) {
        this.hasFile = false;

        if(fileInput.target.files.length > 0) {
            this.hasFile = true;
        }
    }

    /**
     * Handle upload event
     */
    handleUpload(data: any): void {
        this.zone.run(() => {
            if(data.response && JSON.parse(data.response).success) {
                let parsedResponse = JSON.parse(data.response);
                this.profile.image = {
                    link: parsedResponse.data.link
                };

                this.state == "Maak" ? this.saveProfile() : this.updateProfile();            
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
        this.profileSvc.saveProfile(this.profile).then((data: any) => {
            this.goBack();
            localStorage.setItem("user_profile", data._body);
        }, (error: any) => {
            // console.log(error)
        });
    }

    /**
     * Update existing user profile
     */
    private updateProfile () {
        this.profileSvc.updateProfile(this.profile).then((data: any) => {
            localStorage.removeItem("user_profile");
            localStorage.setItem("user_profile", data._body);            
            this.goBack();
            // console.log(data);
        }, (error: any) => {
            // console.log(error)
        });
    }

    /**
     * Fire upload event
     */
    private startUpload() {
        if(this.state == "Maak" || (this.hasFile && this.state == "Bewerk")) {
            this.uploadEvents.emit("startUpload");
        } else {
            this.updateProfile();
        }
    }
}