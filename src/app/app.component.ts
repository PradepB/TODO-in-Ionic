import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertController } from '@ionic/angular';
import { from } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  backButtonSubscription;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private alertController: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() { }
  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this.presentAlertConfirm();
    });
  }
  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Exit!',
      message: 'Are you sure, Want to Exit?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            navigator['app'].exitApp();
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
}
