import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import axios from 'axios';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class JwthelperService {
  private jwtHelper : JwtHelperService;

  constructor( ) {
    this.jwtHelper =new JwtHelperService();
   }

  public  validateJwt(){

    if(localStorage.getItem("jwt")==null || localStorage.getItem("jwt")=="" ){
      return false;
    }

    const url ="http://localhost:6767/check/jwt";
    const data ={
        "data":localStorage.getItem("jwt")
    }

    const config = { 'content-type': 'application/json' };

    try{
       axios.post(url,data,{headers:config}).then(response  =>{
        console.log(response.data=="valid");
        return response.data=="valid";
      });
    }
    catch(e){
      return false;
    }
    

    return false;
  }

  public decodeToken(token: string): any {
    return this.jwtHelper.decodeToken(token);
  }

  public getClaim(token: string, claimKey: string): any {
    const decodedToken = this.decodeToken(token);
    return decodedToken ? decodedToken[claimKey] : null;
  }

}
