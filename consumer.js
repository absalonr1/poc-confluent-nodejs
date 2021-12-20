const kafka = require('./kafka')

const consumer = kafka.consumer({
  groupId: process.env.GROUP_ID
})

const main = async () => {
  await consumer.connect()

  await consumer.subscribe({
    topic: process.env.TOPIC,
    fromBeginning: true
  })

  await consumer.run({
    autoCommit: false, 
    eachMessage: async ({ topic, partition, message }) => {
      console.log('Received message', {
        topic,
        partition,
        offset:message.offset,
        key: message.key.toString(),
        value: message.value.toString()
      })
    }
  })
  console.log("after run ....");

  // https://kafka.js.org/docs/consuming#manual-commits
//   consumer.commitOffsets([
//     { topic: 'topic-A', partition: 0, offset: '1' },
//     { topic: 'topic-A', partition: 1, offset: '3' },
//     { topic: 'topic-B', partition: 0, offset: '2' }
//   ])

}

main().catch(async error => {
  console.error(error)
  try {
    await consumer.disconnect()
  } catch (e) {
    console.error('Failed to gracefully disconnect consumer', e)
  }
  process.exit(1)
})
