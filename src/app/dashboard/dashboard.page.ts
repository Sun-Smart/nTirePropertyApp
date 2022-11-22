import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { InfiniteScrollCustomEvent, Platform } from '@ionic/angular';
import { ViewEncapsulation } from '@angular/core';
import { IpaddressService } from '../fm-services/ipaddress.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardPage implements OnInit {

  // students: any[];
  username: any;
  chartLoading: any;
  userid: any;

  options = { checkboxes: true }
  data: any = [];
  dataStatus: any = [];



  columns: any = [];
  columnsStatus: any = [];
  rows: any
  barChart: any;


  @ViewChild('sourcecanvas1') sourcecanvas1;
  @ViewChild('sourcecanvas2', { static: false }) sourcecanvas2;
  @ViewChild('sourcecanvas3') sourcecanvas3;
  usertype: any;
  accessToken: any;
  userID: any;
  functionID: any;
  issueDesc: any;
  branchlist: any;
  tovaccantchartcount: any = [];
  branchId: any;
  getBID: any;
  branch_id: any;
  // customerPaymentresult: any = [];
  labels: any = [];
  barchart: any;
  customerPaymenhtresult: any = [];
  showCustomeractive: boolean = true;
  showVacantActive: boolean = false;
  showPropertyactive: boolean = false;
  showStatusActive: boolean = false;
  showCustomerNormal: boolean = false;
  showPropertynormal: boolean = true;
  showVacantnormal: boolean = true;
  showStatusnormal: boolean = true;
  branchCountresult: any = [];
  branchCount: any;
  // sourcechart: any = [];
  showCustomerPayment: boolean = true;
  showPropertyStatus: boolean = false;
  sourcechart: any = [];
  sourcechart1: any = [];
  showtobevacant: boolean = false;
  customerPayment: any = [];
  issue_status: any;
  status: any | null;
  showissuestatus: boolean = false;
  checkedNew : boolean = false;
  checkedPending : boolean = false;
  checkedCompleted : boolean = false;
  dataStatus1: any=[];
  constructor(private http: HttpClient,
    private platform: Platform,private router: Router,
    public Ipaddressservice: IpaddressService,) {

    this.username = localStorage.getItem('TUM_USER_NAME');

    this.columnsStatus = [
      { name: 'propertycode', },
      { name: 'propertybuildingname', },
      { name: 'issuedescription', },
      // { name: 'issuecode', },
      { name: 'issuedate', },
      { name: 'status', },
      { name: 'tenant', }
    ];

    this.tovaccantchartcount = [
      { name: 'Days' },
      { name: 'Count', },
    ];

    // this.branchId = localStorage.getItem('TUM_BRANCH_ID');
    this.functionID = localStorage.getItem('FUNCTION_ID');
    this.userID = localStorage.getItem('TUM_USER_ID');
    this.usertype = localStorage.getItem('TUM_USER_TYPE');
    this.accessToken = localStorage.getItem('token');
  }

  ngOnInit() {

    debugger;
    // this.data = this.tableApi.getDashbTable1();
    console.log(this.data);

    this.BranchLocationdata();

    this.issueStatus();
    this.customerPayments();
    this.getBranchCountChart();
    // this.getEmployeeCountChart();
    this.getToBevaccantChart();
  }

  BranchLocationdata() {
    let strFunctionId = localStorage.getItem('FUNCTION_ID');
    let userId = localStorage.getItem('TUM_USER_ID');

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'bindbranch/' + strFunctionId + "/" + userId, {
      headers: options,
    }).subscribe(resp => {
      this.branchlist = resp;
      console.log(this.branchlist);

      // console.log("branchlocationlist one: " + JSON.stringify(this.branchlocationlist));
      for (var i = 0; i < this.branchlist.length; i++) {
        this.branch_id = this.branchlist[i].BRANCH_ID;
        console.log("this Branch", this.branch_id);
      }
    }, error => {

      console.log("branchlist1 : " + JSON.stringify(error));
    });
  };
  customerPayments() {
    debugger

    let data = {
      functionId: this.functionID ? this.functionID : 0,
      branchId: this.branch_id ? this.branch_id : 0,
      user_id: this.userID ? this.userID : 0,
    }

    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'customerpayments?strfunction=' + data.functionId + '&branch=' + data.branchId + '&userid=' + data.user_id, {
      headers: options,
    }).subscribe((resp: any) => {
      console.log(resp)
      debugger
      this.customerPaymenhtresult = resp;

      this.customerPayment = this.customerPaymenhtresult;
      console.log(this.customerPayment)
      console.log(this.customerPayment[0].Invoice);
      this.labels = [];
      this.data = [];

      for (var i = 0; i < this.customerPayment.length; i++) {
        this.labels[i] = this.customerPayment[i].Year;

        this.data[i] = this.customerPayment[i].Invoice + this.customerPayment[i].OutStanding + this.customerPayment[i].Paid;
      }
      console.log(this.data);
      if (this.barchart) {
        // this.barchart.destroy();
      }
      this.barchart = new Chart(this.sourcecanvas2.nativeElement, {
        type: 'bar',
        data: {
          labels: this.labels,
          datasets: [{
            barPercentage: 0.3,
            barThickness: '10',
            label: "Invoice",
            stack: "Base",
            backgroundColor: "#E1BA24",
            data: [this.customerPayment[0].Invoice, this.customerPayment[0].Invoice],
          }
            ,
          {
            barPercentage: 0.3,
            barThickness: '10',
            label: "OutStanding",
            stack: "Sensitivity",
            backgroundColor: "#2A93CE",
            data: [this.customerPayment[0].OutStanding, this.customerPayment[1].OutStanding],

          },
          {
            barPercentage: 0.3,
            barThickness: '10',
            label: "Paid",
            stack: "solid",
            backgroundColor: "#004073",
            data: [this.customerPayment[0].Paid, this.customerPayment[1].Paid],

          }
          ]
        },
        options: {
          legend: {
            display: true
          },
          scales: {
            xAxes: [{
              ticks: {
                fontSize: 10
              }
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true,
                display: true,
                labelString: window.localStorage['TUM_BRANCH_CODE'],

              }
            }]
          },
        },
      })
    });
  }

  activeCustomer() {

    this.showCustomeractive = true;
    this.showCustomerNormal = false;
    //chart show hide
    this.showCustomerPayment = true;
    this.showPropertyStatus = false;
    this.showtobevacant = false;
    this.showissuestatus = false;
    this.ngOnInit();
    this.showPropertyactive = false;
    this.showPropertynormal = true;

    this.showVacantActive = false;
    this.showVacantnormal = true;

    this.showStatusActive = false;
    this.showStatusnormal = true;

  }
  activeProperty() {
    this.showCustomeractive = false;
    this.showCustomerNormal = true;

    this.showPropertyactive = true;
    this.showPropertynormal = false;
    //chart show hide
    this.showCustomerPayment = false;
    this.showPropertyStatus = true;
    this.showtobevacant = false;
    this.showissuestatus = false;
    this.getBranchCountChart();

    this.showVacantActive = false;
    this.showVacantnormal = true;

    this.showStatusActive = false;
    this.showStatusnormal = true;
  }
  activeVacant() {
    this.showCustomeractive = false;
    this.showCustomerNormal = true;
    //chart show hide
    this.showCustomerPayment = false;
    this.showPropertyStatus = false;
    this.showtobevacant = true;
    this.showissuestatus = false;
    this.getToBevaccantChart();
    this.showPropertyactive = false;
    this.showPropertynormal = true;

    this.showVacantActive = true;
    this.showVacantnormal = false;

    this.showStatusActive = false;
    this.showStatusnormal = true;
  }
  activeStatus() {
    this.showCustomeractive = false;
    this.showCustomerNormal = true;
    //chart show hide
    this.showCustomerPayment = false;
    this.showPropertyStatus = false;
    this.showtobevacant = false;
    this.showissuestatus = true;
    this.issueStatus();
    this.showPropertyactive = false;
    this.showPropertynormal = true;

    this.showVacantActive = false;
    this.showVacantnormal = true;

    this.showStatusActive = true;
    this.showStatusnormal = false;
  }

  getBranchCountChart() {
    debugger;

    let data = {
      functionId: this.functionID ? this.functionID : 0,
      branchId: this.branch_id ? this.branch_id : 0,
      user_id: this.userID ? this.userID : 0,
    };

    var sourcearray: any = [];
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'propertystatus?strfunction=' + data.functionId + '&branch=' + data.branchId + '&userid=' + data.user_id, {
      headers: options,
    }).subscribe((resp: any) => {
      console.log(resp)
      debugger
      this.branchCountresult = resp;

      this.branchCount = this.branchCountresult;
      console.log(this.branchCount);
      this.labels = [];
      this.data = [];
      for (var i = 0; i < this.branchCount.length; i++) {
        this.labels[i] = this.branchCount[i].Property_Status;
        this.data[i] = this.branchCount[i].No_of_Property;
        // $scope.data.push($scope.colorpie[i].color);
      }
      console.log(this.labels);
      console.log(this.data);

      sourcearray = [
        {
          data: this.data,
          backgroundColor: ['rgb(16, 99, 16)', 'rgb(68, 49, 9)', 'rgb(98, 89, 6)'],
        }]
      if (this.sourcechart) {
        // this.sourcechart.destroy();
      }
      this.sourcechart = new Chart(this.sourcecanvas1.nativeElement, {
        type: 'bar',
        data: {
          labels: this.labels,
          datasets: sourcearray,
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              ticks: {
                fontSize: 10
              }
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true,
                display: true,
                labelString: window.localStorage['TUM_BRANCH_CODE'],

              }
            }]
          },
          tooltips: {

            callbacks: {
              title: function (tooltipItem, data) {
                return data['labels'][tooltipItem[0]['index']];
              },
              label: function (tooltipItem, data) {
                return "Target : " + data['datasets'][0]['data'][tooltipItem['index']];
              },

            },
          },
        }
      });
    }, error => {
    });
  }

  getToBevaccantChart() {
    let data = {
      functionId: this.functionID ? this.functionID : 0,
      branchId: this.branch_id ? this.branch_id : 0,
      user_id: this.userID ? this.userID : 0,
    };

    var sourcearray: any = [];
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'tobevaccant?strfunction=' + data.functionId + '&branch=' + data.branchId + '&userid=' + data.user_id, {
      headers: options,
    }).subscribe((resp: any) => {
      console.log(resp)
      debugger
      this.tovaccantchartcount = resp;

      console.log("ToBeVaccant", this.tovaccantchartcount);
      this.labels = [];
      this.data = [];
      for (var i = 0; i < this.tovaccantchartcount.length; i++) {
        this.labels[i] = this.tovaccantchartcount[i].Days;
        this.data[i] = this.tovaccantchartcount[i].Count;
        // $scope.data.push($scope.colorpie[i].color);
      }
      console.log(this.labels);
      console.log(this.data);

      sourcearray = [
        {

          data: this.data,
          backgroundColor: ['rgba(253,180,92,1)', 'rgba(148,159,177,1)', 'rgba(77,83,96,1)', 'rgba(103,16,103,1)', 'rgba(165,131,134,1)', '#FF4500', '#800000', '#00BFFF ',],


        }]
      if (this.sourcechart1) {
        // this.sourcechart1.destroy();
      }
      this.sourcechart1 = new Chart(this.sourcecanvas3.nativeElement, {

        type: 'bar',

        data: {
          labels: this.labels,
          datasets: sourcearray,

        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              ticks: {
                fontSize: 10
              }
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true,
                display: true,
                labelString: window.localStorage['TUM_BRANCH_CODE'],

              }
            }]
          },
          tooltips: {

            callbacks: {
              title: function (tooltipItem, data) {
                return data['labels'][tooltipItem[0]['index']];
              },
              label: function (tooltipItem, data) {
                return "Target" + " : " + data['datasets'][0]['data'][tooltipItem['index']];
              },

            },



          },
        }

      });

    }, error => {


    });

  }

  issueStatus() {

    let data = {
      functionId: this.functionID ? this.functionID : 0,
      branchId: this.branch_id ? this.branch_id : 0,
      user_id: this.userID ? this.userID : 0,
    }

    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'issuestatus?strfunction=' + data.functionId + '&branch=' + data.branchId + '&userid=' + data.user_id, {
      // this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'issuestatus?' + this.functionID + '/' + this.branchId + '/' + this.userID,{
      headers: options
    }).subscribe((resp: any) => {
      console.log(resp)
      // this.dataStatus = resp;
      this.dataStatus1 = resp;
      this.dataStatus  = this.dataStatus1;

      console.log(this.dataStatus);

      for (var i = 0; i < this.dataStatus1.length; i++) {
        this.issueDesc = this.dataStatus1[i].issuedescription;
        this.issue_status = this.dataStatus1[i].status;
        localStorage.setItem("status", this.issue_status);
        this.status = localStorage.getItem("status")
      };

      console.log(this.issue_status);

      console.log(this.issueDesc);
    })
  }
  private generateItems() {
    const count = this.dataStatus.length + 1;
    for (let i = 0; i < 50; i++) {
      this.dataStatus.push(`Item ${count + i}`);
    }
  }

  onIonInfinite(ev: any) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  onChange(value:any, ev:any){

    console.log(value,ev)
    if(value == 'New' ) {
      // this.checkedNew = true;
      // this.checkedPending = false;
      // this.checkedCompleted = false;
      debugger
      this.dataStatus =  this.dataStatus1.filter((x: any) => {
        debugger
         if( x.status == 'New') {
          return x;
          }
      });
      console.log(this.dataStatus)
    }
    else if(value == 'Pending' ) {
      debugger
      // this.checkedPending = true;
      // this.checkedNew = false;
      // this.checkedCompleted = false;
      this.dataStatus =  this.dataStatus1.filter((x: any) => {
        if( x.status == 'Pending') {
         return x;
         }
     })
    }
    else if(value == 'Completed' ) {
      debugger
      // this.checkedCompleted = true;
      // this.checkedNew = false;
      // this.checkedPending = false;
      this.dataStatus =  this.dataStatus1.filter((x: any) => {
        if( x.status == 'Completed') {
         return x;
         }
     })
    }

  }
  gotoCustomer() {
    this.router.navigate(['customer-property-details']);
  }
  gotoAdditional() {
    this.router.navigate(['fm-additional-page']);
  }
}
