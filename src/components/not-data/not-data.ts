import { Component } from '@angular/core';
import { App } from 'ionic-angular';

@Component({
    selector: 'not-data',
    templateUrl: 'not-data.html'
})
export class NotDataComponent {

    constructor(
        public appCtrl: App
    ) { }
}