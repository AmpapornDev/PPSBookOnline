import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-detailhistory-cart',
  templateUrl: './detailhistory-cart.page.html',
  styleUrls: ['./detailhistory-cart.page.scss'],
})
export class DetailhistoryCartPage implements OnInit {

  listCart: any = [];
  listMember: any = [];
  listPayment:any;
  value_idMember:any;

  imageBaseUrl = environment.imageUrl;
  webServiceUrl = environment.baseUrl;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public router:Router,
  ) { }

  ngOnInit() {
    const idPayment = this.route.snapshot.paramMap.get('id');
    const idMember = this.route.snapshot.paramMap.get('id_member');
    this.value_idMember = idMember;

    this.getListCart(idPayment,idMember);
    this.getDetailPayment(idPayment,idMember);
    this.getDetailMember(idMember)

  }

  getListCart(id:any,id_member:any) {
    this.http.get(this.webServiceUrl + '/ws_list_cart_history.php?var_id_member='+id_member+'&var_id_payment='+id)
    .subscribe((res) => {
      this.listCart = res;
      console.log(res);
    });
  }

  /** get detail member **/
  getDetailMember(idMember:any) {
    this.http
      .get(this.webServiceUrl + '/ws_member.php?var_id_member='+idMember)
      .subscribe((res) => {
        if(res){

          this.listMember = res;
          console.log(res);

        }else{
          this.listMember = '';
        }

      });
  }
  /** get detail member **/
  getDetailPayment(id:any,id_member:any) {
    this.http
      .get(this.webServiceUrl + '/ws_payment_history.php?var_id_member='+id_member+'&var_id_payment='+id)
      .subscribe((respayment) => {

        if(respayment){
          this.listPayment = respayment;
          console.log(respayment);
        }else{
          this.listPayment = '';
        }
      });
  }

  gotoHistoryCart(id_member:any){
    this.router.navigate(['/history-cart/'+id_member]);
  }


}
