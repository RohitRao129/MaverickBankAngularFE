import { Component, OnInit } from '@angular/core';
import { Route,ActivatedRoute  } from '@angular/router';
import { AccountService } from '../Services/account.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

  accountId:number =0;
  Account:any;

  constructor(private route:ActivatedRoute,private accountService:AccountService) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.accountId = params['id'];
        console.log(this.accountId)
      }
    );

      this.getAccount();

  }

  async getAccount(){


      await this.accountService.getAccounts({"account_id":this.accountId}).then(response =>{
        this.Account =response.data;
        console.log(this.Account);
      }) 
  }

}
