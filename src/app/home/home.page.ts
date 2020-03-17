import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private alertController: AlertController) { }

  listArray = [];
  inputValue: string;
  errorMessage: string;
  errMsg = false;
  addbtn = false;
  updateIndx: number;
  addValue() {
    if (this.inputValue !== '' && this.inputValue !== undefined) {
      this.errMsg = true;
      this.errorMessage = '';
      if (this.updateIndx !== null && this.updateIndx !== undefined) {
        this.listArray = this.replaceAt(this.listArray, this.updateIndx, this.inputValue);
        this.inputValue = '';
        this.addbtn = false;
        this.updateIndx = null;
      } else {
        this.listArray.push(this.inputValue);
        this.inputValue = '';
      }
    } else {
      this.presentAlert()
      // this.errorMessage = 'Enter value';
    }
  }

  replaceAt(array, index, value) {
    const ret = array.slice(0);
    ret[index] = value;
    return ret;
  }

  update(val, index) {
    this.addbtn = true;
    this.inputValue = val;
    this.updateIndx = index;
  }
  delete(val) {
    this.presentAlertConfirm(val);
  }
  async presentAlertConfirm(val) {
    const alert = await this.alertController.create({
      header: 'Delete!',
      message: 'Are you sure, want to delete?',
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
            this.listArray = this.listArray.slice(0, val).concat(this.listArray.slice(val + 1, this.listArray.length));
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      // subHeader: 'Subtitle',
      message: 'Enter Input.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
