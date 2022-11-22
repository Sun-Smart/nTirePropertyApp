import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from "jquery";
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { IpaddressService } from '../fm-services/ipaddress.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-fm-additional-page',
  templateUrl: './fm-additional-page.page.html',
  styleUrls: ['./fm-additional-page.page.scss'],
})
export class FmAdditionalPagePage implements OnInit {
  username = window.localStorage.getItem('TUM_USER_NAME');
  name: any;
  message: string | undefined;
  showfilter: boolean = true;
  branchlist1: any = [];
  branchlist: any;
  branchlocationlist: any = [];
  customerlocation: any;
  locationcode1: any[] = [];
  propertyCode1: any[] | undefined;
  isPropertycodeAvailable: boolean | undefined;
  companiesstr: any;
  branch: any;
  branchlocation: any;
  propertycode: any;
  property_code: any;
  respContact: any;
  propertyDesc: any;
  payDate: any;
  Pay_Date: any;
  showdata:boolean = false;
  ShowAddionalList: any = [];
  propDesc: any;
  showRecords: boolean | undefined;
  showError: boolean | undefined;
  showReceipt: any = [];
  rentalID: any;
  property_id: string | undefined;
  rental_pro_id: any;
  rent_code_ID: any;
  propertycodeDesc: any;
  branchId: any = [];
  getBID: any;
  loca_id: any;
  get_Bid: any; rental_code: any;
  rental_Code: any;
  data: any;
  sub: any;
  location: any;
  showBranch: boolean = false;
  showLocation: boolean = false;
  showProperty: boolean = false;
  showBranchField: boolean = true;
  showLocationField: boolean = false;
  showPropertyCodeField: boolean = false;
  branchName: any;
  locationName: any;
  constructor(private router: Router,public alertController: AlertController,public loadingController: LoadingController,
    private http: HttpClient,
    public Ipaddressservice: IpaddressService, private datePipe: DatePipe = new DatePipe("es-ES")) { }

