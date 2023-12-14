import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { response } from 'express';
import { error } from 'node:console';
import { AppComponent } from '../app.component';
import { JwthelperService } from '../JwtServices/jwthelper.service';
import { LoginServiceService } from './login-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})

export class LoginPageComponent implements OnInit {
  userName :string ="";
  password :string ="";
  userNameMsg :string="";
  passwordMsg :string="";
  role :string="USER";
  loggedIn : boolean =false;

  constructor( private router :Router,private loginService :LoginServiceService,private Jwthelper: JwthelperService){}

  ngOnInit() :void {
  }

  handleLogin(){

     this.loginService.login(this.userName,this.password).then(response=>{
      if(response.status==400){
        this.userNameMsg="username not Found!"
      }
      if(response.status==401){
          this.passwordMsg="Wrong Password!";
      }else{this  .passwordMsg="";}

      
      if(response.status==200){
        localStorage.setItem("jwt",response.data);
        this.router.navigate(['home']);
      }

    }).catch(e =>{
      if(e.code =="ERR_BAD_REQUEST"){
        this.passwordMsg="Wrong Password!";
      }else{this  .passwordMsg="";}
      console.log(e );
    })
    
  }
  
}

