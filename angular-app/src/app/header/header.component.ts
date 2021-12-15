import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  isAuthenticated: boolean = false;

  constructor(public authService: AuthService) {
}

  ngOnInit(): void {
    this.authService.isAuthenticated.subscribe(isAuth => this.isAuthenticated = isAuth);
  }

  onSignInClicked(): void {
    console.log('sign in clicked!')
    this.authService.logIn();
  }

  onSignOutClicked(): void {
    console.log('sign out clicked!')
    this.authService.logOut();
  }

}
