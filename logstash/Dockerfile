FROM docker.elastic.co/logstash/logstash:7.16.2

# Copy files to logstash
COPY --chown=1000 ./config/ /usr/share/logstash/config/
COPY --chown=1000 ./pipeline/ /usr/share/logstash/pipeline/
COPY --chown=1000 ./postgresql-42.3.1.jar /usr/share/logstash/logstash-core/lib/jars/
