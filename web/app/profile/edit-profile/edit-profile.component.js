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
        this.profile = {
            IsPublic: ""
        };
        this.zone = new core_1.NgZone({ enableLongStackTrace: false });
        this.route.data.forEach(function (data) { return data.state == "edit" ? _this.state = "Bewerk" : _this.state = "Maak"; });
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
        if (!this.profile.FirstName || typeof (this.profile.FirstName) == "undefined") {
            this.errors.firstNameError = "Vul dit veld aub in.";
        }
        else if (this.profile.FirstName.length > 46) {
            this.errors.firstNameError = "Dit veld kan maximaal 46 letters bevatten.";
        }
        if (!this.profile.LastName || typeof (this.profile.LastName) == "undefined") {
            this.errors.lastNameError = "Vul dit veld aub in.";
        }
        else if (this.profile.LastName.length > 46) {
            this.errors.lastNameErrors = "Dit veld kan maximaal 46 letters bevatten";
        }
        if (!this.profile.Description || typeof (this.profile.Description) == "undefined") {
            this.errors.descriptionError = "Vul dit veld aub in.";
        }
        else if (this.profile.Description.length > 500) {
            this.errors.descriptionError = "Dit veld kan maximaal 500 letters bevatten";
        }
        if (!this.profile.IsPublic || typeof (this.profile.IsPublic) == "undefined") {
            this.errors.isPublicError = "Selecteer een optie aub.";
        }
        if (!this.hasFile) {
            this.errors.pictureError = "Selecteer een profielfoto";
        }
        if (Object.keys(this.errors).length == 0) {
            console.log("validatie geslaagd");
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
            console.log(data);
            if (data.response && JSON.parse(data.response).success) {
                var parsedResponse = JSON.parse(data.response);
                _this.profile.Image = {
                    Link: parsedResponse.data.link
                };
                _this.save();
            }
        });
    };
    /**
     * Save edited profile
     */
    EditProfileComponent.prototype.save = function () {
        this.profileSvc.saveProfile(this.profile).subscribe(function (data) {
            console.log(data);
        });
    };
    /**
     * Fire upload event
     */
    EditProfileComponent.prototype.startUpload = function () {
        this.uploadEvents.emit("startUpload");
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