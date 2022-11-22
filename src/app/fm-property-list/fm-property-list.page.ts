import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { IpaddressService } from '../fm-services/ipaddress.service';
import * as $ from "jquery";

@Component({
  selector: 'app-fm-property-list',
  templateUrl: './fm-property-list.page.html',
  styleUrls: ['./fm-property-list.page.scss'],
})
export class FmPropertyListPage implements OnInit {

  reportpropertylist:any;
  pmslistDataCount:any;

  branch:any
  branchlocation: any;
  propertycode: any;
  propertydescription: any;
  fDate: any;
  tDate: any;
  status1: any;
  propertyType: any;
  propertyOwner: any;
  propertyNature: any;
  branch_id: any;
  function_id: any;
  user_id: any;
  user_type: any;

  constructor(private http: HttpClient,
    private platform: Platform,
    public Ipaddressservice: IpaddressService,) { 

      this.branch_id = localStorage.getItem('TUM_BRANCH_ID');
      this.function_id = localStorage.getItem('FUNCTION_ID');
      this.user_id = localStorage.getItem('TUM_USER_ID');
      this.user_type = localStorage.getItem('TUM_USER_TYPE');
    }

  ngOnInit() {

    this.getpropertylistreport();
  }

  getpropertylistreport() {
    const header = new Headers();
    header.append("Content-Type", "application/json");
    let data = {
      functionId: this.function_id ? this.function_id : 0,
      branchId: this.branch ? this.branch : 0,
      locationid: this.branchlocation ? this.branchlocation : 0,
      propertyCode: this.propertycode ? this.propertycode : 0,
      Propertydesc: this.propertydescription ? this.propertydescription : 0,
      fromdate: this.fDate ? this.fDate : 0,
      todate: this.tDate ? this.tDate : 0,
      status: this.status1 ? this.status1 : 0,
      PropertyType: this.propertyType ? this.propertyType : 0,
      PropertyOwner: this.propertyOwner ? this.propertyOwner : 0,
      PropertyNature: this.propertyNature ? this.propertyNature : 0,
    };
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getpropertylistreports/' + data.functionId + "/" + data.branchId + "/" + data.locationid + "/"
      + data.propertyCode + '/' + data.Propertydesc + '/' + data.fromdate + '/' + data.todate + '/' + data.status + '/' + data.PropertyType + '/' + data.PropertyOwner + '/' + data.PropertyNature, {
      headers: options,
    }).subscribe((res: any) => {
      console.log(res, "reportlist");

      this.reportpropertylist = res;

      this.pmslistDataCount = this.reportpropertylist.length;

      console.log("count", this.pmslistDataCount);


      // if (this.reportpropertylist == null) {
      //   this.showdata = true;
      // }
      // else {
      //   this.showdata = false;
      //   this.pmslistDataCount;
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
