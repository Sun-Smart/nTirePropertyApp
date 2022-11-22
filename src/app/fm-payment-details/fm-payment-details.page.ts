import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { IpaddressService } from '../fm-services/ipaddress.service';
import * as $ from "jquery";

@Component({
  selector: 'app-fm-payment-details',
  templateUrl: './fm-payment-details.page.html',
  styleUrls: ['./fm-payment-details.page.scss'],
})
export class FmPaymentDetailsPage implements OnInit {

  propetycondactlist: any;
  branch_id: any;
  function_id: any;
  user_type: any;
  user_id: any;
  branch: any;
  branchlocation: any;
  propertycodeDesc: any;
  customerName: any;
  status: any;
  paymode: any;
  chequeno: any;
  getPaymentDetailsList: any = [];

  constructor(private http: HttpClient,
    private platform: Platform,
    public Ipaddressservice: IpaddressService,) {

    this.branch_id = localStorage.getItem('TUM_BRANCH_ID');
    this.function_id = localStorage.getItem('FUNCTION_ID');
    this.user_id = localStorage.getItem('TUM_USER_ID');
    this.user_type = localStorage.getItem('TUM_USER_TYPE');
  }

  ngOnInit() {
    this.getPaymentDetails()
  };


  getPaymentDetails() {
    const header = new Headers();
    header.append("Content-Type", "application/json");
    let data = {
      Function_id: this.function_id ? this.function_id : 0,
      Branch_id: this.branch ? this.branch : 0,
      locationid: this.branchlocation ? this.branchlocation : 0,
      property_code: this.propertycodeDesc ? this.propertycodeDesc : 0,
      custname: this.customerName ? this.customerName : "0",
      Status: this.status ? this.status : "0",
      payMode: this.paymode ? this.paymode : "0",
      chequeNo: this.chequeno ? this.chequeno : "0",
      fromDate: 0,
      toDate: 0
    };
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getpaymentdetailsreports/' + data.Function_id + '/' + data.Branch_id + '/' + data.locationid + '/' + data.property_code + '/' + data.custname + '/' + data.fromDate + '/' + data.toDate + '/' + data.Status + '/' + data.payMode + '/' + data.chequeNo, {
      headers: options,
    }).subscribe(resp => {

      this.getPaymentDetailsList = resp;

      // if (resp == null || resp == "No data found") {
      //   this.showdata = true;
      //   this.getPaymentDetailsList = [];
      // }
      // else {
      //   this.showdata = false;
      //   this.getPaymentDetailsList = resp;
      //   console.log(this.getPaymentDetailsList);
      //   for (var i = 0; i < this.getPaymentDetailsList.length; i++) {
      //     this.branch = this.getPaymentDetailsList[i].branch_id;
      //   }
      // }
    });
  };

  showmore(idvalue: any) {
    //        alert(idvalue);
    $("#dividvalsp" + idvalue).css("display", "block");
    $("#imageidvalsp" + idvalue).hide();
  }
  showless(idvalue: any) {
    //        alert(idvalue);
    $("#dividvalsp" + idvalue).css("display", "none");
    $("#imageidvalsp" + idvalue).show();
  };
}
