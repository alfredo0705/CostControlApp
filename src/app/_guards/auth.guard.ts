import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { map, take } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { AuthService } from "../_services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      take(1),
      map(user => {
        console.log(user)
        if (user) {
          console.log('si existe usuario')
          return true;
        } else {
          console.log('no existe usuario')
          this.router.navigate(['/auth/login']);
          return false;
        }
      })
    );
  }
}
