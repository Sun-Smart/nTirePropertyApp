import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { IpaddressService } from '../fm-services/ipaddress.service';
import * as $ from "jquery";
import { Router } from '@angular/router';
@Component({
  selector: 'app-customer-property-details',
  templateUrl: './customer-property-details.page.html',
  styleUrls: ['./customer-property-details.page.scss'],
})
export class CustomerPropertyDetailsPage implements OnInit {
  showfilter: boolean = true;
  // showdata: boolean
  showAllrecords: any = [];

  showMore: boolean = false;
  functionID: any;
  userID: any;
  usertype: any;
  accessToken: any;
  branchName: any;
  // params: { access_token: any; usertoken: any; USER_ID: any; };
  branchid: any;
  branchID: any;

  isItemAvailable: boolean = false;
  customerlocation: any;
  islocItemAvailable: boolean = false;
  propertyCode1: any = [];
  companiesstr: any = [];
  propertycode: any;
  property_code: any;
  respContact: any;
  propertyDesc: any;
  isPropertycodeAvailable: boolean = false;


  branchlist1: any = [];
  branchlocationlist: any = [];
  branch: any;
  branchlocation: any;
  propertycodeDesc: any;
  getBID: any;
  branchId: any = [];
  get_Bid: any;
  loca_id: any;
  propertyCodeResult: any = [];
  showBranchField: boolean = true;
  showLocationField: boolean = false;
  // showRecords: boolean;
  location: any;
  showdata: boolean = false;
  showPropertyCodeField: boolean = false;
  getBIDDESC: any;
  showEachPopup: boolean = false;
  getBID_DESC: any;
  branchDesc: any = [];
  getBIDdesc: any;

  constructor(private modalCtrl: ModalController,
    public alertController: AlertController,
    private http: HttpClient, private router: Router,
    public Ipaddressservice: IpaddressService) {
    this.branchID = localStorage.getItem('TUM_BRANCH_ID');
    this.functionID = localStorage.getItem('FUNCTION_ID');
    this.userID = localStorage.getItem('TUM_USER_ID');
    this.usertype = localStorage.getItem('TUM_USER_TYPE');
    this.accessToken = localStorage.getItem('token');
    this.branch = localStorage.getItem('TUM_BRANCH_CODE');
  }

