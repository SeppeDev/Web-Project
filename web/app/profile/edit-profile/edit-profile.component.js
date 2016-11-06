"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var profile_service_1 = require("../profile.service");
var constants_1 = require("../../shared/constants");
var EditProfileComponent = (function () {
    function EditProfileComponent(profileSvc, route) {
        this.profileSvc = profileSvc;
        this.route = route;
        /**
         * List of validation errors
         */
        this.errors = {};
        /**
         * Event emitter for uploads
         */
        this.uploadEvents = new core_1.EventEmitter();
    }
    /**
     * Fires when component is loaded
     */
    EditProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.hasFile = false;
        this.zone = new core_1.NgZone({ enableLongStackTrace: false });
        this.route.data.forEach(function (data) {
            if (data.state == "edit") {
                _this.state = "Bewerk";
                _this.profile = JSON.parse(localStorage.getItem("user_profile"));
            }
            else {
                _this.state = "Maak";
                _this.profile = {
                    isPublic: ""
                };
            }
        });
        this.ngUploadOptions = {
            url: "https://api.imgur.com/3/image",
            autoUpload: false,
            authToken: constants_1.Constants.IMGUR_CLIENTID,
            authTokenPrefix: "Client-ID",
            fieldName: "image"
        };
    };
    /**
     * Validate profile data
     */
    EditProfileComponent.prototype.validate = function () {
        this.errors = {};
        if (!this.profile.firstName || typeof (this.profile.firstName) == "undefined") {
            this.errors.firstNameError = "Vul dit veld aub in.";
        }
        else if (this.profile.firstName.length > 46) {
            this.errors.firstNameError = "Dit veld kan maximaal 46 letters bevatten.";
        }
        if (!this.profile.lastName || typeof (this.profile.lastName) == "undefined") {
            this.errors.lastNameError = "Vul dit veld aub in.";
        }
        else if (this.profile.lastName.length > 46) {
            this.errors.lastNameErrors = "Dit veld kan maximaal 46 letters bevatten";
        }
        if (!this.profile.description || typeof (this.profile.description) == "undefined") {
            this.errors.descriptionError = "Vul dit veld aub in.";
        }
        else if (this.profile.description.length > 500) {
            this.errors.descriptionError = "Dit veld kan maximaal 500 letters bevatten";
        }
        if (this.profile.isPublic == null || typeof (this.profile.isPublic) == "undefined") {
            this.errors.isPublicError = "Selecteer een optie aub.";
        }
        if (!this.hasFile && this.state == "Maak") {
            this.errors.pictureError = "Selecteer een profielfoto";
        }
        if (Object.keys(this.errors).length == 0) {
            this.startUpload();
        }
    };
    /**
     * File input change listener
     */
    EditProfileComponent.prototype.fileChange = function (fileInput) {
        this.hasFile = false;
        if (fileInput.target.files.length > 0) {
            this.hasFile = true;
        }
    };
    /**
     * Handle upload event
     */
    EditProfileComponent.prototype.handleUpload = function (data) {
        var _this = this;
        this.zone.run(function () {
            if (data.response && JSON.parse(data.response).success) {
                var parsedResponse = JSON.parse(data.response);
                _this.profile.image = {
                    link: parsedResponse.data.link
                };
                _this.state == "Maak" ? _this.save() : _this.update();
            }
        });
    };
    /**
     * Return to previous state
     */
    EditProfileComponent.prototype.goBack = function () {
        window.history.back();
    };
    /**
     * Save edited profile
     */
    EditProfileComponent.prototype.saveProfile = function () {
        this.profileSvc.saveProfile(this.profile).then(function (data) {
            // this.goBack();
            console.log(data);
        }, function (error) {
            console.log(error);
        });
    };
    /**
     * Update existing user profile
     */
    EditProfileComponent.prototype.updateProfile = function () {
        this.profileSvc.updateProfile(this.profile).then(function (data) {
            // localStorage.removeItem("user_profile");            
            // this.goBack();
            console.log(data);
        }, function (error) {
            console.log(error);
        });
    };
    /**
     * Fire upload event
     */
    EditProfileComponent.prototype.startUpload = function () {
        if (this.state == "Maak" || (this.hasFile && this.state == "Bewerk")) {
            this.uploadEvents.emit("startUpload");
        }
        else {
            this.update();
        }
    };
    EditProfileComponent.prototype.storeProfile = function (profile) {
        console.log(profile);
        // localStorage.setItem("user_profile", profile);
    };
    EditProfileComponent = __decorate([
        core_1.Component({
            selector: "ch-edit-profile",
            providers: [profile_service_1.ProfileService],
            templateUrl: "app/profile/edit-profile/edit-profile.component.html"
        }), 
        __metadata('design:paramtypes', [profile_service_1.ProfileService, router_1.ActivatedRoute])
    ], EditProfileComponent);
    return EditProfileComponent;
}());
exports.EditProfileComponent = EditProfileComponent;
//# sourceMappingURL=edit-profile.component.js.map