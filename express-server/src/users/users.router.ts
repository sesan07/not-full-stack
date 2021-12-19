import { addUser, deleteUser, getSingleUser, getAllUsers, updateUser } from './users.controller';
import { Router } from 'express';
import { Pool } from 'pg';
import bodyParser from 'body-parser';

export function usersRouter(pool: Pool): Router {
	return Router()
		.post('/users', bodyParser.json(), addUser(pool))
		.get('/users', getAllUsers(pool))
		.get('/users/:id', getSingleUser(pool))
		.put('/users/:id', updateUser(pool))
		.delete('/users/:id', deleteUser(pool));
}
