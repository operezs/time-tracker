import { UserService } from './users.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuardAdmin implements CanActivate {

  constructor(private userService: UserService , private router: Router) {
  }

  canActivate() {
    return this.router.navigate(['auth/login']);
  }
}

