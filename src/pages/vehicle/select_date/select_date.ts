import { Component } from '@angular/core';
import { ModalController, ViewController } from 'ionic-angular';

@Component({
    selector: 'page-selectDate',
    templateUrl: 'select_date.html',
})

export class SelecDatePage {
    public event = {
        month: '1990-02-19',
        timeStarts: '07:43',
        timeEnds: '1990-02-20'
    }
    constructor(
        public viewCtrl: ViewController
    ) {

    }
    ionViewDidLoad() {

    }

    dismiss() {
        let data = { 'foo': 'bar' };
        this.viewCtrl.dismiss(data);
    }

}
