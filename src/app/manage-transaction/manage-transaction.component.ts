import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwthelperService } from '../JwtServices/jwthelper.service';
import { AccountService } from '../Services/account.service';
import { TransactionService } from '../Services/transaction.service';

@Component({
  selector: 'app-manage-transaction',
  templateUrl: './manage-transaction.component.html',
  styleUrls: ['./manage-transaction.component.css']
})
export class ManageTransactionComponent implements OnInit {
   isUser: boolean =true;
   isAdmin :boolean = false;
   isEmployee : boolean =false;
  private role :string ="USER";
  private jwt :any = localStorage.getItem("jwt");
   Accounts :any;
   Branches :any;
   totalBalance : any =0;
   pin:string="";
   ifsc:string="";
   username :string ="";
   accountQuery :string="";
   SelectedAccount:any=null;
   amount :any;
   Transactions:any;
   receiver :any;
   errorMsg:any;
   selectMsg:any;
   ReceiverMsg :any ="Enter Valid receiver!";


   withdrawWindow:any =false;
   sendWindow:any =false;


  constructor(private router :Router ,private jwtservice : JwthelperService, private accountService: AccountService,private transactionService :TransactionService) {}

  ngOnInit(): void {
      this.jwt =localStorage.getItem('jwt');
      this.username =this.jwtservice.getClaim(this.jwt,"Username")
      this.role =  this.jwtservice.getClaim(this.jwt,"Role");
      this.isUser = this.role =="USER";
      this.isEmployee = this.role =="EMPLOYEE";
      this.isAdmin = this.role =="ADMIN";
      this.getaccounts(this.username);
      this.getTransactions();
  }

  async checkReceiver(){
    await this.accountService.getAccounts({"account_id":this.receiver}).then(response =>{
      
      if(response.data!=''){
        console.log(response.data);
        this.ReceiverMsg =response.data[0]['accountOwners'][0]['fullname'];
      }
      else{
        this.ReceiverMsg="Enter Valid receiver!";
      }
      
     }) 
  }

  async getaccounts( value :string){
    await this.accountService.getAccounts({"username":value,"approved":true}).then(response =>{
     this.Accounts =response.data;

     this.Accounts.sort((a: { [x: string]: number; },b: { [x: string]: number; })=>(a["balance"] >b["balance"] ? -1:1))
    
     for(let i =0;i<this.Accounts.length;i++){
       this.totalBalance += this.Accounts[i]['balance'];
     }
    }) 

 }

 
 

 toogleWithdraw(){
  if(this.SelectedAccount!=null){this.withdrawWindow =!this.withdrawWindow;}
  else{
    this.selectMsg="select an account!";
  }
 }

 toogleSend(){
  if(this.SelectedAccount!=null) {this.sendWindow =!this.sendWindow;}
  else{
    this.selectMsg="select an account!";
  }
 }

 selectAccount(owner :any){
  this.SelectedAccount =owner;
  this.selectMsg="";
  this.getTransactions();
 }

 async Withdraw(){
  await this.transactionService.withdraw(this.SelectedAccount,this.amount,this.pin).then(response=>{
    
    if(response.data=="Successfull"){
      this.getaccounts(this.username);
      this.toogleWithdraw();
      this.errorMsg="";
    }
    else{
      this.errorMsg=response.data;
    }
  
  })
 }

 async Send(){

  if(this.ReceiverMsg=="Enter Valid receiver!"){
    this.errorMsg ="Selecet a valid receiver!";
    return;
  }

  await this.transactionService.Send(this.SelectedAccount,this.amount,this.pin,this.receiver).then(response=>{
    if(response.data=="Successfull"){
      this.getaccounts(this.username);
      this.toogleSend();
      this.errorMsg="";
    }
    else{
      this.errorMsg=response.data;
    }
  })
 }

 async getTransactions(){

  if(this.SelectedAccount==null || this.SelectedAccount==""){
    await this.transactionService.getUserTransactions(this.username).then(response =>{ 
      this.Transactions= response.data;
    });
  }
  else{
    await this.transactionService.getTransactions(this.SelectedAccount).then(response =>{ 
      this.Transactions= response.data;
    });
  }
 }

}
