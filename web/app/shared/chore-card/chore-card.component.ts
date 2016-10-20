import { Component, Input } from "@angular/core";

@Component({
    selector: "ch-chore-card",
    templateUrl: "app/shared/chore-card/chore-card.component.html"
})
export class ChoreCardComponent {
    @Input()
    chore: {};
    
    constructor () { }
}