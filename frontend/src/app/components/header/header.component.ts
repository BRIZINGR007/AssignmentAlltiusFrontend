import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  userName: string | null = '';
  constructor(
    private router: Router,
    private authService: AuthService
  ) {

  }
  ngOnInit() {
    this.userName = localStorage.getItem('name');

  }

  LogOut() {
    this.authService.LogOut();
    localStorage.removeItem('authToken');
    localStorage.removeItem('name');
    this.router.navigate(['/login'])
  }
}
