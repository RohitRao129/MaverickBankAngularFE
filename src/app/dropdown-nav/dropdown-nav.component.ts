import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwthelperService } from '../JwtServices/jwthelper.service';

@Component({
  selector: 'app-dropdown-nav',
  templateUrl: './dropdown-nav.component.html',
  styleUrls: ['./dropdown-nav.component.css']
})
export class DropdownNavComponent implements OnInit {
  isVisible :boolean =false;
  isUser: boolean =true;
  isAdmin :boolean = false;
  isEmployee : boolean =false;
  role :string ="USER";
  jwt :any = localStorage.getItem("jwt");

  constructor(private jwtservice : JwthelperService,private router :Router) {}

  ngOnInit(): void {
      this.role =  this.jwtservice.getClaim(this.jwt,"Role");
      this.isUser = this.role =="USER";
      this.isEmployee = this.role =="EMPLOYEE";
      this.isAdmin = this.role =="ADMIN";
  }

  toogleMenu(){
    console.log("toogles");
    this.isVisible =!this.isVisible;
  }

  Logout(){
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

}