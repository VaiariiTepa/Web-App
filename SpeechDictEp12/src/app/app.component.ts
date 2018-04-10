import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//page
import { HomePage } from '../pages/home/home';
//native components
import { SpeechRecognition } from '@ionic-native/speech-recognition';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private SpeechRecognition: SpeechRecognition) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.SpeechRecognition.hasPermission()
      .then((hasPermission: boolean)=>{
        console.log('Droit d\'utiliser la reconnaissance vocale ? : ' + hasPermission);

        if(!hasPermission){
          this.requestSpeechRecognitionPermission();
        }
      } )
    });
  }

  private requestSpeechRecognitionPermission(): void{
    this.SpeechRecognition.requestPermission()
    .then(
      () => console.log('Granted'),
      () => console.log('Denied')
    )
  }
}

