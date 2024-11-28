const EventEmitter = require('events')

const myEmitter = new EventEmitter()

myEmitter.on('dataReceived', (data) => {
   console.log(`Received data: ${data}`)
})

myEmitter.on('dataReceived', () => {
   console.log('이벤트가 발생했습니다!')
})

myEmitter.emit('dataReceived', 'Hello, Node.js!')
