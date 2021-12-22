#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE $POSTGRES_KEYCLOAK_DATABASE;
    \c $POSTGRES_KEYCLOAK_DATABASE
    CREATE USER $POSTGRES_KEYCLOAK_USER WITH PASSWORD '$POSTGRES_KEYCLOAK_PASSWORD';
    GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_KEYCLOAK_DATABASE TO $POSTGRES_KEYCLOAK_USER;
    GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO $POSTGRES_KEYCLOAK_USER;

    CREATE DATABASE $POSTGRES_DEV_DATABASE;
    \c $POSTGRES_DEV_DATABASE
    CREATE TABLE users (
        ID SERIAL PRIMARY KEY,
        user_name VARCHAR(30),
        email VARCHAR(30)
    );
    INSERT INTO users (user_name, email)
    VALUES ('Jerry', 'jerry@example.com'),
    ('George', 'george@example.com');

    CREATE USER $POSTGRES_DEV_USER WITH PASSWORD '$POSTGRES_DEV_PASSWORD';
    GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DEV_DATABASE TO $POSTGRES_DEV_USER;
    GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO $POSTGRES_DEV_USER;
	GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO $POSTGRES_DEV_USER;

    CREATE USER $POSTGRES_LOGSTASH_USER WITH PASSWORD '$POSTGRES_LOGSTASH_PASSWORD';
	GRANT CONNECT ON DATABASE $POSTGRES_DEV_DATABASE TO $POSTGRES_LOGSTASH_USER;
	GRANT SELECT ON ALL TABLES IN SCHEMA public TO $POSTGRES_LOGSTASH_USER;
EOSQL