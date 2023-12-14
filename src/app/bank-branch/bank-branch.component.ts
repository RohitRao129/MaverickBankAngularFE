import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwthelperService } from '../JwtServices/jwthelper.service';
import { BranchService } from '../Services/branch.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-bank-branch',
  templateUrl: './bank-branch.component.html',
  styleUrls: ['./bank-branch.component.css']
})
export class BankBranchComponent implements OnInit {
  isUser: boolean =true;
  isAdmin :boolean = false;
  isEmployee : boolean =false;
  branchAddedMsg :any;
  role :string ="USER";
  jwt :any = localStorage.getItem("jwt");
  Branches :any;
  Employees:any;
  Admins:any;
  newBranchCity:any;
  newBranchPinCode:any;
  TransferBranchIfsc:string ="";

  branchSearchQuery:any;
  searched:boolean =false;

  totalBalance : any =0;

  constructor(private branchService:BranchService, private userService :UserService,private jwtservice : JwthelperService) {}

  ngOnInit(): void {
      this.jwt =localStorage.getItem('jwt');
      this.role =  this.jwtservice.getClaim(this.jwt,"Role");
      this.isUser = this.role =="USER";
      this.isEmployee = this.role =="EMPLOYEE";
      this.isAdmin = this.role =="ADMIN";
      if(this.isAdmin)this.getBranches();
  }

  getBranches(){
    this.branchService.getBranches(10).then(response=>{
      this.Branches =response.data;
      //console.log(this.Branches);
      this.searched=false;
    })
  }

  searchBranch() {
    this.branchService.searchBranches({"city":this.branchSearchQuery,"pincode":this.branchSearchQuery,"ifsc":this.branchSearchQuery}).then(response=>{
      this.Branches =response.data;
      //console.log(this.Branches);
      this.searched=true;
    })
  }

  addBranch(){
    this.branchService.addBranch({"city":this.newBranchCity,"pincode":this.newBranchPinCode}).then(response =>{
      //console.log("new branchCreate successfully!");
      if(response.status==200){
        this.branchAddedMsg =response.data;

        let timer: ReturnType<typeof setTimeout> = setTimeout(() => {  this.branchAddedMsg =""; },2000);

        clearTimeout(timer);
      }
      this.newBranchCity="";
      this.newBranchPinCode="";
      this.getBranches();
    })
  }

  deleteBranch(ifsc:any){
    this.branchService.searchBranches({"ifsc":this.TransferBranchIfsc}).then(res=>{
        if(res.status!=200 || res.data.length<1){
            console.log("transfer branch is not found!");
        return;
        }
        this.branchService.deleteBranch({'ifsc':ifsc,"transferifsc":this.TransferBranchIfsc}).then(response=>{
          if(response.data=="Branch removed successfully"){
            for(let i=0;i<this.Branches.length;i++){
              if(this.Branches[i]['ifsc']==ifsc){
                this.Branches.splice(i,1);
              }
            }
            this.TransferBranchIfsc="";
          }
          
          console.log(response.data);
          this.getBranches();
      })
    })
    
  }


  


}
