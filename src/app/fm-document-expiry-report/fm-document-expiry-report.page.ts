import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { IpaddressService } from '../fm-services/ipaddress.service';
import * as $ from "jquery";

@Component({
  selector: 'app-fm-document-expiry-report',
  templateUrl: './fm-document-expiry-report.page.html',
  styleUrls: ['./fm-document-expiry-report.page.scss'],
})
export class FmDocumentExpiryReportPage implements OnInit {

  showdata: boolean = false;
  branch_id: any;
  function_id: any;
  user_id: any;
  user_type: any;
  getdocumentexpiryList: any =[];

  constructor(private http: HttpClient,
    private platform: Platform,
    public Ipaddressservice: IpaddressService,) {

    this.branch_id = localStorage.getItem('TUM_BRANCH_ID');
    this.function_id = localStorage.getItem('FUNCTION_ID');
    this.user_id = localStorage.getItem('TUM_USER_ID');
    this.user_type = localStorage.getItem('TUM_USER_TYPE');
  }

  ngOnInit() {
    this.getdocumentexpiryreport()
  }

  getdocumentexpiryreport() {
    let data = {
      functionid: this.function_id ? this.function_id : 0,
      user_id: this.user_id ? this.user_id : 0,
      branchid:  this.branch_id ?  this.branch_id : 0,
      propertycode: 0,
      issuedate: 0,
      expirydate: 0,
      clientcode: 0,
      clientname: 0
    };
    const header = new Headers();
    header.append("Content-Type", "application/json");
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getdocumentexpiryreport/' + data.functionid + '/' + data.branchid + '/' + data.propertycode + '/' + data.issuedate + '/' + data.expirydate + '/' + data.clientcode + '/' + data.clientname, {
      headers: options,
    }).subscribe(resp => {

      // this.getdocumentexpiryList = resp;
      // console.log(this.getdocumentexpiryList);


      if (resp == null || resp == "No data found") {
        this.showdata = true;
        this.getdocumentexpiryList = [];
      }
      else {
        this.showdata = false
        this.getdocumentexpiryList = resp;
      }
    });
  }

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
