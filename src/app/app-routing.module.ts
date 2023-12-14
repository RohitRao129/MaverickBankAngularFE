import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { JwtGuard } from './GuardServices/JwtGuard.service';
import { NeedLoginCheck } from './GuardServices/need-log-in.service';
import { UserPageComponent } from './user-page/user-page.component';
import { ManageAccountsComponent } from './manage-accounts/manage-accounts.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { ManageTransactionComponent } from './manage-transaction/manage-transaction.component';
import { ManageLoansComponent } from './manage-loans/manage-loans.component';
import { IsAdminGuardService } from './GuardServices/is-admin-guard.service';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { BankBranchComponent } from './bank-branch/bank-branch.component';

const routes: Routes = [
  {path:"", redirectTo:"home",pathMatch:'full'},
  {path :"login",component:LoginPageComponent,canActivate:[NeedLoginCheck]},
  {path :"signup",component:SignUpPageComponent,canActivate:[NeedLoginCheck]},
  {path :"home",component:HomePageComponent,canActivate:[JwtGuard]},
  {path :"user",component:UserPageComponent,canActivate:[JwtGuard]},
  {path :"accounts",component:ManageAccountsComponent,canActivate:[JwtGuard]},
  {path :"accountInfo",component:AccountInfoComponent,canActivate:[JwtGuard]},
  {path :"transactions",component:ManageTransactionComponent,canActivate:[JwtGuard]},
  {path :"loans",component:ManageLoansComponent,canActivate:[JwtGuard]},
  {path :"manageEmployee",component:ManageUsersComponent,canActivate:[JwtGuard,IsAdminGuardService]},
  {path :"manageBranch",component:BankBranchComponent,canActivate:[JwtGuard,IsAdminGuardService]},
  {path:"**",component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
