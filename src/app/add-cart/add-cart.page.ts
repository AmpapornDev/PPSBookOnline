import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { StorageService } from '../_services/storage.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.page.html',
  styleUrls: ['./add-cart.page.scss'],
})
export class AddCartPage implements OnInit {

  listCart: any = [];
  dataIdMember: any = [];
  totalSum: number;
  totalSumQty: number;
  qty_book: number;
  price_book: number;
  loading: any;
  dataListCart:any;
  value_member:any;

  imageBaseUrl = environment.imageUrl;
  webServiceUrl = environment.baseUrl;
  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    public router: Router,
    private alertController: AlertController,
    private loadingCtral: LoadingController,
    private storageService: StorageService,
    private storage: Storage,
    private route: ActivatedRoute,

  ) {}
  ionViewWillEnter(){
    this.ngOnInit();
  }

  /** loading page
  async presentLoading() {
    this.loading = await this.loadingCtral.create({
      message: 'Loading...',
    });
    await this.loading.present();
  }
  async initializeApp(id:any) {
    this.presentLoading();
    await Promise.all([this.getListCart(id)]);
    await this.loading.dismiss();
  }**/


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.value_member = id;
    //this.initializeApp(id);
    this.getListCart(id);
  }

  async getListCart(id_member:any) {   
    const loading = await this.loadingCtral.create({
      message: 'Loading...',
      spinner: 'bubbles',
    });
    await loading.present();

    /** list name category **/
    this.http.get(this.webServiceUrl + '/ws_list_cart.php?var_id='+id_member).subscribe((res) => {
     if(res && res === 'null'){
        console.log("res = "+res);
       // this.listCart = res;
        this.dataListCart = null;
        this.totalSum = 0;
        this.totalSumQty = 0;

      }else{
        console.log("res != "+res);
        this.dataListCart = 'success';
        this.listCart = res;
        this.totalSum = this.getTotalCost();
        this.totalSumQty = this.getQTYCost();
      }
    });
    loading.dismiss();
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

  gotoBack() {
    this.router.navigate(['/tabs/tab-home']);
  }
  //* Alert**/
  async showAlertDelete(itemCart: any,id:any) {
    const alert = await this.alertController.create({
      header: 'ตะกร้าสินค้า',
      message: 'คุณต้องการลบสินค้านี้?',
      buttons: [
        {
          text: 'ตกลง',
          role: 'confirm',
          handler: () => {
            console.log('confirm');
            this.deleteProduct(itemCart,id);
          },
        },
        {
          text: 'ยกเลิก',
          role: 'cancle',
          handler: () => {
            console.log('cancle');
          },
        },
      ],
    });
    await alert.present();
  }

  delCart(itemCart: any,id_member:any) {
    console.log("delCart / delCart = "+id_member);
    this.showAlertDelete(itemCart,id_member);
  }

  deleteProduct(itemCart: any,id_member:any) {
    const data = {
      var_id_book: itemCart.id_book,
      var_id_member: id_member,
    };
    this.http
      .post(
        this.webServiceUrl + '/ws_remove_cart.php',
        JSON.stringify(data),
        this.httpHeader
      )
      .subscribe((res) => {
        if (res === 'success') {
          this.getListCart(id_member);
        } else {
          console.log('error');
          //this.showAlertErrr();
        }
      });
  }


  gotoCheckout(){
    this.router.navigate(['/checkout-cart']);
  }

  
}
