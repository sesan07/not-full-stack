import { Request, Response } from 'express';
import { Pool } from 'pg';
import { User } from './users.models';
import * as UserService from './users.service';

export function getSingleUser(pool: Pool) {
	return (request: Request, response: Response) => {
		throw new Error('Function not implemented');
	};
}

export function addUser(pool: Pool) {
	return async(request: Request, response: Response) => {
		try {
			const user: User = request.body;
			const userId: number = await UserService.addUser(pool, user);
			response.status(200).json(userId);
		} catch (error) {
			console.error(error);
			response.status(500).send(error);
		}
	};
}

export function updateUser(pool: Pool) {
	return (request: Request, response: Response) => {
		throw new Error('Function not implemented');
	};
}

export function deleteUser(pool: Pool) {
	return (request: Request, response: Response) => {
		throw new Error('Function not implemented');
	};
}

export function getAllUsers(pool: Pool) {
	return async(request: Request, response: Response) => {
		const fromIndex: number = +(request.query.fromIndex as string);
		const size: number = +(request.query.size as string);
		console.log(request.query);
		const users = await UserService.getAllUsers(pool, fromIndex, size);
		response.status(200).json(users);
	};
}
