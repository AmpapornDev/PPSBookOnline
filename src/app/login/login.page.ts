import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AlertService } from '../_services/alert.service';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  LoginForm: FormGroup;
  webServiceUrl = environment.baseUrl;
  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  listMember: any = [];

  constructor(
    public formBuilder: FormBuilder,
    private http: HttpClient,
    public alertService:AlertService,
    private storageService: StorageService,
    public router: Router,
  ) {
    
  }

  ngOnInit() {
    this.LoginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  get errorControl() {
    return this.LoginForm.controls;
  }

  submitForm = () => {

    if (this.LoginForm.valid) {
      if (
        this.LoginForm.value.username === '' &&
        this.LoginForm.value.password === ''
      ) {
         /** service Alert **/
        this.alertService.showAlertError("เข้าสู่ระบบ","กรุณากรอก ชื่อผู้ใช้และรหัสผ่าน");
      } else {
        const data = {
          var_username: this.LoginForm.value.username,
          var_password: this.LoginForm.value.password,
        };
        this.http
          .post(
            this.webServiceUrl + '/ws_login.php',
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
              this.alertService.showAlertSuccess("เข้าสู่ระบบ","ยินดีต้อนรับการกลับมาของคุณ >..<","tabs/tab-home");

            }
          });
      }
      return false;
    } else {
      return console.log('Please provide all the required values!');
    }
  };

  btnClose(){
    console.log('btnClose');
    this.router.navigate(['/tabs/tab-home']);
  }
  gotoPageRegis(){
    this.router.navigate(['/register']);
  }

}
