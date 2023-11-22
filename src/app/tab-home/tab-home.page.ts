import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoadingController } from '@ionic/angular';
import { Router } from "@angular/router";
import { Storage } from '@ionic/storage-angular';
import { StorageService } from '../_services/storage.service';
import { AlertService } from '../_services/alert.service';


@Component({
  selector: 'app-tab-home',
  templateUrl: './tab-home.page.html',
  styleUrls: ['./tab-home.page.scss']
})

export class TabHomePage implements OnInit {

  dataList :any;
  imageBaseUrl = environment.imageUrl;
  webServiceUrl = environment.baseUrl;
  loading: any;
  dataIdMember:any = [];
  IDMember:any;
  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private loadingCtral: LoadingController,
    public router:Router,
    private alertService: AlertService,
    private storage: Storage,
    private storageService: StorageService,
    ) {}

    ionViewWillEnter(){
      this.storageService.initStorage();
      this.loadAllBook();
      this.getMemberStorage()
    }

    ngOnInit(){
      this.storageService.initStorage();
      this.loadAllBook();
      this.getMemberStorage()
    }

    async loadAllBook(){
      const loading = await this.loadingCtral.create({
        message: 'Loading...', 
        spinner:'bubbles'
      });
      await loading.present();
  
      this.http.get(this.webServiceUrl+'/ws_all_book.php').subscribe(res => {
        this.dataList = res;
      });
      loading.dismiss();

    }

    getMemberStorage(){
      this.storage.get('storage_member').then((val) => {
        if(val){
          this.dataIdMember = val;
        }else{
          this.dataIdMember = '';
        }
      })
    }

    AddToCart(product: any,id_member:any) {
      if(id_member && id_member !== ''){
        const data = {
          var_id_book: product.id_book,
          var_id_member: id_member,
          var_image_book: product.image_book,
          var_name_book: product.namebook_book,
          var_price_book: product.price_book,
          var_qty: '1',
        };
    
        this.http.post(this.webServiceUrl + '/ws_add_cart.php', JSON.stringify(data),this.httpHeader).subscribe((res) => {
            if(res === 'success'){
              /**Alert**/ 
              this.alertService.showAlertSuccessID('ตะกร้าสินค้า','เพิ่มสินค้าลงตะกร้า เรียบร้อย!','add-cart',id_member);

            }else{
              /**Alert**/ 
              this.alertService.showAlertError('ตะกร้าสินค้า','ไม่สามารถเพิ่มสินค้าลงตะกร้า');
            }
          });

      }else{
        /**Alert**/ 
        this.alertService.showAlertConfirm('เข้าสู่ระบบ','กรุณาเข้าสู่ระบบก่อนสั่งซื้อสินค้า!','login');
      }
    }

    gotoDetailBook(id_book:any){
      console.log("go to DetailBook"+id_book);
      this.router.navigate(['/detail-book',id_book]);

    }

}
