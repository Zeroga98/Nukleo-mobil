import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from 'ionic-angular';
import { StringsProvider } from './strings-provider'

@Injectable()
export class UtilProvider {

	public strings: StringsProvider;
	private loader: any = undefined;
	private loader_cont: number = 0;

	constructor(
		private alertCtrl: AlertController,
		private loadingCtrl: LoadingController,
		private toastCtrl: ToastController,
		private stringsProvider: StringsProvider
	) {
		this.strings = stringsProvider;
	}

	public getRangeDays(date: string, date2: string) {
		let p_date: any = date.split("-");
		let p_dat2: any = date2.split("-");
		var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
		var firstDate = new Date(parseInt(p_date[0]), parseInt(p_date[1]), parseInt(p_date[2]));
		var secondDate = new Date(parseInt(p_dat2[0]), parseInt(p_dat2[1]), parseInt(p_dat2[2]));

		return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
	}

	public presentToast(message: string) {
		let toast = this.toastCtrl.create({
			message: message,
			duration: 3000,
			position: 'bottom'
		});
		toast.present();
	}

	public loading(): any {
		this.loader_cont++;
		if (this.loader == undefined) {
			this.loader = this.loadingCtrl.create({
				content: "Cargando",
				dismissOnPageChange: false
			});
			this.loader.present();
		}
		return this.loader;
	}
	public loadingDismiss() {
		this.loader_cont--;
		if (this.loader_cont == 0) {
			this.loader.dismiss();
			this.loader = undefined;
		}
	};

	public showError(title: string, text: string) {
		let alert = this.alertCtrl.create({
			title: title,
			subTitle: text,
			buttons: ['OK']
		});

		alert.present(prompt);
	}

	public alertCheckbox(data: any, callback: any) {
		let alert = this.alertCtrl.create();
		alert.setTitle('Agregar o eliminar roles');

		for (var i = 0; i < data.length; ++i) {
			alert.addInput({
				type: 'checkbox',
				label: data[i].label,
				value: data[i].label,
				checked: data[i].check
			});
		}

		alert.addButton('Cancelar');
		alert.addButton({
			text: 'Listo',
			handler: data => {
				callback(data);
			}
		});
		alert.present();
	}

	public camelCase(text: string) {
		return (text.substring(0, 1).toUpperCase() + text.substring(1, text.length));
	}
}