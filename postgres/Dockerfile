FROM postgres:14.1

COPY ./init-user-db.sh /docker-entrypoint-initdb.d/
# COPY ./realm-import.json /tmp/realm-import.json

# EXPOSE 8080

# ENTRYPOINT [ "/opt/jboss/tools/docker-entrypoint.sh" ]

# CMD ["-b", "0.0.0.0"]