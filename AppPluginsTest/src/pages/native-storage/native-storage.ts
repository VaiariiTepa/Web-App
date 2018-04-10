import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

//NativeStorage component
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-native-storage',
  templateUrl: 'native-storage.html'
})

export class NativeStoragePage{

  lastname: string;
  firstname: string;
  age: number;

  constructor(public nvCtrl: NavController, private NativeStorage: NativeStorage, public alertCtrl: AlertController){
    
  }

  public storeIdentity(): void {
    this.NativeStorage.setItem('my-identity-card', {
    lastname: this.lastname,
    firstname: this.firstname,
    age: this.age
  })
    .then(
      () => {
        let alert = this.alertCtrl.create({
          title: 'Card saved!',
          subTitle: "It's saved my friend",
          buttons: ['Nice !']
        });
        alert.present();
      },

      error => console.error('Error storing item', error)
    );
    
  }

  public getMyName(): void{
    this.NativeStorage.getItem('my-identity-card')
  .then(
    data => {
      this.lastname = data.lastname;
      this.firstname = data.firstname;
      this.age = data.age;
    },
    error => console.error(error)
  );
  }
}