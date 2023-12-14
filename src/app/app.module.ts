import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import {JwtGuard } from './GuardServices/JwtGuard.service';
import {MatIconModule} from '@angular/material/icon';
import { SideNavComponent } from './side-nav/side-nav.component';
import { NeedLoginCheck } from './GuardServices/need-log-in.service';
import { DropdownNavComponent } from './dropdown-nav/dropdown-nav.component';
import { UserPageComponent } from './user-page/user-page.component';
import { ManageAccountsComponent } from './manage-accounts/manage-accounts.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { TransactionInfoComponent } from './transaction-info/transaction-info.component';
import { ManageLoansComponent } from './manage-loans/manage-loans.component';
import { ManageTransactionComponent } from './manage-transaction/manage-transaction.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { BankBranchComponent } from './bank-branch/bank-branch.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignUpPageComponent,
    HomePageComponent,
    SideNavComponent,
    DropdownNavComponent,
    UserPageComponent,
    ManageAccountsComponent,
    AccountInfoComponent,
    TransactionInfoComponent,
    ManageLoansComponent,
    ManageTransactionComponent,
    ManageUsersComponent,
    BankBranchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatIconModule
  ],
  providers: [
    provideClientHydration(),
    JwtGuard,
    NeedLoginCheck,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
