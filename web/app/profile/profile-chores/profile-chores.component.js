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
var profile_service_1 = require("../profile.service");
var ProfileChoresComponent = (function () {
    function ProfileChoresComponent(profileSvc) {
        this.profileSvc = profileSvc;
        /**
         * Chores belonging to this user
         */
        this.chores = [];
    }
    /**
     * Fires when component is loaded
     */
    ProfileChoresComponent.prototype.ngOnInit = function () {
        this.getChores();
    };
    ProfileChoresComponent.prototype.deleteChore = function (id) {
        var _this = this;
        this.profileSvc.deleteChore(id)
            .then(function (data) {
            _this.chores = _this.chores.filter(function (chore) { return chore.id != id; });
        }, function (error) {
            // console.log(error);
        });
    };
    /**
     * Get all categories
     */
    ProfileChoresComponent.prototype.getChores = function () {
        var _this = this;
        this.profileSvc.getUserChores()
            .then(function (data) {
            _this.chores = JSON.parse(data._body);
        }, function (error) {
            // console.log(error);
        });
    };
    ProfileChoresComponent = __decorate([
        core_1.Component({
            selector: "ch-profile-chores",
            providers: [profile_service_1.ProfileService],
            templateUrl: "app/profile/profile-chores/profile-chores.component.html"
        }), 
        __metadata('design:paramtypes', [profile_service_1.ProfileService])
    ], ProfileChoresComponent);
    return ProfileChoresComponent;
}());
exports.ProfileChoresComponent = ProfileChoresComponent;
//# sourceMappingURL=profile-chores.component.js.map