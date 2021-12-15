import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-app';
  isAuthenticated: boolean = false;

  constructor(private _http: HttpClient, public authService: AuthService) {
      authService.isAuthenticated.subscribe(isAuth => this.isAuthenticated = isAuth);
  }

  onGetUsers(): void {
    this._http.get('/api/users').subscribe((res) => {
      console.log('Received:', res)
    })
    console.log('Getting Users!!');
  }
}
