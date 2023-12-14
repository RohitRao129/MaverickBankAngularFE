import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor() { }

  async getUserLoan(data :any){

    const url ="http://localhost:6767/loan/getUserLoan";

    const config = { 'content-type': 'application/json' ,
        Authorization: `Bearer ${localStorage.getItem('jwt')}` 
    };

    return  await axios.post(url,data,{headers:config});

  }

  async getAccountLoan(data :any){

    const url ="http://localhost:6767/loan/getAccountLoan";

    const config = { 'content-type': 'application/json' ,
        Authorization: `Bearer ${localStorage.getItem('jwt')}` 
    };

    return  await axios.post(url,data,{headers:config});

  }
  
  async getLoan(data :any){

    const url ="http://localhost:6767/loan/getLoan";

    const config = { 'content-type': 'application/json' ,
        Authorization: `Bearer ${localStorage.getItem('jwt')}` 
    };

    return  await axios.post(url,data,{headers:config});

  }
  

  async getLoanRequest(data :any){

    const url ="http://localhost:6767/loan/getLoanRequest";

    const config = { 'content-type': 'application/json' ,
        Authorization: `Bearer ${localStorage.getItem('jwt')}` 
    };

    return  await axios.post(url,data,{headers:config});

  }


  async deleteLoanReq(data :any){

    const url ="http://localhost:6767/loan/deleteLoanRequest";

    const config = { 'content-type': 'application/json' ,
        Authorization: `Bearer ${localStorage.getItem('jwt')}` 
    };

    return  await axios.put(url,data,{headers:config});

  }

  async requestLoan(data :any){

    const url ="http://localhost:6767/loan/request";

    const config = { 'content-type': 'application/json' ,
        Authorization: `Bearer ${localStorage.getItem('jwt')}` 
    };

    return  await axios.post(url,data,{headers:config});

  }

  async approveLoan(data :any){

    const url ="http://localhost:6767/loan/approve";

    const config = { 'content-type': 'application/json' ,
        Authorization: `Bearer ${localStorage.getItem('jwt')}` 
    };

    return  await axios.post(url,data,{headers:config});

  }
  
  async getLoanReq(data :any){

    const url ="http://localhost:6767/loan/getLoanRequest";

    const config = { 'content-type': 'application/json' ,
        Authorization: `Bearer ${localStorage.getItem('jwt')}` 
    };

    return  await axios.post(url,data,{headers:config});

  }

}
