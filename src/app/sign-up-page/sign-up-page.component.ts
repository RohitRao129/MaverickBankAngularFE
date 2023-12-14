  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
  import { SignUpServiceService } from './sign-up-service.service';
  


  @Component({
    selector: 'app-sign-up-page',
    templateUrl: './sign-up-page.component.html',
    styleUrl: './sign-up-page.component.css',
    
  })
  export class SignUpPageComponent implements OnInit{

    name :string ="";address :string ="";pincode : string ="";dateOfBirth : Date = new Date();phNumber :string ="";
    password : string ="";confirmPassword :string ="";email : string ="";pan:string ="";

    infoForm:string ="hidden";
    credForm :string="";
    successdisplay :string ="hidden";

    emailMsg:string="";
    panMsg:string="";
    dobMsg :string="" ;
    phNumberMsg :string="";
    nameMsg:string ="";
    pincodeMsg:string="";
    addressMsg : string ="";
    passwordMsg :string="";
    confirmPasswordMsg :string="";


    constructor( private router :Router,private signUpservice : SignUpServiceService){}
    ngOnInit(): void {}

    validateInput() :boolean {
      
      if(this.name.length <6 || this.name.length>24 ){
        this.nameMsg = "Enter valid NAME!"
          return false;
      }
      else this.nameMsg ="";

      if(this.address.length <10){
        this.addressMsg = "Enter valid address with landmark,city and state"
        return false;
      }
      else this.addressMsg ="";

      if(this.pincode.length !=6){
        this.pincodeMsg = "Enter valid pin Code!"
        return false;
      }
      else this.pincodeMsg ="";

      return true;
    }

    async chkEmail(){
      if(this.email.length<9){
        this.emailMsg="Please enter a valid email!"
      }
      else{
        await this.signUpservice.chkUsername(this.email).then(response=>{
          if(response.data=="inUse"){
              this.emailMsg ="Email already used!";
          }else {this.emailMsg="";}
        });
      }
      
    }
    async chkPhone(){

      if(this.phNumber.length!=10){
        this.phNumberMsg="Enter a 10 digit Phone Number"
      }
      else{
        await this.signUpservice.chkUsername(this.phNumber).then(response=>{
            if(response.data=="inUse"){
              this.phNumberMsg="Phone already in Use!"     
            }else {this.phNumberMsg="";}
        });
      }
      
    }
    async chkPan(){
      if(this.pan.length!=10){
        this.panMsg="Enter a 10 digit PAN"
      }
      else{
        await this.signUpservice.chkUsername(this.pan).then(response=>{
            if(response.data=="inUse"){
              this.panMsg="PAN already in Use!"     
            }else {this.panMsg="";}
        });
      }
      
    }

    async hideCreds(){
      await this.chkEmail();
      await this.chkPan();
      await this.chkPhone();

      if(this.confirmPassword != this.password){
        this.confirmPasswordMsg = "passwords don`t match!";
      }
      else this.confirmPasswordMsg ="";

      if(this.emailMsg=="" && this.panMsg=="" && this.phNumberMsg=="" && this.confirmPasswordMsg==""){
        this.infoForm="";
        this.credForm="hidden";
      }
      
    }

    showCreds(){
      this.credForm="";
      this.infoForm="hidden";
    }


    async handleSignUp(){

      if(this.validateInput()==false)return;

      await this.signUpservice.Register(this.name,this.email,this.phNumber,this.pan, this.address,this.pincode,this.password,this.dateOfBirth).then(response =>{
       
        if(response.data==="Success"){
          this.successdisplay ="";

          this.successdisplay ="";
          this.infoForm ="hidden";
          this.credForm ="hidden";
        
          setTimeout( () => {this.router.navigate(['/login']); }, 1000);
            
        }

      });




    }
  }
