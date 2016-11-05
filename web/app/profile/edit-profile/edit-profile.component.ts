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
    profile: any;

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

        this.profile = {
            IsPublic: ""
        };

        this.zone = new NgZone({ enableLongStackTrace: false }); 

        this.route.data.forEach((data: any) => data.state == "edit" ? this.state = "Bewerk" : this.state = "Maak");

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

        if(!this.profile.FirstName || typeof(this.profile.FirstName) == "undefined") {
            this.errors.firstNameError = "Vul dit veld aub in.";
        } else if (this.profile.FirstName.length > 46) {
            this.errors.firstNameError = "Dit veld kan maximaal 46 letters bevatten.";
        }

        if(!this.profile.LastName || typeof(this.profile.LastName) == "undefined") {
            this.errors.lastNameError = "Vul dit veld aub in.";
        } else if (this.profile.LastName.length > 46) {
            this.errors.lastNameErrors = "Dit veld kan maximaal 46 letters bevatten";
        }

        if(!this.profile.Description || typeof(this.profile.Description) == "undefined") {
            this.errors.descriptionError = "Vul dit veld aub in.";
        } else if (this.profile.Description.length > 500) {
            this.errors.descriptionError = "Dit veld kan maximaal 500 letters bevatten";            
        }

        if(!this.profile.IsPublic || typeof(this.profile.IsPublic) == "undefined") {
            this.errors.isPublicError = "Selecteer een optie aub.";
        }

        if(!this.hasFile) {
            this.errors.pictureError = "Selecteer een profielfoto";
        }

        if(Object.keys(this.errors).length == 0) {
            console.log("validatie geslaagd");
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
            console.log(data);
            if(data.response && JSON.parse(data.response).success) {
                let parsedResponse = JSON.parse(data.response);
                this.profile.Image = {
                    Link: parsedResponse.data.link
                };
                this.save();
            }
        });
    }

    /**
     * Save edited profile
     */
    private save () {
        this.profileSvc.saveProfile(this.profile).then((data) => {
            console.log(data);
        }, (error) => {
            console.log(error)
        });
    }

    /**
     * Fire upload event
     */
    private startUpload() {
        this.uploadEvents.emit("startUpload");
    }
}