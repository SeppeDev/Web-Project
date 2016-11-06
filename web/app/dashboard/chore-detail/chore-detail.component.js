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
    function ChoreDetailComponent(route) {
        this.route = route;
        this.chore = {
            title: "Title",
            category: "Cleaning",
            author: {
                firstName: "Benno",
                lastName: "Meysmans",
                description: "Lorem Ipsum Zever",
                email: "test@example.com",
                isAdmin: false,
                image: "https://www.solo.be/uploadedimages/ingredienten/960x446/960/446/appel.jpg"
            },
            description: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsumLorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsumLorem ipsum"
        };
    }
    /**
     * Fires when component is loaded
     */
    ChoreDetailComponent.prototype.ngOnInit = function () {
        this.route.params.forEach(function (params) {
            var name = +params["choreId"];
        });
    };
    /**
     * Go to previous application state
     */
    ChoreDetailComponent.prototype.goBack = function () {
        window.history.back();
    };
    ChoreDetailComponent = __decorate([
        core_1.Component({
            selector: "ch-chore-detail",
            providers: [dashboard_service_1.DashboardService],
            templateUrl: "app/dashboard/chore-detail/chore-detail.component.html"
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute])
    ], ChoreDetailComponent);
    return ChoreDetailComponent;
}());
exports.ChoreDetailComponent = ChoreDetailComponent;
//# sourceMappingURL=chore-detail.component.js.map