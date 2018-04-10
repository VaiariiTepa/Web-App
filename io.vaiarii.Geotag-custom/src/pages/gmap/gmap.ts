
import { GvoicePage } from './../gvoice/gvoice';
import { Component } from '@angular/core';
import { NavController, Platform, NavParams,ActionSheetController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

//native components
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { TextToSpeech, TTSOptions } from '@ionic-native/text-to-speech';

//PAGE
import { SlidePage } from './../slide/slide';

@Component({
  selector: 'page-gmap',
  templateUrl: 'gmap.html'
})
export class GmapPage {

  map: GoogleMap;
  lat: any;
  lng: any;
  pos: any;
  speechTranslate: any;
  prenom: string;

  constructor(public NavCtrl: NavController,private tts: TextToSpeech, private googleMaps: GoogleMaps, public platform: Platform, private geolocation: Geolocation, public storage: Storage, private NavParams: NavParams,public actionSheetCtrl: ActionSheetController) {
    console.log('constructor');

    this.storage.get('intro-done').then(done => {
      if (!done) {
        this.storage.set('intro-done', true);
        this.NavCtrl.setRoot(SlidePage);
      }
    });

    this.platform.ready().then(()=>{



      this.geolocation.getCurrentPosition().then((resp) => {
        console.log('fonction getCurrentPosition');



        //longitude - latitude actuelle
        this.lat = resp.coords.latitude;
        this.lng = resp.coords.longitude;

        this.prenom = NavParams.get('prenom');

        console.log(this.prenom);
        this.loadMap();
        // this.NavCtrl.setPages('GmapPage',this.prenom);
      }).catch((error) => {
        console.log('Error getting location', error);
      });
      console.log('constructeur-platform');
    });
  }

  // ionViewDidLoad(){



  // }






  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choisir une action',
      buttons: [
        {
          text: 'Ou suis-je ?',
          role: 'se geolocaliser',
          handler: () => {
            this.moveToMe();
          }

        }
        ,
        {
          text: 'Gvoice',
          role: 'Gvoice',
          handler: () => {
            console.log('Gvoice clicked');
            this.NavCtrl.push(GvoicePage);
          }
        },
        {
          text: 'Intro',
          role: 'Intro',
          handler: () => {
            console.log('Intro clicked');
            this.NavCtrl.push(SlidePage);
          }
        },{
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }



  loadMap() {
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.lat,
          lng: this.lng
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map', mapOptions);

    this.speek_welcome();

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
    .then(() => {
      console.log('Map is ready!');



      // Now you can use all methods safely.
      this.map.addMarker({
          title: this.prenom+', Vous êtes ICI :)',
          icon: 'blue',
          animation: 'DROP',
          position: {
            lat: this.lat,
            lng: this.lng
          }
        })
        .then(marker => {
          marker.on(GoogleMapsEvent.MARKER_CLICK)
            .subscribe(() => {
              alert('Info parcours');
            });
        });

    });
  }

  //message vocale de bien venue
  speek_welcome(){
    console.log('speek_welcome');

    this.tts.speak({
      text: "Bonjour "+this.prenom+", pour commencer une activité appuyer sur le bouton PLUS",
      locale: "fr-FR" // Pass any locale you want here.
    }).then(() => console.log('Success'))
      .catch((reason: any) => console.log(reason));

  }


  //message vocale pour indiqué la position
  speek_position(){
    console.log('speek_position');
    this.tts.speak({
      text: this.prenom+", Vous êtes ici",
      locale: "fr-FR" // Pass any locale you want here.
    }).then(() => console.log('Success'))
      .catch((reason: any) => console.log(reason));

  }
  /**
   * Met a jour la position actuelle
   */
  moveToMe(){
    this.speek_position();
    console.log('moveToMe');
    this.map.setCameraTarget({
      lat: this.lat,
      lng: this.lng
    });
  }
}



