import { Component, OnInit } from '@angular/core';
import { JwthelperService } from '../JwtServices/jwthelper.service';
import { UserService } from '../Services/user.service';
@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  name :string ="";address :string ="";pincode : string ="";dateOfBirth : Date = new Date();phNumber :string ="";
    password : string ="";confirmPassword :string ="";email : string ="";pan:string ="";

    successdisplay :string ="hidden";
    token :string="";

    emailMsg:string="";
    panMsg:string="";
    dobMsg :string="" ;
    phNumberMsg :string="";
    nameMsg:string ="";
    pincodeMsg:string="";
    addressMsg : string ="";
    passwordMsg :string="";
    confirmPasswordMsg :string="";
    EditButtonTxt:string ="Edit";
    Disabled :boolean =true;

  constructor(private UserService: UserService,private JwtService : JwthelperService) { }

  async ngOnInit() {
    await this.LoadData();
  }

  async LoadData(){
    this.token = await this.JwtService.getClaim(""+localStorage.getItem('jwt'),"Username");
    await this.UserService.LoadData(this.token).then(res=>{
       // console.log(res.data);
        this.phNumber =res.data['phonenumber'];
        this.email =res.data['email'];
        this.pan =res.data['pan'];
        this.address =res.data['address'];
        this.pincode =res.data['pincode'];
        this.dateOfBirth =res.data['dob'];
        this.name =res.data['fullname'];
      });
      
  }

  

  validateInput() :boolean {

     this.chkEmail();
     this.chkPan();
     this.chkPhone();
      
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
    if(this.confirmPassword != this.password){
      this.confirmPasswordMsg = "passwords don`t match!";
    }
    else this.confirmPasswordMsg ="";

    return true;
  }

  async chkEmail(){
    if(this.email.length<9){
      this.emailMsg="Please enter a valid email!"
    }
    else{
      await this.UserService.chkUsername(this.email).then(response=>{
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
      await this.UserService.chkUsername(this.phNumber).then(response=>{
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
      await this.UserService.chkUsername(this.pan).then(response=>{
          if(response.data=="inUse"){
            this.panMsg="PAN already in Use!"     
          }else {this.panMsg="";}
      });
    }
    
  }


  async Update(){

    if( this.validateInput()==false)return;
    console.log("Updating...");

    await this.UserService.Update(this.name,this.email,this.phNumber,this.pan, this.address,this.pincode,this.dateOfBirth).then(response =>{
      console.log("Updated");
      
      this.Disabled=true;

    });




  }


  ToogleUpdateButton(){
    if(this.EditButtonTxt=="Edit"){
      this.EditButtonTxt ="Update";
      this.Disabled =false;
      return;
    }
    else{
      this.Update();
      return;
    }
  }

}
