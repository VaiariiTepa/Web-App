

import { Nav, NavController } from 'ionic-angular';

import { Component } from '@angular/core';

//page - class
import { GmapPage } from './../gmap/gmap';

@Component({
  templateUrl: 'slide.html'
})
export class SlidePage {
  prenom: string;
  constructor(public NavCtrl: NavController){

  }

  private showHome(){
    this.NavCtrl.setRoot(GmapPage, {
      prenom: this.prenom,
    });
  }

}
