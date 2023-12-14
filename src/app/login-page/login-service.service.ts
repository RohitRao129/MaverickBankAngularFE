import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  constructor() { }

  async login(username :string , password:string){

    const url ="http://localhost:6767/auth/signIn";
    const data ={
      "username": username,
      "password":password
    }

    const config = { 'content-type': 'application/json' };

    return  await axios.post(url,data,{headers:config});

  }

}
