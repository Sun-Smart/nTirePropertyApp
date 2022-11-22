import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { IpaddressService } from '../fm-services/ipaddress.service';
import * as $ from "jquery";

@Component({
  selector: 'app-fm-issue-ledger',
  templateUrl: './fm-issue-ledger.page.html',
  styleUrls: ['./fm-issue-ledger.page.scss'],
})
export class FmIssueLedgerPage implements OnInit {

  branch_id: any;
  function_id: any;
  user_id: any;
  user_type: any;
  propertyissueledger: any=[];

  constructor(private http: HttpClient,
    private platform: Platform,
    public Ipaddressservice: IpaddressService,) { 

    this.branch_id = localStorage.getItem('TUM_BRANCH_ID');
    this.function_id = localStorage.getItem('FUNCTION_ID');
    this.user_id = localStorage.getItem('TUM_USER_ID');
    this.user_type = localStorage.getItem('TUM_USER_TYPE');
  }

  ngOnInit() {
    this.getpropertyissueledger();
  };

  getpropertyissueledger() {
    const header = new Headers();
    header.append("Content-Type", "application/json");
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getpropertyissueledger/' + this.function_id + "/" + 0 + "/" + "0/0/0/0/0/0/0/0", {
      headers: options,
    }).subscribe((res: any) => {
      console.log(res, "issueledgerlist");

      this.propertyissueledger = res;

      // if (res == null || res == "No data found") {
      //   this.showdata = true;
      //   this.propertyissueledger = [];
      // }
      // else {
      //   this.showdata = false;
      //   this.propertyissueledger = res;
      // }
    });
  }

  showmore(idvalue:any) {
    //        alert(idvalue);
    $("#dividvalsp" + idvalue).css("display", "block");
    $("#imageidvalsp" + idvalue).hide();
  }
  showless(idvalue:any) {
    //        alert(idvalue);
    $("#dividvalsp" + idvalue).css("display", "none");
    $("#imageidvalsp" + idvalue).show();
  };
}
