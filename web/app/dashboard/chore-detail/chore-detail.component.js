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
var ChoreDetailComponent = (function () {
    function ChoreDetailComponent(dashSvc, route) {
        this.dashSvc = dashSvc;
        this.route = route;
        /**
         * User variable
         */
        this.chore = {
            category: {},
            user: {}
        };
    }
    /**
     * Fires when component is loaded
     */
    ChoreDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = +params["choreId"];
            _this.getChore(id);
        });
    };
    /**
     * Go to previous application state
     */
    ChoreDetailComponent.prototype.goBack = function () {
        window.history.back();
    };
    /**
     * Get chore details
     */
    ChoreDetailComponent.prototype.getChore = function (choreId) {
        var _this = this;
        this.dashSvc.getChore(choreId)
            .then(function (data) {
            _this.chore = JSON.parse(data._body);
            // console.log(this.chore);
        }, function (error) {
            // console.log(error);
        });
    };
    ChoreDetailComponent = __decorate([
        core_1.Component({
            selector: "ch-chore-detail",
            providers: [dashboard_service_1.DashboardService],
            templateUrl: "app/dashboard/chore-detail/chore-detail.component.html"
        }), 
        __metadata('design:paramtypes', [dashboard_service_1.DashboardService, router_1.ActivatedRoute])
    ], ChoreDetailComponent);
    return ChoreDetailComponent;
}());
exports.ChoreDetailComponent = ChoreDetailComponent;
//# sourceMappingURL=chore-detail.component.js.map