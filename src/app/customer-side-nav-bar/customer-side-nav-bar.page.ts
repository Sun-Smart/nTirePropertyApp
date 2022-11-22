import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-side-nav-bar',
  templateUrl: './customer-side-nav-bar.page.html',
  styleUrls: ['./customer-side-nav-bar.page.scss'],
})
export class CustomerSideNavBarPage implements OnInit {
  username: string | null;

  constructor(private router:Router) {
    this.username = localStorage.getItem('TUM_USER_NAME');
   }

  ngOnInit() {
  };

  dashboard(){
    this.router.navigate(['/dashboard']);
  };
  cutomer(){
    this.router.navigate(['/customer-property-details']);
  };
  myTask(){
    this.router.navigate(['/fm-my-task']);
  };
  additionalCharges(){
    this.router.navigate(['fm-additional-page']);
  };
  quickReciept(){
    this.router.navigate(['/fm-quick-receipt']);
  };
  transaction(){
    this.router.navigate(['/fm-transaction']);
  };
  propertyList(){
    this.router.navigate(['/fm-property-list']);
  };
  paymentDetails(){
    this.router.navigate(['/fm-payment-details']);
  };
  issueLedger(){
    this.router.navigate(['/fm-issue-ledger']);
  };
  documentExpiryReport(){
    this.router.navigate(['/fm-document-expiry-report']);
  };
  prpertyContactList(){
    this.router.navigate(['/fm-propety-contact-list']);
  };
  logout(){
    this.router.navigate(['/login-page']);
  };

  userDetails = [
    {
      username : "Sundar",
      Emp_id : "E0001",
      property_name : "Sunsmart Technology",
      location : "Chennai"
    }
  ]
}
