import { Component, OnInit } from '@angular/core';
import { JwthelperService } from '../JwtServices/jwthelper.service';
import { AccountService } from '../Services/account.service';
import { BranchService } from '../Services/branch.service';
import { LoanService } from '../Services/loan.service';
import { TransactionService } from '../Services/transaction.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: "./home-page.component.html",
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  isUser: boolean =true;
  isAdmin :boolean = false;
  isEmployee : boolean =false;
  role :string ="USER";
  jwt :any = localStorage.getItem("jwt");
  Accounts :any;
  Transactions:any;
  AccountReqs:any;
  LoanReqs:any;
  Branches :any;
  Employees:any;
  Admins:any;

  totalBalance : any =0;

  constructor(private userService : UserService ,private branchService:BranchService ,private loanService:LoanService ,private transactionService :TransactionService ,private accountService: AccountService, private jwtservice : JwthelperService) {}

  ngOnInit(): void {
      this.jwt =localStorage.getItem('jwt');
      this.role =  this.jwtservice.getClaim(this.jwt,"Role");
      this.isUser = this.role =="USER";
      this.isEmployee = this.role =="EMPLOYEE";
      this.isAdmin = this.role =="ADMIN";
      if(this.isUser)this.getaccount();
      if(this.isEmployee)this.getAccountReqs("",100);
      if(this.isAdmin)this.getBranches();
  }

  async getaccount(){
     this.accountService.getAccounts({"username": this.jwtservice.getClaim(this.jwt,"Username"),"approved":true}).then(response =>{
      this.Accounts =response.data;
      //console.log(this.Accounts)
     
      for(let i =0;i<this.Accounts.length;i++){
        this.totalBalance += this.Accounts[i]['balance'];
      }

      this.getTransactions();

      if(this.Accounts.length>4){
        this.Accounts.splice(4,this.Accounts.length-4)
      }
      
      
     }) 

  }

  async getTransactions(){

    for(let i =0;i<this.Accounts.length;i++){
      await this.transactionService.getTransactions(this.Accounts[i]['id']).then(response =>{ 
        
        if( response.status==200 &&(this.Transactions==null || ( response.data!=null && Object.keys(response.data).length>Object.keys(this.Transactions).length)) )
        {this.Transactions= response.data;}
      });


    }

    if(this.Transactions.length>4){
      this.Transactions.splice(4,this.Transactions.length-4)
    }

    //console.log(this.Transactions);
  }


  async getAccountReqs(ifsc:string,count:number){
    await this.accountService.getAccountReq(ifsc,count).then(response=>{
      this.AccountReqs =response.data;
    })

    this.AccountReqs.sort((a: { [x: string]: number; },b: { [x: string]: number; })=>(a["creationdate"] >b["creationdate"] ? -1:1))
  
    if(this.AccountReqs.length>4){
      this.AccountReqs.splice(4,this.AccountReqs.length-4)
    }

    console.log(this.AccountReqs)

    this.getLoanReqs();
  
  }


  async getLoanReqs(){
    await this.loanService.getLoanReq({}).then(response=>{
      this.LoanReqs =response.data;
    })

    
    if(this.LoanReqs.length>4){
      this.LoanReqs.splice(4,this.LoanReqs.length-4)
    }

    //console.log(this.LoanReqs)
  
  }


  async getBranches(){

      await this.branchService.getBranches(4).then(response =>{ 
        this.Branches= response.data;

        //console.log(this.Branches);

        if(this.Branches.length>4){
          this.Branches.splice(4,this.Branches.length-4)
        }

      });
      
      this.getEmpsAndAdmins();
      
  }

  async getEmpsAndAdmins(){

    await this.userService.getEmployeeNAdmin(2,"ADMIN").then(response =>{ 
      this.Admins= response.data;
      //console.log(this.Admins);
    });

    await this.userService.getEmployeeNAdmin(2,"EMPLOYEE").then(response =>{ 
      this.Employees= response.data;
      //console.log(this.Employees);
    });

}

}

