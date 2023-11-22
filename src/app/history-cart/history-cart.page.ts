import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router,ActivatedRoute } from "@angular/router";
import { LoadingController } from '@ionic/angular';

import { Storage } from '@ionic/storage-angular';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-history-cart',
  templateUrl: './history-cart.page.html',
  styleUrls: ['./history-cart.page.scss'],
})
export class HistoryCartPage implements OnInit {

  dataPayment: any = [];
  dataMember: any = [];
  IdMemberStorage:any;
  imageBaseUrl = environment.imageUrl;
  webServiceUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    public router:Router,
    private loadingCtral: LoadingController,
    public authenService: AuthenticationService,
    private storage: Storage,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.IdMemberStorage = id;
    this.getPayment(id);
  }

  /** list data payment **/
  async getPayment(id:any) {
    const loading = await this.loadingCtral.create({
      message: 'Loading...',
      spinner: 'bubbles',
    });
    await loading.present();
    console.log('id_member = '+id);

    this.http
      .get(this.webServiceUrl + '/ws_list_payment.php?var_id_member='+id)
      .subscribe((res) => {
        if(res == true){
          this.dataPayment = null;
        }else{
          this.dataPayment = res;
        }
      });

      loading.dismiss();
  }

  detailHistoryCart(id_payment:number,id_member:any){
    this.router.navigate(['/detailhistory-cart',id_payment,id_member]);
  }

  gotoBack(){
    this.router.navigate(['/tabs/tab-account']);
  }
}
