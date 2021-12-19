import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from './user-management.types';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  	constructor(private _http: HttpClient) {}

	getUsers(fromIndex: number, size: number): Observable<User[]> {
		return this._http.get<User[]>('/api/users', {
			params: { fromIndex, size }
		});
	}

	addUser(user: User): Observable<number> {
		return this._http.post<number>('/api/users', user);
	}
}

