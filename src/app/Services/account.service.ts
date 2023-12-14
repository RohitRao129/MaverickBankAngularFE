import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor() { }

  async getAccounts(data:any){
    if(data["account_id"]==""){
      data["account_id"]=-1;
    }
    const url ="http://localhost:6767/account/get";
    
    const config = { 'content-type': 'application/json' ,
      Authorization: `Bearer ${localStorage.getItem('jwt')}` 
  };

    return  await axios.post(url,data,{headers:config});

  }

  async requestAccount(username :string,ifsc:string){

    const url ="http://localhost:6767/account/create";
    const data ={
      "username": username,
      "ifsc": ifsc
    }

    const config = { 'content-type': 'application/json' ,
      Authorization: `Bearer ${localStorage.getItem('jwt')}` 
  };

    return  await axios.post(url,data,{headers:config});

  }

  async getAccountReq(ifsc:string,count:number){

    const url ="http://localhost:6767/account/getApproveRequests";
    const data ={
      "count": count,
      "ifsc":ifsc
    }

    const config = { 'content-type': 'application/json' ,
        Authorization: `Bearer ${localStorage.getItem('jwt')}` 
    };

    return  await axios.post(url,data,{headers:config});

  }

  async approveAccount(accountid:number){
    const url ="http://localhost:6767/account/approve";
    const data ={
      "account_id":accountid
    }

    const config = { 'content-type': 'application/json' ,
        Authorization: `Bearer ${localStorage.getItem('jwt')}` 
    };

    return  await axios.put(url,data,{headers:config});
  }

  async getBranches( value :string,count:number){

    const url ="http://localhost:6767/branch/get";
    const data ={
      "city": value,
      "pincode":value,
      "ifsc":value,
      "count":count
    }

    const config = { 'content-type': 'application/json' ,
      Authorization: `Bearer ${localStorage.getItem('jwt')}` 
  };

    return  await axios.post(url,data,{headers:config});

  }

  

}
