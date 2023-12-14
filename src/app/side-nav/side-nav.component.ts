import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwthelperService } from '../JwtServices/jwthelper.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

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

  Logout(){
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

}
