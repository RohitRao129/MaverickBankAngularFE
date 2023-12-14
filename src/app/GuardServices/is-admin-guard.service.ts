import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import axios from 'axios';
import { Observable } from 'rxjs';
import { JwthelperService } from '../JwtServices/jwthelper.service';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuardService implements CanActivate{

  constructor(private router:Router ,private jwtService:JwthelperService) { }

  isJwtValid:boolean=false;
  token:any;

  async canActivate() {
    
    this.token = localStorage.getItem("jwt");
    if(this.jwtService.getClaim(this.token,"Role")=="ADMIN"){
      return true;
    }

    this.router.navigate(['/home']);
    return false;
  }

}
