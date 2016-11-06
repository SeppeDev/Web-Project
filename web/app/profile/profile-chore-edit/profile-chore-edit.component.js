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
    function ProfileChoreEditComponent(profileSvc, route) {
        this.profileSvc = profileSvc;
        this.route = route;
    }
    /**
     * Fires when component is loaded
     */
    ProfileChoreEditComponent.prototype.ngOnInit = function () {
        var id;
        this.route.params.forEach(function (params) {
            id = +params["choreId"];
        });
        this.getChore(id);
    };
    /**
     * Get chore to edit
     */
    ProfileChoreEditComponent.prototype.getChore = function (id) {
        this.profileSvc.getChoreById(id)
            .then(function (data) {
            console.log();
        }, function (error) {
            console.log();
        });
    };
    ProfileChoreEditComponent = __decorate([
        core_1.Component({
            selector: "ch-profile-chore-edit",
            providers: [profile_service_1.ProfileService],
            templateUrl: "app/profile/profile-chore-edit/profile-chore-edit.component.html"
        }), 
        __metadata('design:paramtypes', [profile_service_1.ProfileService, router_1.ActivatedRoute])
    ], ProfileChoreEditComponent);
    return ProfileChoreEditComponent;
}());
exports.ProfileChoreEditComponent = ProfileChoreEditComponent;
//# sourceMappingURL=profile-chore-edit.component.js.map