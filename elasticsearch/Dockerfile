FROM docker.elastic.co/elasticsearch/elasticsearch:7.16.2

# Copy files to elasticsearch
COPY --chown=1000 ./config/ /usr/share/elasticsearch/config/
COPY --chown=1000 ./scripts/ /usr/share/elasticsearch/scripts/

ENTRYPOINT ["/usr/share/elasticsearch/scripts/custom-entrypoint.sh"]
