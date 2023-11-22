import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { StorageService } from '../_services/storage.service';
import { Storage } from '@ionic/storage-angular';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-detail-book',
  templateUrl: './detail-book.page.html',
  styleUrls: ['./detail-book.page.scss'],
})
export class DetailBookPage implements OnInit {
  dataDetailBook: any;
  imageBaseUrl = environment.imageUrl;
  webServiceUrl = environment.baseUrl;
  dataIdMember: any = [];
  var_idmember:any;

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public router: Router,
    private storageService: StorageService,
    private alertService: AlertService,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.storageService.initStorage();
    const id = this.route.snapshot.paramMap.get('id');
    this.getDetailBook(id);
    this.getMemberStorage();
  }
  /** select id member from storage **/
  getMemberStorage(){
    this.storage.get('storage_member').then((val) => {
      if(val){

        this.dataIdMember = val;
        this.var_idmember = this.dataIdMember.id_member;
        console.log('var_idmember = ' + this.var_idmember);


      }else{

        this.var_idmember = null;
        console.log('var_idmember = ' + this.var_idmember);
      }
    });
  }

  getDetailBook(id: any) {
    this.http
      .get(this.webServiceUrl + '/ws_detail_book.php?id_book=' + id)
      .subscribe((res) => {
        this.dataDetailBook = res;
        console.log('getListCatagory = ' + this.dataDetailBook);
      });
  }
  
  AddToCart(product: any, id_member: any) {
    
    console.log('id_member = ' + id_member);

    if(id_member && id_member !== ''){
      const data = {
        var_id_book: product.id_book,
        var_id_member: id_member,
        var_image_book: product.image_book,
        var_name_book: product.namebook_book,
        var_price_book: product.price_book,
        var_qty: '1',
      };

      this.http
        .post(
          this.webServiceUrl + '/ws_add_cart.php',
          JSON.stringify(data),
          this.httpHeader
        )
        .subscribe((res) => {
          if (res === 'success') {
            /**Alert**/ 
            this.alertService.showAlertSuccessID('ตะกร้าสินค้า','เพิ่มสินค้าลงตะกร้า เรียบร้อย!','add-cart',id_member);
          } else {
            /**Alert**/ 
            this.alertService.showAlertError('ตะกร้าสินค้า','ไม่สามารถเพิ่มสินค้าลงตะกร้า');
          }
        });

    } else {

      /**Alert**/ 
      this.alertService.showAlertConfirm('เข้าสู่ระบบ','กรุณาเข้าสู่ระบบก่อนสั่งซื้อสินค้า!','login');

    }
  }

  gotoBack() {
    this.router.navigate(['/tabs/tab-home']);
  }
}
