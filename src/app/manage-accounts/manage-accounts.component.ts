import { Component, OnInit } from '@angular/core';
import { JwthelperService } from '../JwtServices/jwthelper.service';
import { AccountService } from '../Services/account.service';

@Component({
  selector: 'app-manage-accounts',
  templateUrl: './manage-accounts.component.html',
  styleUrls: ['./manage-accounts.component.css']
})
export class ManageAccountsComponent implements OnInit {
  isUser: boolean =true;
  isAdmin :boolean = false;
  isEmployee : boolean =false;
  role :string ="USER";
  jwt :any = localStorage.getItem("jwt");
  Accounts :any;
  AccountReqs:any;
  Branches :any;
  totalBalance : any =0;
  pin:string="";
  ifsc:string="";
  username :string ="";
  accountQuery :string="";
  searchError:string="";
  branchSearch:string ="";

  createAccountWindow:boolean=false;
  accountCreationMsg :string ="";

  constructor(private jwtservice : JwthelperService, private accountService :AccountService) {}

  ngOnInit(): void {
      this.jwt =localStorage.getItem('jwt');
      this.username =this.jwtservice.getClaim(this.jwt,"Username")
      this.role =  this.jwtservice.getClaim(this.jwt,"Role");
      this.isUser = this.role =="USER";
      this.isEmployee = this.role =="EMPLOYEE";
      this.isAdmin = this.role =="ADMIN";
      if(this.isUser)this.getaccounts(this.username);
      if(this.isEmployee)this.getAccountReqs("",50);
  }

  toogleCreateAccountWindow(){
    //console.log("toogled")
    this.accountCreationMsg ="";
    this.createAccountWindow =!this.createAccountWindow;
  }

  async getaccounts( value :string){
    await this.accountService.getAccounts({"username":value}).then(response =>{
     this.Accounts =response.data;
     for(let i =0;i<this.Accounts.length;i++){
       this.totalBalance += this.Accounts[i]['balance'];
     }
    }) 

 }

 async searchAccount(){
  try{

      await this.accountService.getAccounts({"account_id":this.accountQuery}).then(response =>{
        this.searchError="";
        this.AccountReqs =response.data; 
       }) 
  }catch(e){
    this.searchError="Account Not Found!";
  } 
}

async approveAccount(id:number){

    await this.accountService.approveAccount(id).then(response =>{ 
      for(let i =0;i<this.AccountReqs.length;i++){
        if(this.AccountReqs[i]['id']==id){
          this.AccountReqs.splice(i,1);
        }
      }
    }) 
 
}

  
  async getAccountReqs(ifsc:string,count:number){
    await this.accountService.getAccountReq(ifsc,count).then(response=>{
      this.AccountReqs =response.data;
    })

    this.AccountReqs.sort((a: { [x: string]: number; },b: { [x: string]: number; })=>(a["creationdate"] >b["creationdate"] ? -1:1))
  
    if(this.AccountReqs.length>4){
      this.AccountReqs.splice(4,this.AccountReqs.length-4)
    }

    //console.log(this.AccountReqs)
  
  }

  async getBranches( ){

      await this.accountService.getBranches(this.branchSearch,-1).then(response =>{ 
        this.Branches= response.data;
        console.log(this.Branches);
      });
      
  }

  async requestAccount(ifsc:string){
    await this.accountService.requestAccount(this.username,ifsc).then(response=>{
      if(response.status==200){
        this.pin =response.data;
        this.accountCreationMsg ="";
        this.toogleCreateAccountWindow();
        this.getaccounts(this.username);
      }else{
        this.accountCreationMsg ="Account creation failed!";
      }
    })

  }

}
