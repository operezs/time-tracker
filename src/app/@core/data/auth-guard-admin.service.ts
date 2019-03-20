import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { tap } from 'rxjs/operators';
import { UserService } from './users.service';


@Injectable()
export class AuthGuardAdmin implements CanActivate {

  constructor(private userService: UserService ,
              private router: Router,
              private authService: NbAuthService) {
  }

  canActivate() {
    const  roleName: string = this.userService.getDecodedAccessToken().roleName;    
    return this.authService.isAuthenticated()
    .pipe(
      tap(authenticated => {
        if (!authenticated) {
           this.router.navigate(['auth/login']);
        }
        if(roleName !== 'Admin') {
          this.router.navigate(['pages/home']);
        }
      }),
    );    
  }
}