import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {DatabaseServiceProvider} from '../providers/database-service/database-service';
import {SQLite} from "@ionic-native/sqlite";
import {PopoverPage} from "../pages/popover/popover";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PopoverPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PopoverPage
  ],
  providers: [
    StatusBar,
    SQLite,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseServiceProvider
  ]
})
export class AppModule {}
