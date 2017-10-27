import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { ReserveDetailPage } from '../../user/reserve-detail/reserve-detail';

import { UserService } from '../../../services/user-service';
import { UtilProvider } from '../../../providers/util-provider';

@Component({
  selector: 'page-reserve-list',
  templateUrl: 'reserve-list.html',
})
export class ReserveListPage {

  @ViewChild(Slides) slides: Slides;
  public index: number = 0;
  public reserves: any = undefined;
  public historys: any = undefined;
  public limit: number = 2;
  public offset: number = 0;

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    private util: UtilProvider,
    private userService: UserService
  ) {  }

  ionViewDidLoad() {
    this.getAllReserves();
  }

  private getAllReserves(){
    this.util.loading();
    this.userService.getAllReserve({ states: '123', limit: this.limit.toString(), offset: this.offset.toString() })
    .subscribe(data => {
        if(this.offset == 0){
          this.reserves = [];
        }
        if (data != undefined) {
          this.reserves = data;
        }
        this.offset += this.limit;
        console.log(this.reserves);
        this.util.loadingDismiss();
      },
      error => {
        this.reserves = [];
        this.util.loadingDismiss();
        console.log(error);
      });
  }

  public goToDetail(reserve: string) {
    this.nav.push(ReserveDetailPage, { reserve: reserve })
  }

  public slideChanged(){
    this.index = this.slides.getActiveIndex();
    console.log(this.index);
    //this.index = i;
  }

}
