#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE keycloak;
    \c keycloak
    CREATE USER keycloak WITH PASSWORD 'password';
    GRANT ALL PRIVILEGES ON DATABASE keycloak TO keycloak;
    GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO keycloak;

    CREATE DATABASE full_stack;
    \c full_stack
    CREATE TABLE users (
        ID SERIAL PRIMARY KEY,
        user_name VARCHAR(30),
        email VARCHAR(30)
    );
    INSERT INTO users (user_name, email)
    VALUES ('Jerry', 'jerry@example.com'),
    ('George', 'george@example.com');

    CREATE USER dev WITH PASSWORD 'password';
    GRANT ALL PRIVILEGES ON DATABASE full_stack TO dev;
    GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO dev;
	GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO dev;
EOSQL