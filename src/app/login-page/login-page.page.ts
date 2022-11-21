import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { IpaddressService } from '../fm-services/ipaddress.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {

  loginData !: FormGroup;
  username: any;
  password: any;
  user_name: any;
  data1: any;
  usertype: any;
  validityToDate: any;
  today: any;
  timeDiff: any;
  parentMenu: any;
  showValue: any;

  constructor(private formBuilder: FormBuilder,
    public alertController: AlertController, private httpclient: HttpClient,
    public Ipaddressservice: IpaddressService, private route: Router,
    public loadingController: LoadingController, private menuCtrl: MenuController) { 

      this.menuCtrl.enable(false, 'first');
      this.showValue = { "type": "password", "text": "Show" };
    }

  async presentAlert(heading: any, title: any) {
    var alert = await this.alertController.create({
      header: heading,
      cssClass: 'buttonCss',
      backdropDismiss: false,
      message: title,
      buttons: ['OK']
    });

    await alert.present();
  };

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: 'lines-sharp',
      duration: 500,
      // message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading',

    });
    return await loading.present();
  };

  async loadingdismiss() {

    return await this.loadingController.dismiss();
  };

  ngOnInit() {
    this.loginData = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }



  loginForm() {
    debugger;
    console.log(this.loginData.value);

    this.user_name = this.loginData.value.username;
    this.password = this.loginData.value.password;

    if (this.user_name == "" && this.password == "") {
      this.presentAlert('', 'Enter Username & Password');
      return;
    } else if (this.user_name == "" || this.user_name == undefined) {
      this.presentAlert('', 'Enter Username');
      return;
    } else if (this.password == "" || this.password == undefined) {
      this.presentAlert('', 'Enter Password');
      return;
    } else {
      if (this.user_name != undefined && this.password != undefined) {
        this.presentLoadingWithOptions();

        var ip = 5;
        var companyname = "1";
        var sessionid = "1234567";
        var username = this.user_name;
        var password = this.password;

        var credentials = {
          functionid: 1,
          user_lower: username,
          password: password,
          sessionid: sessionid,
          companyname: companyname,
          ip: ip
        };
        debugger;
        this.httpclient.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.
          getLoginLinkFM + '/loginMobileLos', credentials).subscribe((resp: any) => {
            console.log(resp);

            console.log(resp.FunAccess);

            console.log(resp["TUM_FORCE_LOGON"]);
            this.data1 = resp;
            var userdata = this.data1;
            console.log('userdata response', userdata);

            if (resp['Column1'] != undefined) {
              var b = resp['Column1'];
              setTimeout(() => {
                this.loadingdismiss();
                // this.presentAlert('Alert1', b);
                console.log("" + resp['Column1'])
              }, 5000);
            };

            this.httpclient.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.tokenlogin + '/Login/GetUserToken/' + resp.TUM_USER_NAME + '/' + password).subscribe((res:any) => {
              console.log('check token', res);
              localStorage.setItem('expires', resp['expires']);
              localStorage.setItem('token', res['token']);
              localStorage.setItem('usertoken', resp['usertoken']);
            });

            if (window.localStorage['TUM_USER_TYPE'] == 8) {
              this.usertype = true;
            } else {
              this.usertype = false;
              // $state.go('app.dashboard');
            };

            this.validityToDate = new Date(window.localStorage['TUM_VALIDITY_TO']);
            this.today = new Date();

            if (this.validityToDate < this.today) {
              console.log("validate date is small");

            }else{
              console.log("validate date is big");
              var diff = this.validityToDate - this.today;
              console.log(diff);
              this.timeDiff = Math.abs(this.validityToDate.getTime() - this.today.getTime());
              var diffDays = Math.ceil(this.timeDiff / (1000 * 3600 * 24));
              console.log(diffDays)

              if (diffDays == 3) {
                this.presentAlert('Note', 'You have 3 days validity. Kindly reach your system administrator to extend.');

              }else if (diffDays == 1) {
                this.presentAlert('Note', 'Your validity is going to expire tomorrow. Kindly reach your system administrator to extend.');
              };

              
              if (typeof (userdata['TUM_USER_NAME']) == 'undefined') {
                this.presentAlert('', 'Wrong Credential');
              }
              else if (userdata['TUM_USER_STATUS'] == 'A') {
                if (userdata['TUM_USER_NAME'].toUpperCase() === username || userdata['TUM_USER_CODE'].toUpperCase() === username) {


                  localStorage.setItem('TUM_USER_ID', userdata['TUM_USER_ID']);
                  localStorage.setItem('TUM_USER_TYPE', userdata['TUM_USER_TYPE']);
                  localStorage.setItem('TUM_BRANCH_ID', userdata['TUM_BRANCH_ID']);
                  localStorage.setItem('TUM_BRANCH_CODE', userdata['BRANCH_CODE']);
                  localStorage.setItem('TUM_USER_CODE', userdata['TUM_USER_CODE']);
                  localStorage.setItem('TUM_USER_NAME', userdata['TUM_USER_NAME']);
                  localStorage.setItem('TUM_EMP_CODE', userdata['TUM_USER_CODE']);
                  localStorage.setItem('FUNCTION_DESC', userdata['FUNCTION_DESC']);
                  localStorage.setItem('FUNCTION_ID', userdata['FUNCTION_ID']);
                  localStorage.setItem('BRANCH_LATLONG', userdata['BRANCH_LATLONG']);
                  localStorage.setItem('DashName', userdata['TUM_USER_NAME']);
                  this.httpclient.get(this.Ipaddressservice.ipaddress + this.Ipaddressservice.dynamicmenuFM + '/DynamicMenu/getparentandchildmenu/' + userdata['TUM_USER_CODE'] + '/P').subscribe(res => {
                    this.parentMenu = res;
                    this.parentMenu = localStorage.setItem('ParentMenu', JSON.stringify(res));
                  });
                  this.route.navigate(['/dashboard']);
                } else {
                  this.loadingdismiss();
                  this.presentAlert('Login failed!', 'Please check your username & Password!');
                  // this.loadingdismiss();
                }
              }else {
                this.loadingdismiss();
                // this.presentAlert('Login failed!', 'Please check your username & Password!');
              }
            }

          }, error => {
            this.loadingdismiss();
            this.presentAlert('Login failed!', 'Server Error, Please try after sometime!');
          });
      }
      else {
        this.presentAlert('', 'Please try after sometime!');
      }
    }
  };
  showPassword() {
    if (this.showValue.type == "password") {
      this.showValue = { "type": "text", "text": "Hide" }
    } else {
      this.showValue = { "type": "password", "text": "Show" }
    }
  };
}


