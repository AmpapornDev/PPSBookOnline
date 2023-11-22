import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from '../_services/storage.service';
import { AlertService } from '../_services/alert.service';


@Component({
  selector: 'app-tab-account',
  templateUrl: './tab-account.page.html',
  styleUrls: ['./tab-account.page.scss'],
})
export class TabAccountPage implements OnInit {

  listAcc:any=[];
  imageBaseUrl = environment.imageUrl;
  webServiceUrl = environment.baseUrl;
  listStorage :any=[];

  constructor(
    public router: Router,
    private storage: Storage,
    private storageService: StorageService,
    private alertService: AlertService
    ) {

     }

  ngOnInit() {
    this.storageService.initStorage();
    this.listAccount();
  }

  /** list data member from storage **/
  listAccount(){
    this.storage.get('storage_member').then((val) => {
      console.log(val);
      this.listAcc = val;
    });
  }

  gotoCartHistory(id:any){
    console.log("gotoCartHistory");
    this.router.navigate(['/history-cart',id]);
    
  }

  gotoSettingAccount(){
    console.log("gotoSettingAccount");
  
  }
  gotoBack(){
    this.router.navigate(['/tabs/tab-home']);
  }

  logoutAccount(){

    this.storageService.remove('storage_member');
    this.storageService.clear();
    /**Alert**/ 
    this.alertService.showAlertConfirm('ออกจากระบบ','คุณต้องการออกจากระบบใช่ไหม','/tabs/tab-home');

  }

}
