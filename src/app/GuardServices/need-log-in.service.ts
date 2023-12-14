import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwthelperService } from '../JwtServices/jwthelper.service';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class NeedLoginCheck {

  constructor(private router :Router,private jwtService :JwthelperService) { }

  private isJwtValid : boolean =false;

  async canActivate(){
    if(localStorage.getItem("jwt")==null || localStorage.getItem("jwt")=="" ){
      return true;
    }

          const url ="http://localhost:6767/check/jwt";
          const data ={
              "data":localStorage.getItem("jwt")
          }

          const config = { 'content-type': 'application/json' };

          try{
          await  axios.post(url,data,{headers:config}).then(response  =>{
              this.isJwtValid= response.data=="valid";
            });
          }
          catch(e){
            return true
          }

          
        
    if(this.isJwtValid ){
      this.router.navigate(["/home"]);
      return false;
    }  
    else{
      return true;
    }
}
}
