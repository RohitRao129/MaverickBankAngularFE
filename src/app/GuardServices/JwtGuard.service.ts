import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwthelperService } from '../JwtServices/jwthelper.service';
import axios from 'axios';

@Injectable({
  providedIn: 'root'}
)
export class JwtGuard implements CanActivate{

  constructor(private router :Router,private jwtService :JwthelperService) { }

  private isJwtValid : boolean =false;

  async canActivate() {

      if(localStorage.getItem("jwt")==null || localStorage.getItem("jwt")=="" ){
        this.router.navigate(["/login"]);
        return false;
      }
  
            const url ="http://localhost:6767/check/jwt";
            const data ={
                "data":localStorage.getItem("jwt")
            }
        
            const config = { 'content-type': 'application/json' };
        
            try{
                await axios.post(url,data,{headers:config}).then(response  =>{
                this.isJwtValid= response.data=="valid";
              });
            }
            catch(e){
              this.isJwtValid =false;
              return false;
            }


    if(this.isJwtValid ){
      return true;
    }  
    else{
      this.router.navigate(["/login"]);
      return false;
    }
  } 

}
