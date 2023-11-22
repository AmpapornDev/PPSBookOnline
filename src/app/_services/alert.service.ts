import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alertController: AlertController,
    public router: Router,
  ) { }

  async showAlertSuccess(txt_header:string,txt_message:any,page:any) {
    const alert = await this.alertController.create({
      header: txt_header,
      message: txt_message,
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            console.log('confirm');
            
            this.router.navigate(['/'+page+'']);
          }
        }
      ]
    });
    
    await alert.present();
  }
  async showAlertSuccessID(txt_header:string,txt_message:any,page:any,id:any) {
    const alert = await this.alertController.create({
      header: txt_header,
      message: txt_message,
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            console.log('confirm');
            this.router.navigate(['/'+page+'/'+id]);
          }
        }
      ]
    });
    await alert.present();
  }

  async showAlertError(txt_header:string,txt_message_error:string) {
    const alert = await this.alertController.create({
      header: txt_header,
      message: txt_message_error,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('error');
          }
        }
      ]
    });
    await alert.present();
  }

  async showAlertWarning(txt_header:string,txt_message_error:string,page:any) {
    const alert = await this.alertController.create({
      header: txt_header,
      message: txt_message_error,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('error');
            this.router.navigate(['/'+page+'']);
          }
        }
      ]
    });
    await alert.present();
  }

  async showAlertConfirm(txt_header:string,txt_message_error:string,page:any) {
    const alert = await this.alertController.create({
      header: txt_header,
      message: txt_message_error,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Alert canceled');
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            console.log('error');
            this.router.navigate(['/'+page+'']);
          }
        }
      ]
    });
    await alert.present();
  }
}

