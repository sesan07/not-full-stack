#!/bin/bash
echo
echo '========== Custom entry point starting =========='
echo

# Generate ca file
# elasticsearch-certutil ca --out elastic-stack-ca.p12 --pass $ELASTICSEARCH_CA_PASSWORD
# Use ca to generate cert file
# elasticsearch-certutil cert --ca elastic-stack-ca.p12 --ca-pass $ELASTICSEARCH_CA_PASSWORD --out elastic-certificates.p12 --pass $ELASTICSEARCH_CERT_PASSWORD

yes | elasticsearch-keystore create
echo $ELASTICSEARCH_CERT_PASSWORD | elasticsearch-keystore add xpack.security.transport.ssl.keystore.secure_password
echo $ELASTICSEARCH_CERT_PASSWORD | elasticsearch-keystore add xpack.security.transport.ssl.truststore.secure_password

echo
echo '========== Custom entry point done =========='
echo


exec /bin/tini -- /usr/local/bin/docker-entrypoint.sh "$@"