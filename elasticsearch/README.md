Create 'elastic-stack-ca.p12' and 'elastic- certificates.p12' for elasticsearch (all nodes should have the same certificates)

```shell

# Generate ca file
elasticsearch-certutil ca --out elastic-stack-ca.p12 --pass $ELASTICSEARCH_CA_PASSWORD
# Use ca to generate cert file
elasticsearch-certutil cert --ca elastic-stack-ca.p12 --ca-pass $ELASTICSEARCH_CA_PASSWORD --out elastic-certificates.p12 --pass $ELASTICSEARCH_CERT_PASSWORD


```