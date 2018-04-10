

import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';

import { SoundBoardPage } from '../pages/soundboard/soundboard';
import { StreemingPage } from '../pages/streeming/streeming';
import { TabsPage } from '../pages/tabs/tabs';
//native components
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Media } from '@ionic-native/media';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SoundBoardPage,
    StreemingPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SoundBoardPage,
    StreemingPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Media,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
