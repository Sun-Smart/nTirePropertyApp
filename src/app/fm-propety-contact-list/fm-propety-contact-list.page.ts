import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { IpaddressService } from '../fm-services/ipaddress.service';
import * as $ from "jquery";

@Component({
  selector: 'app-fm-propety-contact-list',
  templateUrl: './fm-propety-contact-list.page.html',
  styleUrls: ['./fm-propety-contact-list.page.scss'],
})
export class FmPropetyContactListPage implements OnInit {
  
  propetycondactlist: any;
  branch_id: any;
  function_id: any;
  user_type: any;
  user_id: any;

  constructor(private http: HttpClient,
    private platform: Platform,
    public Ipaddressservice: IpaddressService,) { 

    this.branch_id = localStorage.getItem('TUM_BRANCH_ID');
    this.function_id = localStorage.getItem('FUNCTION_ID');
    this.user_id = localStorage.getItem('TUM_USER_ID');
    this.user_type = localStorage.getItem('TUM_USER_TYPE');
  }

  ngOnInit() {
  this. getpropertycondactlist();
  }


  getpropertycondactlist() {
    let data = {
      functionID: this.function_id ? this.function_id : 0,
      branchID: 0,
      strPropertyCode: 0,
      strPropertyDesc: 0,
    };
    const header = new Headers();
    header.append('Content-Type', 'application/json');
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getpropertycontactlistreport/' + data.functionID + '/' + data.branchID + '/' + data.strPropertyCode + '/' + data.strPropertyDesc, {
      headers: options,
    }).subscribe((res: any) => {
      console.log(res, 'reportlist');

      this.propetycondactlist = res;
      // if (res == null || res == "No data found") {
      //   this.showdata = true;
      //   this.propetycondactlist = [];
      // }
      // else {
      //   this.showdata = false;
      //   this.propetycondactlist = res;
      // }
    });
  };


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
