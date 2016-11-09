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
var ProfileChoreEditComponent = (function () {
    function ProfileChoreEditComponent(profileSvc, route, router) {
        this.profileSvc = profileSvc;
        this.route = route;
        this.router = router;
        /**
         * Chore to edit
         */
        this.chore = {
            category: ""
        };
        /**
         * Validation errors
         */
        this.errors = {};
    }
    /**
     * Fires when component is loaded
     */
    ProfileChoreEditComponent.prototype.ngOnInit = function () {
        var id;
        this.route.params.forEach(function (params) {
            id = +params["choreId"];
        });
        // this.getCategories();
        this.getChore(id);
    };
    /**
     * Return to previous application state
     */
    ProfileChoreEditComponent.prototype.goBack = function () {
        window.history.back();
    };
    /**
     * Validate chore editing form
     */
    ProfileChoreEditComponent.prototype.validate = function () {
        this.errors = [];
        if (!this.chore.title || typeof (this.chore.title) == "undefined") {
            this.errors.titleError = "Geef een titel in.";
        }
        else if (this.chore.title.length > 46) {
            this.errors.titleError = "Dit veld kan maximaal 46 karakters bevatten";
        }
        if (!this.chore.description || typeof (this.chore.description) == "undefined") {
            this.errors.descriptionError = "Voeg een beschrijving toe.";
        }
        if (!this.chore.location || typeof (this.chore.location) == "undefined") {
            this.errors.locationError = "Geef een locatie in.";
        }
        else if (this.chore.location.length > 46) {
            this.errors.locationError = "Dit veld kan maximaal 46 karakters bevatten";
        }
        // if(this.chore.category == "") {
        //     this.errors.categoryError = "Selecteer een categorie.";
        // }
        if (Object.keys(this.errors).length == 0) {
            this.updateChore();
        }
    };
    /**
     * Get chore to edit
     */
    ProfileChoreEditComponent.prototype.getChore = function (id) {
        var _this = this;
        this.profileSvc.getChoreById(id)
            .then(function (data) {
            _this.chore = JSON.parse(data._body);
            // console.log(this.chore);
        }, function (error) {
            // console.log();
        });
    };
    /**
     * Get all categories
     */
    // private getCategories () {
    //     this.profileSvc.getCategories()   
    //         .then((data: any) => {
    //             // console.log(data);
    //             this.categories = JSON.parse(data._body);
    //         }, (error: any) => {
    //             // console.log(error);
    //         });
    // }
    /**
     * Update chore
     */
    ProfileChoreEditComponent.prototype.updateChore = function () {
        var _this = this;
        this.profileSvc.updateChore(this.chore)
            .then(function (data) {
            // console.log(data);
            _this.router.navigate(["/hub/chores", _this.chore.id]);
        }, function (error) {
            // console.log(error);
        });
    };
    ProfileChoreEditComponent = __decorate([
        core_1.Component({
            selector: "ch-profile-chore-edit",
            providers: [profile_service_1.ProfileService],
            templateUrl: "app/profile/profile-chore-edit/profile-chore-edit.component.html"
        }), 
        __metadata('design:paramtypes', [profile_service_1.ProfileService, router_1.ActivatedRoute, router_1.Router])
    ], ProfileChoreEditComponent);
    return ProfileChoreEditComponent;
}());
exports.ProfileChoreEditComponent = ProfileChoreEditComponent;
//# sourceMappingURL=profile-chore-edit.component.js.map