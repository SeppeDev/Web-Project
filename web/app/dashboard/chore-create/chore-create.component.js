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
var dashboard_service_1 = require("../dashboard.service");
var ChoreCreateComponent = (function () {
    function ChoreCreateComponent(dashSvc) {
        this.dashSvc = dashSvc;
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
            this.errors.titleError = "Geef een titel in.";
        }
        if (!this.chore.description || typeof (this.chore.description) == "undefined") {
            this.errors.descriptionError = "Voeg een beschrijving toe.";
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
        this.dashSvc.saveChore(this.chore)
            .then(function (data) {
            console.log(data);
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
        __metadata('design:paramtypes', [dashboard_service_1.DashboardService])
    ], ChoreCreateComponent);
    return ChoreCreateComponent;
}());
exports.ChoreCreateComponent = ChoreCreateComponent;
//# sourceMappingURL=chore-create.component.js.map