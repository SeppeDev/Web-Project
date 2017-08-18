import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ch-instructions',
    templateUrl: 'instructions.component.html'
})
export class InstructionsComponent implements OnInit {
    /**
     * Indicates whether or not the user just made his profile.
     */
    isFirstTime = false;

    constructor () { }

    ngOnInit () {
        if (localStorage.getItem('is_first_time')) {
            this.isFirstTime = true;
        }
    }
}
