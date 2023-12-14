import { Injectable } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SignUpServiceService {
  constructor() { }

  async Register(fullname:string,email :string,phonenumber:string,pan:string, address:string,pincode:string,password:string,dob:Date){

  const url = 'http://localhost:6767/auth/signUp';
	const data = { 
                "fullname":fullname,
                "email":email,
                "pan":pan,
                "phonenumber":phonenumber,
                "address":address,
                "pincode":pincode,
                "password":password,
                "dob":dob
              };
	// Specifying headers in the config object
	const config = { 'content-type': 'application/json' };

   return await axios.post(url,data, {headers: config})  ;
       
  }

  async chkUsername(username:string){
    const url = 'http://localhost:6767/check/username';
    const data = { 
                 "username":username
                };
    // Specifying headers in the config object
    const config = { 'content-type': 'application/json' };

    return await axios.post(url,data, {headers: config})  ;
  }

}
