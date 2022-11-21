import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IpaddressService {

  public ipaddress:any;
  ipaddress1: any;
  tokenlogin: any;
  getLoginLinkFM: any;
  serviceurllosFM: any;
  dynamicmenuFM: any;
  serviceurlProperty: any;

  constructor() {

    this.ipaddress = "https://demo.herbie.ai";
    this.ipaddress1 = "https://demo.herbie.ai";


    this.tokenlogin = "/nTireMobileCoreAPI/api";

    this.getLoginLinkFM = '/nTireMobileCoreAPIFM/api/Login';
    this.serviceurllosFM = "/los/LOS/";
    this.dynamicmenuFM = '/nTireMobileCoreAPI/api';

    this.serviceurlProperty = "/nTireMobileCoreAPIFM/api/Property/";
   }
}
