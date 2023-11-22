import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StorageService } from '../_services/storage.service';
import { Storage } from '@ionic/storage-angular';
import { AlertService } from '../_services/alert.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  dataListCate:any;
  dataNameCate:any = [];
  dataIdMember:any = [];
  var_idmember:any;

  imageBaseUrl = environment.imageUrl;
  webServiceUrl = environment.baseUrl;

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private http: HttpClient,
    public router:Router,
    private loadingCtral: LoadingController,
    private storage: Storage,
    private storageService: StorageService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {

    this.storageService.initStorage();
    const id = this.route.snapshot.paramMap.get('id');
    this.getListCatagory(id);
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



  goBackPage(){
    this.navCtrl.navigateForward('tabs/tab-category');
  }


  async getListCatagory(id:any){

    const loading = await this.loadingCtral.create({
      message: 'Loading...', 
      spinner:'bubbles'
    });
    await loading.present();

    /** list data **/
    this.http.get(this.webServiceUrl+'/ws_id_category.php?id_category='+id).subscribe(res => {
      this.dataListCate = res;
    });

    /** list name category **/
    this.http.get(this.webServiceUrl+'/ws_name_category.php?id_category='+id).subscribe(resname => {
      this.dataNameCate = resname;
      console.log(resname);
    });

    loading.dismiss();

  }

  AddToCart(product: any,id_member:any) {

    if (id_member == true ||  id_member !== null) {
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
          if(res === 'success'){
            /**Alert**/
            this.alertService.showAlertSuccess('ตะกร้าสินค้า','เพิ่มสินค้าลงตะกร้า เรียบร้อย!','add-cart/'+id_member);
  
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
