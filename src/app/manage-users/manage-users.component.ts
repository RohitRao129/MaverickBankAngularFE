import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  searchQuery:any =null;
  searchResult:any =null;
  searchMsg:string ="";
  responseMsg :any="";

  private newRole:any ="USER";
  constructor(private userService :UserService) { }

  ngOnInit(): void {
  }

  async FetchUser(){
    await this.userService.LoadData(this.searchQuery).then(response=>{
        this.searchResult =response.data;
        //console.log(this.searchResult );
      })
  }

  async Promote(){
      if(this.searchResult['role']=="USER")this.newRole="EMPLOYEE";
      if(this.searchResult['role']=="EMPLOYEE")this.newRole="ADMIN";

      await this.userService.UpdateRole(this.searchResult['phonenumber'],this.newRole).then(response=>{
        this.responseMsg = response.data;
        this.FetchUser();
      })

  }

  async Demote(){
      if(this.searchResult['role']=="ADMIN")this.newRole="EMPLOYEE";
      if(this.searchResult['role']=="EMPLOYEE")this.newRole="USER";

      await this.userService.UpdateRole(this.searchResult['phonenumber'],this.newRole).then(response=>{
        this.responseMsg = response.data;
        this.FetchUser();
      })
  }

  async Delete(){
    this.userService.DeleteUser(this.searchResult['phonenumber']).then(response=>{
        this.responseMsg=response.data;
        this.FetchUser();
    })
  }



}
