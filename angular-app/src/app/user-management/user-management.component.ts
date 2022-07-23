import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { UserManagementService } from './user-management.service';
import { User } from './user-management.types';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

	users: User[] = [];
	public get isUpdating(): boolean {
		return !!this.userForm.value.id;
	}
	
	private _originalUser: User | undefined;
	private _pageSize: number = 10;
	private _currPageIndex = 0;

	userForm = this._fb.group({
		id: [],
		user_name: ['', Validators.required],
		email: ['', Validators.required]
	  });

	constructor(private _userService: UserManagementService, private _fb: UntypedFormBuilder) { }

	ngOnInit(): void {
		this._userService.getUsers(0, this._pageSize)
			.subscribe(users => this.users = users);
	}

	onUserClicked(user: User): void {
		this.userForm.setValue(user);
	}

	onSubmit() {
		this._addUser(this.userForm.value);
	}

	private _addUser(user: User): void {
		this._userService.addUser(user)
			.pipe(
				mergeMap(() => this._userService.getUsers(this._currPageIndex * this._pageSize, this._pageSize))
			)
			.subscribe((users) => this.users = users);
	}
}
