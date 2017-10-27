import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserService } from '../../../services/user-service';
import { UtilProvider } from '../../../providers/util-provider';

@Component({
	selector: 'page-user-list',
	templateUrl: 'user-list.html',
})
export class UserListPage {

	public users: any = undefined;
	public users_copy: any = undefined;
	public rols: any = undefined;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private util: UtilProvider,
		private userService: UserService
	) { }

	ionViewDidLoad() {
		this.getListUsers();
		this.getAllRols();
	}

	private getListUsers() {
		this.util.loading();
		this.userService.getListUsers()
			.subscribe(data => {
				this.users = [];
				if (data != undefined) {
					this.users = data;
					for (var i = 0; i < this.users.length; ++i) {
						let roles = this.users[i].roles.split(',');
						this.users[i].rols = [];

						for (var j = 0; j < roles.length; ++j) {
							this.users[i].rols.push(this.util.camelCase(roles[j]));
						}
					}
					this.users_copy = this.users;
				}
				this.util.loadingDismiss();
			},
			error => {
				this.users = [];
				this.util.loadingDismiss();
				console.log(error);
			});
	}

	private getAllRols(){
		this.util.loading();
		this.userService.getAllRols()
		.subscribe(data => {
				this.rols = [];
				if (data != undefined) {
					this.rols = data;
					for (var i = 0; i < this.rols.length; ++i) {
						this.rols[i].nombre = this.util.camelCase(this.rols[i].nombre);
					}
				}
				console.log(this.rols);
				this.util.loadingDismiss();
			},
			error => {
				this.rols = [];
				this.util.loadingDismiss();
				console.log(error);
			});
	}

	private changeStateUser(user: any){
		this.util.loading();
		this.userService.changeStateUser({ email: user.email, estado: (user.estado == 1)? 0 : 1 })
		.subscribe(data => {
				if(data[0].status == 'OK'){
					user.estado = (user.estado == 1)? 0 : 1;
				} else {
					this.util.presentToast("Ocurrió un problema al cambiar el estado, intentelo más tarde");
				}
				this.util.loadingDismiss();
			},
			error => {
				this.util.loadingDismiss();
				console.log(error);
			});
	}

	public SelectedRol(user: any){
		let data = [];
		for (var i = 0; i < this.rols.length; ++i) {
			data.push({ label: this.rols[i].nombre, check: this.findByRol(user.rols, this.rols[i].nombre) != -1 });
		}
		this.util.alertCheckbox(data, (data => {
			this.changeRolsUser(user, data);
		}));
	}

	private changeRolsUser(user: any, checks: any){
		let request = {client: '0', admin: '0', employee: '0', provider: '0', user_email: user.email};
		let new_rols = [];
		let new_rol_string = "";
		for (var i = 0; i < checks.length; ++i) {
			if(checks[i] == 'Cliente'){
				request.client = '1';
				new_rol_string += 'cliente,';
			} else if(checks[i] == 'Proveedor'){
				request.provider = '1';
				new_rol_string += 'proveedor,';
			} else if(checks[i] == 'Admin'){
				request.admin = '1';
				new_rol_string += 'admin,';
			} else if(checks[i] == 'Empleado'){
				request.employee = '1';
				new_rol_string += 'empleado,';
			}
			new_rols.push(checks[i]);
		}
		new_rol_string = new_rol_string.substring(0, new_rol_string.length - 1);

		this.util.loading();
		this.userService.changeRolsUser(request)
		.subscribe(data => {
			if(data[0].status == 'OK'){
				user.roles = new_rol_string;
				user.rols = new_rols;
			} else {
				this.util.presentToast("Ocurrió un problema al cambiar el estado, intentelo más tarde");
			}
			this.util.loadingDismiss();
		},
		error => {
			this.util.loadingDismiss();
			console.log(error);
		});
	}

	private findByRol(array: any, rol: string){
		for (var i = 0; i < array.length; ++i) {
			if(array[i] == rol){
				return i;
			}
		}
		return -1;
	}
	
	public onInput(event: any) {
		this.users = this.users_copy;
		if(event != 'all'){
			this.users = this.users_copy;
	    	let val = event;
		    if (val && val.trim() != '') {
		      this.users = this.users.filter((item) => {
		        return item.roles.toLowerCase().indexOf(val.toLowerCase()) > -1;
		      })
	    	}
		}
  	}
}
