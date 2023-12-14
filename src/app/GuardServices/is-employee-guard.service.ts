import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwthelperService } from '../JwtServices/jwthelper.service';

@Injectable({
  providedIn: 'root'
})
export class IsEmployeeGuardService {
  constructor(private router:Router ,private jwtService:JwthelperService) { }

  isJwtValid:boolean=false;
  token:any;

  async canActivate() {
    
    this.token = localStorage.getItem("jwt");
    if(this.jwtService.getClaim(this.token,"Role")=="EMPLOYEE"){
      return true;
    }

    this.router.navigate(['/home']);
    return false;
  }
}