  ngOnInit() {
    // this.presentLoadingWithOptions();
    this.BranchLocationdata();
    this.getListItems();
    // this.showBranch = false;
    // this.showLocation = false;
    // this.showProperty = false;
    // this.showBranchField = true;
    // this.showLocationField = false;
    // this.showPropertyCodeField = false;
    // this.loadingdismiss();
  }
  gotoDashboard() {
    this.router.navigate(['dashboard']);
  }
  gotoAdditional() {
    this.router.navigate(['fm-additional-page']);
  }
  gotoCustomer() {
    this.router.navigate(['customer-property-details']);
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
    this.presentLoadingWithOptions();
    let strFunctionId = localStorage.getItem('FUNCTION_ID');
    let userId = localStorage.getItem('TUM_USER_ID');
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'bindbranch/' + strFunctionId + "/" + userId, {
      headers: options,
    }).subscribe(resp => {
      this.branchlist1 = resp;
      for (var i = 0; i < this.branchlist1.length; i++) {
        this.getBID = this.branchId.push(this.branchlist1[i].BRANCH_ID);
      }
      this.loadingdismiss();
    }, error => {
      console.log("branchlist1 : " + JSON.stringify(error));
      this.loadingdismiss();
    });
  };
  getLocationdata(branch) {
    this.branchName = this.branchlist1.filter((x => {
      if (x.BRANCH_ID == branch) {
        this.showBranch = true;
        return x;
      }
    }))
    this.branchName = this.branchName[0]
    let strFunctionId = localStorage.getItem('FUNCTION_ID');
    this.get_Bid = branch;
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.presentLoadingWithOptions();
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getlocation/' + strFunctionId + "/" + branch, {
      headers: options,
    }).subscribe(resp => {
      this.customerlocation = resp;

        for (var i = 0; i < this.customerlocation.length; i++) {
          this.loca_id = this.customerlocation[i].LOCATION_ID;
        };
        if (this.loca_id) {
          this.showBranchField = false;
          this.showLocationField = true;
        } else {
          this.showBranchField = true;
          this.showPropertyCodeField = false;
        }
        this.loadingdismiss();
    });
  };
  newPropertyCode(branchlocation:any) {
    this.locationName = this.customerlocation.filter((x => {
      if (x.LOCATION_ID == branchlocation) {
        this.showLocation = true;
        return x;
      }
    }))
    this.locationName = this.locationName[0]
    this.location = branchlocation;
    const header = new Headers();
    header.append("Content-Type", "application/json");
    let options = new HttpHeaders().set('Content-Type', 'application/json');

    let data = {
      strFunctionId: localStorage.getItem('FUNCTION_ID'),
      propertyCode: 0,
      branch_Id: this.get_Bid
    };
    this.presentLoadingWithOptions();
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getPropertycode/' + data.propertyCode + "/" + data.strFunctionId + "/" + data.branch_Id + "/" + this.location, {
      headers: options,
    }).subscribe(resp => {
      console.log('click t  call', resp);
      if (this.get_Bid) {
        this.showBranchField = false;
        this.showLocationField = false;
        this.showPropertyCodeField = true;
      }
      this.loadingdismiss();
    }, error => {
      this.loadingdismiss();
      console.log("error : " + JSON.stringify(error));
    });
  }
  getPropertyCode(ev: any) {
    let strFunctionId = localStorage.getItem('FUNCTION_ID');
    this.propertyCode1 = [];
    if (ev.target.value == "") {
      this.propertyCode1 = [];
      this.isPropertycodeAvailable = false;
    }
    // Reset items back to all of the items
    const header = new Headers();
    header.append("Content-Type", "application/json");
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getPropertycode/' + ev.target.value + "/" + strFunctionId + "/" + this.branch + "/" + this.branchlocation, {
      headers: options,
    }).subscribe(resp => {
      this.propertyCode1 = [];
      this.isPropertycodeAvailable = false;
      this.companiesstr = resp;
      console.log(this.companiesstr);
      if (this.companiesstr == "No data found") {
        console.log('check pr code');
        this.companiesstr = "";
      } else {
        console.log('is available');
      }
      for (var i = 0; i < this.companiesstr.length; i++) {
        this.propertyCode1.push({
          property_code: this.companiesstr[i].property_code,
          binding: this.companiesstr[i].property_code + "-" + this.companiesstr[i].property_building_name,
          rental_pro_id: this.companiesstr[i].property_id
        });
      };
      const val = ev.target.value;
      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.isPropertycodeAvailable = true;
        this.propertyCode1 = this.propertyCode1.filter((item) => {
          this.showProperty = true;
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      }
    }, error => {
      console.log("error : " + JSON.stringify(error));
    });
  };
  addPropertycode(item: any) {
    let strFunctionId = localStorage.getItem('FUNCTION_ID');
    this.propertycode = item.binding;
    this.rental_pro_id = item.rental_pro_id;
    this.isPropertycodeAvailable = false;
    for (var i = 0; i < this.companiesstr.length; i++) {
      if (this.propertycode == this.companiesstr[i].companyName) {
        this.property_code = this.companiesstr[i].id;
        console.log(this.property_code);
      }
    };
    const header = new Headers();
    header.append("Content-Type", "application/json");
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getPropertyrent/' + strFunctionId + "/" + this.branch + "/" + this.branchlocation + "/" + this.rental_pro_id, {
      headers: options,
    }).subscribe(resp => {
      this.respContact = resp;
      console.log('puthusa check pandren',this.respContact);
      this.rentalID = this.respContact[0]['rental_id'];
      this.rental_Code = this.respContact[0]['rental_code'];
      this.propertyDesc = this.respContact[0]['property_code'] +'-'+this.respContact[0]['property_desc'];
      this.filterListItems();
    }, error => {
      console.log("error : " + JSON.stringify(error));
    });
  };
  viewReciept(item: any) {
    console.log(item);
    this.router.navigate(['/additionallist', item.PROPERTY_ID]);
  }
  getReceipt(i: any) {
    console.log('property grid ', i);
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getadditionalchargegrid/' + i.PROPERTY_ID, {
      headers: options,
    }).subscribe(resp => {
      this.showReceipt = resp;
    });
  }
  getListItems() {
    this.payDate = this.datePipe.transform(this.payDate, 'dd-MM-yyyy');
    let data = {
      strFunctionId: localStorage.getItem('FUNCTION_ID'),
      Branch: 0,
      Location: 0,
      Property_ID: 0,
      rent_ID: 0
    };
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.presentLoadingWithOptions();
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getadditionalcharges/' + data.strFunctionId + "/" + data.Branch + "/" + data.Location + "/" + data.Property_ID + "/" + data.rent_ID, {
      headers: options,
    }).subscribe(resp => {
      console.log("location", resp);
      if (resp == null) {
        this.showError = true;
      } else {
        this.showError = false;
        this.ShowAddionalList = resp;
      }
      this.loadingdismiss();
    });
  }
  filterListItems() {
      this.payDate = this.datePipe.transform(this.payDate, 'dd-MM-yyyy');
      let data = {
        strFunctionId: localStorage.getItem('FUNCTION_ID'),
        Branch: this.branch ? this.branch : 1,
        Location: this.branchlocation ? this.branchlocation : 1,
        Property_code: this.rental_pro_id ? this.rental_pro_id : 0,
        rent: this.rentalID ? this.rentalID : 1
      };
      let options = new HttpHeaders().set('Content-Type', 'application/json');
      this.presentLoadingWithOptions();
      this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getadditionalcharges/' + data.strFunctionId + "/" + data.Branch + "/" + data.Location + "/" + data.Property_code + "/" + data.rent, {
        headers: options,
      }).subscribe(resp => {
        this.ShowAddionalList = [];
        if (resp == null) {
          this.showRecords = true;
        } else {
          this.showRecords = false;
          this.ShowAddionalList = resp;
        }
        this.loadingdismiss();
      });
  }
  async presentAlert(heading, tittle) {
    var alert = await this.alertController.create({
      header: heading,
      cssClass: 'buttonCss',
      backdropDismiss: false,
      message: tittle,
      buttons: ['OK']
    });
    await alert.present();
  };
  clearBranch() {
    this.ngOnInit();
    this.showBranch = false;
    this.showLocation = false;
    this.showProperty = false;
    this.branchlist1 = [];
    this.customerlocation = [];
    this.propertyCode1 = [];
    this.ngOnInit();
    this.showBranchField = true;
    this.showLocationField = false;
    this.showPropertyCodeField = false;

  }
  clearLocation() {
    this.ngOnInit();
    this.showLocation = false;
    this.showProperty = false;
    this.customerlocation = [];
    this.propertyCode1 = [];
    this.ngOnInit();
    this.showBranchField = true;
    this.showLocationField = false;
    this.showPropertyCodeField = false;
  }
  clearProperty() {
    this.ngOnInit();
    this.showProperty = false;
    this.propertyCode1 = [];
    this.propertycode = "";
    this.ngOnInit();
    this.showBranchField = false;
    this.showLocationField = false;
    this.showPropertyCodeField = true;

  }
  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: 'lines-sharp',
      duration: 3000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading',

    });
    return await loading.present();
  };

  async loadingdismiss() {

    return await this.loadingController.dismiss();
  };
}
