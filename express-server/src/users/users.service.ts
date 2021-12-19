import { Pool } from 'pg';
import { User } from './users.models';

export async function addUser(pool: Pool, user: User): Promise<number> {
	const { rows } = await pool.query<User>('INSERT INTO users (user_name, email) VALUES ($1, $2) RETURNING id', [user.user_name, user.email]);
	return rows[0].id;
}

export async function getAllUsers(pool: Pool, fromIndex: number, size: number): Promise<User[]> {
	const { rows } = await pool.query<User>('SELECT * FROM users ORDER BY id ASC OFFSET $1 LIMIT $2', [fromIndex, size]);
	return rows;
}

export function getSingleUser(): void {

}
