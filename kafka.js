// https://kafka.js.org/docs/getting-started
const { Kafka } = require('kafkajs')


//export KAFKA_USERNAME=YLWHDZM2XQ5KUTNF
//export KAFKA_PASSWORD=CbVQkZ5/NsbS+KmvZwiZE/G9JJUvvHypm0qLAmmTUhKi/oTvDMCBLB2U2DeUkUcc
//export KAFKA_BOOTSTRAP_SERVER=pkc-pgq85.us-west-2.aws.confluent.cloud:9092
// export GROUP_ID=test-nodejs-consumer
// export TOPIC=test-topic-aopazo

const { KAFKA_USERNAME: username, KAFKA_PASSWORD: password } = process.env
const sasl = username && password ? { username, password, mechanism: 'plain' } : null
const ssl = !!sasl

// This creates a client instance that is configured to connect to the Kafka broker provided by
// the environment variable KAFKA_BOOTSTRAP_SERVER
const kafka = new Kafka({
  clientId: 'clientId-testnodejs',
  brokers: [process.env.KAFKA_BOOTSTRAP_SERVER],
  ssl,
  sasl
})

module.exports = kafka
