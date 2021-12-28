#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER $POSTGRES_LOGSTASH_USER WITH PASSWORD '$POSTGRES_LOGSTASH_PASSWORD';
	GRANT CONNECT ON DATABASE $POSTGRES_DEV_DATABASE TO $POSTGRES_LOGSTASH_USER;
	GRANT SELECT ON ALL TABLES IN SCHEMA public TO $POSTGRES_LOGSTASH_USER;
EOSQL