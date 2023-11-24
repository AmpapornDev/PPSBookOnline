import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AlertService } from '../_services/alert.service';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  regisForm: FormGroup;
  listMember: any = [];
  webServiceUrl = environment.baseUrl;
  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };


  constructor(

    public formBuilder: FormBuilder,
    public alertService:AlertService,
    private http: HttpClient,
    private storageService: StorageService,
    public router: Router,

  ) { }

  ngOnInit() {
    this.regisForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      mobile: ['', [Validators.required]],
      address: ['', [Validators.required]],
      district: ['', [Validators.required]],
      amphur: ['', [Validators.required]],
      province: ['', [Validators.required]],
      postcode: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required
        ],
      ],confirm_password: [
        '',
        [
          Validators.required
        ],
      ],
    });
  }

  get errorControl() {
    return this.regisForm.controls;
  }
  submitForm = () => {

    if (this.regisForm.valid) {

      if (this.regisForm.value.username === '' && 
      this.regisForm.value.name === '' &&
      this.regisForm.value.lastname === '' &&
      this.regisForm.value.email === '' &&
      this.regisForm.value.mobile === '' &&
      this.regisForm.value.address === '' &&
      this.regisForm.value.district === '' &&
      this.regisForm.value.amphur === '' &&
      this.regisForm.value.province === '' &&
      this.regisForm.value.postcode === '' &&
      this.regisForm.value.password === '' &&
      this.regisForm.value.confirm_password === '') {

        if(this.regisForm.value.password !== this.regisForm.value.confirm_password){
          this.alertService.showAlertError("สมัครสมาชิก","รหัสผ่านและ ยืนยันรหัสผ่านไม่ถูกต้อง");
        }else{
          /** service Alert **/
          this.alertService.showAlertError("สมัครสมาชิก","กรุณากรอกข้อมูลให้ครบถ้วน");
        }

      }else{

        const data = {
          var_username: this.regisForm.value.username,
          var_name: this.regisForm.value.name,
          var_lastname: this.regisForm.value.lastname,
          var_email: this.regisForm.value.email,
          var_mobile: this.regisForm.value.mobile,
          var_address: this.regisForm.value.address,
          var_district: this.regisForm.value.district,
          var_amphur: this.regisForm.value.amphur,
          var_province: this.regisForm.value.province,
          var_postcode: this.regisForm.value.postcode,
          var_password: this.regisForm.value.password
        };


        this.http
          .post(
            this.webServiceUrl + '/ws_register.php',
            JSON.stringify(data),
            this.httpHeader
          )
          .subscribe((res) => {

            if (res === 'error') {
              console.log('error');
              /** service Alert **/
              this.alertService.showAlertError("เข้าสู่ระบบ","ชื่อผู้ใช้และรหัสผ่านไม่ถูกต้อง");

            } else {
              /** service สำหรับเก็บค่า member เวลา login **/
              this.storageService.set('storage_member',res);
              /** service Alert **/
             this.alertService.showAlertSuccess("เข้าสู่ระบบ","ยินดีต้อนรับ(>..<)","tabs/tab-home");
            }

          });

      }

    }else{

      return console.log('Please provide all the required values!');

    }
    
  }
  btnClose(){
    console.log('btnClose');
    this.router.navigate(['/tabs/tab-home']);
  }
}
