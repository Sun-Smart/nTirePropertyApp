import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Platform } from '@ionic/angular';
import { ViewEncapsulation } from '@angular/core';
import { IpaddressService } from '../fm-services/ipaddress.service';

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


  // @ViewChild('sourcecanvas1') sourcecanvas1: any;
  @ViewChild('sourcecanvas2') sourcecanvas2: any;
  // @ViewChild('sourcecanvas3') sourcecanvas3: any;
  usertype: any;
  accessToken: any;
  userID: any;
  functionID: any;
  issueDesc: any;
  branchlist: any;
  tovaccantchartcount: any[];
  branchId: any;
  getBID: any;
  branch_id: any;
  customerPaymentresult: any;
  labels: any = [];
  barchart: any;
  customerPaymenhtresult: any;
  // showCustomer: boolean | undefined;
  // showProperty: boolean | undefined;
  // showVacant: boolean | undefined;
  // showStatus: boolean | undefined;
  showCustomeractive: boolean = true;
  showVacantActive: boolean = false;
  showPropertyactive: boolean = false;
  showStatusActive: boolean = false;
  showCustomerNormal: boolean = false;
  showPropertynormal: boolean = true;
  showVacantnormal: boolean = true;
  showStatusnormal: boolean = true;

  constructor(private http: HttpClient,
    private platform: Platform,
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

    // this.issueStatus();
    this.customerPayment();
    // this.getBranchCountChart();
    // this.getEmployeeCountChart();
    // this.getToBevaccantChart();
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

  het() {
    alert('')
  }
  customerPayment = () => {
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
        this.barchart.destroy();
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

    this.showVacantActive = false;
    this.showVacantnormal = true;

    this.showStatusActive = false;
    this.showStatusnormal = true;
  }
  activeVacant() {
    this.showCustomeractive = false;
    this.showCustomerNormal = true;

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

    this.showPropertyactive = false;
    this.showPropertynormal = true;

    this.showVacantActive = false;
    this.showVacantnormal = true;

    this.showStatusActive = true;
    this.showStatusnormal = false;
  }
}
