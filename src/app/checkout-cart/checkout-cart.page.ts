import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AuthenticationService } from '../_services/authentication.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-checkout-cart',
  templateUrl: './checkout-cart.page.html',
  styleUrls: ['./checkout-cart.page.scss'],
})
export class CheckoutCartPage implements OnInit {
  listCart: any = [];
  //listMember: any = [];
  listBank: any = [];
  dataMember: any = [];
  totalSum: any;
  totalSumQty: number;
  totalEms: number;
  selectedValue: any;
  IdBank: number;
  idMember:any;

  imageBaseUrl = environment.imageUrl;
  webServiceUrl = environment.baseUrl;

  isAlertOpen = false;
  alertButtons = ['Action'];

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    public router: Router,
    public authenService: AuthenticationService,
    private storage: Storage,
    private alertService: AlertService,
  ) {}

  ngOnInit(){
    this.getListBank();
    this.getMemberStorage();
  }

  /** select id member from storage **/
  getMemberStorage() {
    this.storage.get('storage_member').then((val) => {
      if(val && val === true || val !== null){
        this.dataMember = val;
        this.idMember = this.dataMember.id_member;
        this.getListCart(this.idMember);

      }else{
        this.idMember = null;
      }
    });
  }

  getListCart(idMember:any) {
    this.http.get(this.webServiceUrl + '/ws_list_cart.php?var_id='+idMember).subscribe((res) => {
      this.listCart = res;
      this.totalSum = this.getTotalCost();
      this.totalSumQty = this.getQTYCost();
      this.totalEms = this.getEms();
    });
  }


  /**total price */
  getTotalCost() {
    let total = 0;
    for (var i = 0; i < this.listCart.length; i++) {
      total = total + this.listCart[i].price_book * this.listCart[i].qty_book;
    }
    return total;
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

  /**total ems */
  getEms() {
    let total_ems = 0;
    total_ems = this.getTotalCost();
    return total_ems += 50;

  }

  /** get detail member **/
  /*getDetailMember() {

    this.http
      .get(this.webServiceUrl + '/ws_member.php?var_id_member=1')
      .subscribe((res) => {
        this.listMember = res;
        console.log(res);
      });
  }*/

  /** get account bank **/
  getListBank() {
    this.http.get(this.webServiceUrl + '/ws_acc_bank.php').subscribe((res) => {
      this.listBank = res;
    });
  }
  /** Select Bank **/
  public BankHandleChange(ev: any) {
    this.selectedValue = JSON.stringify(ev.target.value);
  }

  savePayment(totalEms: any, totalSumQty: any, totalSum: any, IdBank: number,id_member:any) {
    /** If you select Bank **/

    if (IdBank) {
      const data = {
        var_id_bank: IdBank,
        var_id_member: id_member,
        var_totalprice: totalSum,
        var_totalqty: totalSumQty,
        var_total_amount: totalEms,
      };

      this.http
        .post(
          this.webServiceUrl + '/ws_add_payment.php',
          JSON.stringify(data),
          this.httpHeader
        )
        .subscribe((res) => {
          if (res === 'success') {

            /**Alert Success **/
            this.alertService.showAlertSuccessID(
              'ตะกร้าสินค้า',
              'คุณสั่งซื้อสินค้าเรียบร้อย!',
              'history-cart',
              id_member
            );

          } else {

            /**Alert Error**/
            this.alertService.showAlertError(
              'ตะกร้าสินค้า',
              'ไม่สามารถสั่งซื้อสินค้าได้ ลองใหม่อีกครั้ง'
            );

          }
        });
    } else {
      
      /** If you not select Bank  **/
      /**Alert Error**/
      this.alertService.showAlertError(
        'ตะกร้าสินค้า',
        'กรุณาเลือกวิธีชำระเงิน'
      );

    }
  }

  gotoBack() {
    this.router.navigate(['/add-cart']);
  }

}
