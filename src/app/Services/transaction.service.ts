import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor() { }

  async getAccountTransactions(accountId :any){

    const url ="http://localhost:6767/transaction/getAccountTransactions";
    const data ={
      "owner": accountId,
    }

    const config = { 'content-type': 'application/json' ,
        Authorization: `Bearer ${localStorage.getItem('jwt')}` 
    };

    return  await axios.post(url,data,{headers:config});

  }

  async getUserTransactions(username :any){

    const url ="http://localhost:6767/transaction/getUserTransactions";
    const data ={
      "username": username,
    }

    const config = { 'content-type': 'application/json' ,
        Authorization: `Bearer ${localStorage.getItem('jwt')}` 
    };

    return  await axios.post(url,data,{headers:config});

  }

  async getAllTransactions(){

    const url ="http://localhost:6767/transaction/getAccountTransactions";
    
    const config = { 'content-type': 'application/json' ,
        Authorization: `Bearer ${localStorage.getItem('jwt')}` 
    };

    return  await axios.get(url,{headers:config});

  }

  async getTransactions(transactionId :any){

    const url ="http://localhost:6767/transaction/getAccountTransactions";
    const data ={
      "owner": transactionId,
    }

    const config = { 'content-type': 'application/json' ,
        Authorization: `Bearer ${localStorage.getItem('jwt')}` 
    };

    return  await axios.post(url,data,{headers:config});

  }

  async Deposit(owner :any,amount:any){

    const url ="http://localhost:6767/transaction/deposit";
    const data ={
      "owner": owner,
      "amount" :amount
    }

    const config = { 'content-type': 'application/json' ,
        Authorization: `Bearer ${localStorage.getItem('jwt')}` 
    };

    return  await axios.post(url,data,{headers:config});

  }

  async withdraw(owner :any,amount:any,pin:any){

    const url ="http://localhost:6767/transaction/withdraw";
    const data ={
      "owner": owner,
      "amount" :amount,
      "pin":pin
    }

    const config = { 'content-type': 'application/json' ,
        Authorization: `Bearer ${localStorage.getItem('jwt')}` 
    };

    return  await axios.post(url,data,{headers:config});

  }


  async Send(owner :any,amount:any,pin:any,receiver:any){

    const url ="http://localhost:6767/transaction/send";
    const data ={
      "owner": owner,
      "amount" :amount,
      "pin":pin,
      "receiver" :receiver
    }

    const config = { 'content-type': 'application/json' ,
        Authorization: `Bearer ${localStorage.getItem('jwt')}` 
    };

    return  await axios.post(url,data,{headers:config});

  }

}
