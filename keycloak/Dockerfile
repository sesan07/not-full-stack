FROM jboss/keycloak:15.0.0

COPY ./realm-import.json /tmp/realm-import.json

# EXPOSE 8080

ENTRYPOINT [ "/opt/jboss/tools/docker-entrypoint.sh" ]

CMD ["-b", "0.0.0.0"]