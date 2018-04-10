
import { Component } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
//page
import { SlidePage } from './../slide/slide';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    prenom: string;


  constructor(public NavCtrl: NavController, public platform: Platform, public storage: Storage, private NavParams: NavParams) {


    this.prenom = NavParams.get('prenom');

    console.log(this.prenom);
  }


  ionViewDidLoad() {
    this.storage.get('intro-done').then(done => {
      if (!done) {
        this.storage.set('intro-done', true);
        this.NavCtrl.setRoot(SlidePage);
      }
    });
  }


}
