import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { JwthelperService } from '../JwtServices/jwthelper.service';
import { AccountService } from '../Services/account.service';
import { LoanService } from '../Services/loan.service';
import { TransactionService } from '../Services/transaction.service';

@Component({
  selector: 'app-manage-loans',
  templateUrl: './manage-loans.component.html',
  styleUrls: ['./manage-loans.component.css']
})
export class ManageLoansComponent implements OnInit {
  isUser: boolean =true;
  isAdmin :boolean = false;
  isEmployee : boolean =false;
  private role :string ="USER";
  private jwt :any = localStorage.getItem("jwt");
  Accounts:any;
  SelectedAccount:any=null;
  pin:string="";
  username :string ="";
  amount :any;
  loanType:any;
  errorMsg:any;

  ApprovedLoans:any;
  UnapprovedLoans:any;
  SelectAccountMsg :any="Please Select an account!";

  term:any;
  interest:any;
  template:any=null;

  newLoanWindow:any =false;
  approveloanWindow:any=false;

  constructor(private loanService :LoanService ,private jwtservice : JwthelperService, private accountService: AccountService,private transactionService :TransactionService) {}

  ngOnInit(): void {
      this.jwt =localStorage.getItem('jwt');
      this.username =this.jwtservice.getClaim(this.jwt,"Username")
      this.role =  this.jwtservice.getClaim(this.jwt,"Role");
      this.isUser = this.role =="USER";
      this.isEmployee = this.role =="EMPLOYEE";
      this.isAdmin = this.role =="ADMIN";
      
      if(this.isUser==true){
        this.getUserApprovedLoans();
        this.getUserUnApprovedLoans();
      }

      if(this.isEmployee==true){
        this.getLoanRequests();
      }
      
  }

  toogleNewLoanWindow(){
    this.getAccounts(this.username);
    this.errorMsg="";
    this.SelectedAccount=null;
    this.SelectAccountMsg="Select an Account";
    this.template=null;
    this.amount=0;
    this.newLoanWindow =!this.newLoanWindow;
  }

  toogleApproveLoanWindow(){
    this.approveloanWindow =!this.approveloanWindow;
  }

  async getLoanRequests(){
    await this.loanService.getLoanRequest({}).then(response=>{
      this.UnapprovedLoans =response.data;
      console.log(this.UnapprovedLoans);
    })
  }

  async getUserApprovedLoans() {
    await this.loanService.getUserLoan({"username":this.username,"approved":true}).then(response=>{
      this.ApprovedLoans =response.data;
    })
  }


  async getUserUnApprovedLoans() {
    
    await this.loanService.getUserLoan({"username":this.username,"approved":false}).then(response=>{
      //console.log("Unaproved:")
      this.UnapprovedLoans =response.data;
      //console.log(this.UnapprovedLoans);
    })
  }

  async CancelLoanReq(id:any){
    this.loanService.deleteLoanReq({"loanrequestid":id}).then(response=>{
      for(let i =0;i<this.UnapprovedLoans.length;i++){
        if(this.UnapprovedLoans[i]['id']==id){
          this.UnapprovedLoans.splice(i,1);
        }
      }
    })
  }

  selectAccount(id:any){
    this.SelectedAccount = id;
    this.SelectAccountMsg=`Selected Account = ${id}`;
  }


  async NewLoanReq(){
    if(this.template==null || this.amount<100 || this.SelectedAccount==null || this.loanType==null){
      this.errorMsg="please input the required details";
      return;
    }
    this.errorMsg="";
    if(this.template==1){this.term =10;this.interest =6;}
    if(this.template==2){this.term =5;this.interest =9;}
    if(this.template==3){this.term =2;this.interest =12;}
    await this.loanService.requestLoan({"amount":this.amount,"type":this.loanType,"term":this.term,"interest":this.interest,"accountid":this.SelectedAccount})
    this.getUserUnApprovedLoans();
    this.toogleNewLoanWindow();
  }

  async getAccounts( value :string){
    await this.accountService.getAccounts({"username":value,"approved":true}).then(response =>{
     this.Accounts =response.data;

     this.Accounts.sort((a: { [x: string]: number; },b: { [x: string]: number; })=>(a["balance"] >b["balance"] ? -1:1))
    }) 

 }


}