  ngOnInit() {
    this.BranchLocationdata();
    this.getcustomerItems();
  }
  showmore(idvalue) {
    //        alert(idvalue);
    $("#dividvalsp" + idvalue).css("display", "block");
    $("#imageidvalsp" + idvalue).hide();
  }
  showless(idvalue) {
    //        alert(idvalue);
    $("#dividvalsp" + idvalue).css("display", "none");
    $("#imageidvalsp" + idvalue).show();
  };
  BranchLocationdata() {
    let strFunctionId = localStorage.getItem('FUNCTION_ID');
    let userId = localStorage.getItem('TUM_USER_ID');

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'bindbranch/' + strFunctionId + "/" + userId, {
      headers: options,
    }).subscribe(resp => {
      this.branchlist1 = resp;
      for (var i = 0; i < this.branchlist1.length; i++) {
        this.getBID = this.branchlist1[i].BRANCH_ID;
        console.log('getBID', this.getBIDdesc);
      }


    }, error => {

      // console.log("branchlist1 : " + JSON.stringify(error));
    });
  };

  getLocationdata(branch: any) {
    this.branchName = this.branchlist1.filter((x => {
      if (x.BRANCH_ID == branch) {
        console.log(x);
        return x;
      }
    }))
    this.branchName = this.branchName[0]

    console.log("sdsd", this.branchName);
    this.getBIDdesc = this.branchlist1;
    console.log('this.getBIDedsc', this.getBIDdesc);
    let strFunctionId = localStorage.getItem('FUNCTION_ID');

    this.get_Bid = branch;

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getlocation/' + strFunctionId + "/" + branch, {
      headers: options,
    }).subscribe(resp => {
      console.log("location", resp);
      this.customerlocation = resp;

      for (var i = 0; i < this.customerlocation.length; i++) {
        this.loca_id = this.customerlocation[i].LOCATION_ID;
      };
      console.log(this.loca_id);
      if (this.loca_id) {
        this.showBranchField = false;
        this.showLocationField = true;
      } else {
        this.showBranchField = true;
        this.showPropertyCodeField = false;
      }

    });
  };

  newPropertyCode(branchlocation: any) {

    this.location = branchlocation;
    console.log(this.location);

    let data = {
      strFunctionId: localStorage.getItem('FUNCTION_ID'),
      propertyCode: 0,
      branch_Id: this.get_Bid,
    };
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getPropertycode/' + data.propertyCode + "/" + data.strFunctionId + "/" + data.branch_Id + "/" + this.location, {
      headers: options,
    }).subscribe(resp => {
      console.log('click t  call', resp)
      if (this.get_Bid) {
        this.showBranchField = false;
        this.showLocationField = false;
        this.showPropertyCodeField = true;
      }

    }, error => {
      console.log("error : " + JSON.stringify(error));
    });

  };

  getPropertyCode(ev: any) {

    let strFunctionId = localStorage.getItem('FUNCTION_ID');

    // console.log("one");
    this.propertyCode1 = [];
    if (ev.target.value == "") {
      this.propertyCode1 = [];
      this.isPropertycodeAvailable = false;
    };
    // Reset items back to all of the items
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getPropertycode/' + ev.target.value + "/" + strFunctionId + "/" + this.branch + "/" + this.location, {
      headers: options,
    }).subscribe(resp => {
      this.propertyCode1 = [];
      this.isPropertycodeAvailable = false;
      this.companiesstr = resp;

      console.log(this.companiesstr);

      if (this.companiesstr == "No data found") {
        debugger
        this.propertyCode1 = [];
        this.showdata = true;
      } else {
        this.showdata = false;
        for (var i = 0; i < this.companiesstr.length; i++) {
          this.propertyCode1.push({
            property_code: this.companiesstr[i].property_code,
            binding: this.companiesstr[i].property_code + "-" + this.companiesstr[i].property_building_name
          });
        };
      };



      console.log(this.propertyCode1);

      const val = ev.target.value;

      if (val && val.trim() != '') {
        this.isPropertycodeAvailable = true;
        this.propertyCode1 = this.propertyCode1.filter((item) => {
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      }
    }, error => {
      console.log("error : " + JSON.stringify(error));
    });
  };
  addPropertycode(item: any) {

    this.propertycode = item.binding;
    this.propertycodeDesc = item.property_code;
    this.isPropertycodeAvailable = false;
    for (var i = 0; i < this.companiesstr.length; i++) {
      if (this.propertycode == this.companiesstr[i].companyName) {
        this.property_code = this.companiesstr[i].id;
        console.log(this.property_code);
      }
    };

    let data = {
      functionid: localStorage.getItem('FUNCTION_ID'),
      branchids: this.branchid ? this.branchid : 1,
      locationid: this.branchlocation ? this.branchlocation : 1,
    }
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getPropertycode/' + this.propertycodeDesc + "/" + data.functionid + "/" + data.branchids + "/" + data.locationid, {
      headers: options,
    }).subscribe(resp => {
      this.respContact = resp;
      console.log(this.respContact);

      this.propertyDesc = this.respContact[0]['property_building_name'];
    }, error => {
      console.log("error : " + JSON.stringify(error));
    });
  }
  async presentAlert(heading, tittle) {
    var alert = await this.alertController.create({
      header: heading,
      cssClass: 'Cssbutton',
      backdropDismiss: false,
      message: tittle,
      buttons: ['OK']
    });

    await alert.present();
  };
  async presentAlert1(heading, tittle) {
    var alert = await this.alertController.create({
      header: heading,
      cssClass: 'buttonCss',
      backdropDismiss: false,
      message: tittle,
      buttons: ['OK']
    });
    await alert.present();
  }

  getcustomerItems() {

    let data = {
      functionid: localStorage.getItem('FUNCTION_ID'),
      branchids: 0,
      locationid: 0,
      strPropertyId: 0,
      strPropertyDesc: 0,
      rentelCode: 0,
      strStatus: 0,
      pageIndex: 0,
      pageSize: 50,
      sortExpression: 0,
      alphaname: 0,
      Split_ID: 0,
      strusertype: this.usertype ? this.usertype : 0,
      userid: this.userID ? this.userID : 0,
    };
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlProperty + 'fm_rental_summary/' + data.functionid + '/' + data.branchids + '/' + data.locationid + '/' + data.strPropertyId + '/' + data.strPropertyDesc + '/' + data.rentelCode + '/' + data.strStatus + '/' + data.pageIndex + '/' + data.pageSize + '/' + data.sortExpression + '/' + data.alphaname + '/' + data.Split_ID + '/' + data.strusertype + '/' + data.userid, {
      headers: options,
    }).subscribe((resp: any) => {
      console.log(resp);
      this.propertyCodeResult = resp;

      for (var i = 0; i < this.propertyCodeResult.length; i++) {
        // this.branchlocation = this.propertyCodeResult[i].location_id;
      }
      console.log(this.branchlocation);

      // if (this.propertyCodeResult == null) {
      //   this.showdata = "No Data Found"
      // }
      // else {
      //   this.showdata = this.propertyCodeResult.length;
      // }
    }, error => {
      // console.log("showAllrecords : " + JSON.stringify(error));
    });

  };
  filterRecords() {
    if (this.branch == "undefined" || this.branch == null || this.branch == "" || this.branch == "Branch") {
      this.presentAlert1("", "Please select Branch");
      return;
    } else {
      debugger;
      const header = new Headers();
      header.append("Content-Type", "application/json");

      let data = {
        functionid: localStorage.getItem('FUNCTION_ID'),
        branchids: this.get_Bid ? this.get_Bid : 0,
        locationid: this.location ? this.location : 0,
        strPropertyCode: this.propertycodeDesc ? this.propertycodeDesc : 0,
        strPropertyDesc: 0,
        rentelCode: 0,
        strStatus: 0,
        pageIndex: 0,
        pageSize: 50,
        sortExpression: 0,
        alphaname: 0,
        Split_ID: 0,
        strusertype: localStorage.getItem('TUM_USER_TYPE'),
        userid: localStorage.getItem('TUM_USER_ID')
      };

      let options = new HttpHeaders().set('Content-Type', 'application/json');
      this.http.get(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlProperty + 'fm_rental_summary/' + data.functionid + '/' + data.branchids + '/' + data.locationid + '/' + data.strPropertyCode + '/' + data.strPropertyDesc + '/' + data.rentelCode + '/' + data.strStatus + '/' + data.pageIndex + '/' + data.pageSize + '/' + data.sortExpression + '/' + data.alphaname + '/' + data.Split_ID + '/' + data.strusertype + '/' + data.userid, {
        headers: options,
      }).subscribe(resp => {
        ;
        this.propertyCodeResult = resp;
        console.log(this.propertyCodeResult);

        if (this.propertyCodeResult == null) {
          this.propertyCodeResult = []
          this.showdata = true;
        } else {
          this.showdata = false;
          this.propertyCodeResult = resp;
        }
      });

    };

  };
  showPopup() {
    this.showEachPopup = !this.showEachPopup;
  }
  gotoDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
