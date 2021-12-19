import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  
	isAuthenticated: boolean = false;

	private _destroy$: Subject<void> = new Subject();

	constructor(public authService: AuthService) {}

	ngOnInit(): void {
		this.authService.isAuthenticated
			.pipe(takeUntil(this._destroy$))
			.subscribe(isAuth => this.isAuthenticated = isAuth);
	}

	ngOnDestroy(): void {
		this._destroy$.next();
		this._destroy$.complete();
	}

	onLogInClicked(): void {
		this.authService.logIn();
	}

}
