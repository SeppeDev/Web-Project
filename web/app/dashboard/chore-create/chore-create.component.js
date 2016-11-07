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
var dashboard_service_1 = require("../dashboard.service");
var ChoreCreateComponent = (function () {
    function ChoreCreateComponent(dashSvc, router) {
        this.dashSvc = dashSvc;
        this.router = router;
        /**
         * List of errors
         */
        this.errors = {};
    }
    /**
     * Fires when component is loaded
     */
    ChoreCreateComponent.prototype.ngOnInit = function () {
        this.chore = {
            category: ""
        };
        this.getCategories();
    };
    /**
     * Return to previous application state
     */
    ChoreCreateComponent.prototype.goBack = function () {
        window.history.back();
    };
    /**
     * Validate chore creation form
     */
    ChoreCreateComponent.prototype.validate = function () {
        this.errors = [];
        console.log(this.chore);
        if (!this.chore.title || typeof (this.chore.title) == "undefined") {
            this.errors.titleError = "Vul dit veld aub in.";
        }
        else if (this.chore.title.length > 46) {
            this.errors.titleError = "Dit veld mag max. 46 karakters bevatten";
        }
        if (!this.chore.description || typeof (this.chore.description) == "undefined") {
            this.errors.descriptionError = "Vul dit veld aub in.";
        }
        else if (this.chore.description.length > 500) {
            this.errors.descriptionError = "Dit veld kan maximaal 500 karaters bevatten.";
        }
        if (!this.chore.location || typeof (this.chore.location) == "undefined") {
            this.errors.locationError = "Vul dit veld aub in.";
        }
        else if (this.chore.location.length > 46) {
            this.errors.locationError = "Dit veld kan maximaal 46 karakters bevatten.";
        }
        if (this.chore.category == "") {
            this.errors.categoryError = "Selecteer een categorie.";
        }
        if (Object.keys(this.errors).length == 0) {
            this.saveChore();
        }
    };
    /**
     * Get all categories
     */
    ChoreCreateComponent.prototype.getCategories = function () {
        var _this = this;
        this.dashSvc.getCategories()
            .then(function (data) {
            console.log(data);
            _this.categories = JSON.parse(data._body);
        }, function (error) {
            console.log(error);
        });
    };
    /**
     * Create new chore
     */
    ChoreCreateComponent.prototype.saveChore = function () {
        var _this = this;
        this.dashSvc.saveChore(this.chore)
            .then(function (data) {
            _this.router.navigate(["/hub/chores", JSON.parse(data._body).id]);
        }, function (error) {
            console.log(error);
        });
    };
    ChoreCreateComponent = __decorate([
        core_1.Component({
            selector: "ch-chore-create",
            providers: [dashboard_service_1.DashboardService],
            templateUrl: "app/dashboard/chore-create/chore-create.component.html"
        }), 
        __metadata('design:paramtypes', [dashboard_service_1.DashboardService, router_1.Router])
    ], ChoreCreateComponent);
    return ChoreCreateComponent;
}());
exports.ChoreCreateComponent = ChoreCreateComponent;
//# sourceMappingURL=chore-create.component.js.map