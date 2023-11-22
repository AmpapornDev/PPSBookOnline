import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from '../_services/storage.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  listCart: any = [];
  dataIdMember: any = [];
  totalSumQty: number;
  loading: any;
  idMember: any;
  imageBaseUrl = environment.imageUrl;
  webServiceUrl = environment.baseUrl;

  constructor(
    public router: Router,
    private http: HttpClient,
    private loadingCtral: LoadingController,
    private storage: Storage,
    private storageService: StorageService,
    private alertService: AlertService
  ) {}

  ionViewWillEnter() {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.storageService.initStorage();
    this.getQTYCost();
    this.getMemberStorage();
  }
  /** select id member from storage **/
  async getMemberStorage() {
    const loading = await this.loadingCtral.create({
      message: 'Loading...',
      spinner: 'bubbles',
    });
    await loading.present();
    this.storage.get('storage_member').then((val) => {
      if ((val && val === true) || val !== null) {
        this.dataIdMember = val;
        this.idMember = this.dataIdMember.id_member;
        this.getListCart(this.idMember);
      } else {
        this.idMember = null;
      }
    });
    loading.dismiss();
  }

  getListCart(idMember: any) {
    console.log('getListCart = ' + idMember);
    /** list name category **/
    this.http
      .get(this.webServiceUrl + '/ws_list_cart.php?var_id=' + idMember)
      .subscribe((res) => {
        if (res !== 'null') {
          this.listCart = res;
        } else {
          this.listCart === '';
        }
        this.totalSumQty = this.getQTYCost();
      });

  }

  /**total qty */
  getQTYCost() {
    let total_qty = 0;
    for (var i = 0; i < this.listCart.length; i++) {
      total_qty = total_qty += parseInt(this.listCart[i].qty_book);
    }
    console.log('total_qty =' + total_qty);
    return total_qty;
  }

  gotoPageAddCart(idMember: any) {
    if (idMember == false || idMember == null) {
      this.alertService.showAlertConfirm(
        'ตะกร้าสินค้า',
        'กรุณาเข้าสู่ระบบ!',
        'login'
      );
    } else {
      console.log('dataIdMember = ' + idMember);
      /** เช็คก่อนว่าได้ทำการ login มั้ย ถ้า login ถึงดีดไปหน้า add-cart**/
      this.router.navigate(['/add-cart/' + idMember]);
    }
  }

  gotoPageAccount(idMember: any) {
    if (idMember == false || idMember == null) {
      this.alertService.showAlertConfirm(
        'ข้อมูลผู้ใช้',
        'กรุณาเข้าสู่ระบบ!',
        'login'
      );
    } else {
      console.log('dataIdMember = ' + idMember);
      /** เช็คก่อนว่าได้ทำการ login มั้ย ถ้า login ถึงดีดไปหน้า add-cart**/
      this.router.navigate(['/tabs/tab-account']);
    }
  }
}
