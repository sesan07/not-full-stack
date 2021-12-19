import { Injectable } from '@angular/core';
import { KeycloakEvent, KeycloakService } from 'keycloak-angular';
import { BehaviorSubject, from, Observable, of, Subject } from 'rxjs';
import { mergeMap, takeUntil, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  get isAuthenticated(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }

  currentUser: string | undefined = undefined;

  private _isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _loginRedirectPath: string = window.location.origin + '/user-management';
  private _logoutRedirectPath: string = window.location.origin + '';

  constructor(private readonly _keycloakService: KeycloakService) {
    from(_keycloakService.isLoggedIn())
      .pipe(
        tap(isLoggedIn => {
          this._isAuthenticated.next(isLoggedIn)
        }),
        mergeMap(isLoggedIn => {
          if (isLoggedIn) {
            return from(_keycloakService.loadUserProfile())
          } else {
            return of(null);
          }
        }))
      .subscribe(profile => {
        this.currentUser = profile?.username
      })

    _keycloakService.keycloakEvents$.subscribe(event => this._onKeycloakEvent(event))
  }

  logIn(): void {
    this._keycloakService.login({ redirectUri: this._loginRedirectPath });
  }

  logOut(): void {
    this._keycloakService.logout(this._logoutRedirectPath);
  }

  private _onKeycloakEvent(event: KeycloakEvent): void {
      console.log('Event!!!')
      console.log(JSON.stringify(event, null, 4))
  }
}
