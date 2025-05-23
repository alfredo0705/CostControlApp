import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuComponent } from '../../../common/menu/menu.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule, MenuComponent, CommonModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {


  constructor(@Inject(PLATFORM_ID) private platformId: Object, public router: Router){
  }
  
  isLoginPage(): boolean {
    return this.router.url === '/auth/login';
  }

}
