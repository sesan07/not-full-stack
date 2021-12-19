"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const pg_1 = require("pg");
// const Pool = require('pg').Pool
exports.usersRouter = require('express').Router();
const pool = new pg_1.Pool({
    user: 'dev',
    host: 'postgres',
    database: 'full_stack',
    password: 'password',
    port: 5432
});
function getUsers(request, response) {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
}
exports.usersRouter.get('/users', getUsers);
// module.exports = router
