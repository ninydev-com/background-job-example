import * as http from 'node:http'
import { Server as SocketIOServer } from 'socket.io'
import { Worker } from 'node:worker_threads'

const SERVER_NAME = process.env.SERVER_NAME || 'Node HttpServer'
const SERVER_PORT = parseInt(process.env.SERVER_PORT || '3001', 10)

let worker: Worker | null = null

const startWorker = () => {
  if (!worker) {
    worker = new Worker('./dist/workers/cycle.worker.js', {
      workerData: {
        path: './workers/randomNumber.worker.ts'
      }
    })
    worker.postMessage('start')
    worker.on('message', (data) => {
      io.emit('message', data)
    })
  }
}

const stopWorker = async () => {
  if (worker) {
    worker.postMessage('stop') // Отправка команды остановки воркеру
    await worker.terminate()
    worker = null
    console.debug('Worker stopped')
  }
}

const server = http.createServer((request, response) => {
  // Set CORS headers
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (request.method === 'OPTIONS') {
    response.writeHead(204)
    response.end()
    return
  }

  switch (request.method) {
    case 'POST':
      console.debug('Received POST request')
      let body = ''
      request.on('data', chunk => {
        body += chunk.toString() // convert Buffer to string
      })
      startWorker()
      request.on('end', () => {
        console.debug('Data:', body)
        response.writeHead(201, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify({ message: 'Data received' }))
      })
      break

    case 'GET':
      console.debug('Received GET request')
      response.writeHead(200, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify({ message: 'GET request handled' }))
      break

    case 'DELETE':
      console.debug('Received DELETE request')
      stopWorker().then(() => {
        response.writeHead(204)
        response.end()
      })
        .catch(err => {
          response.writeHead(405)
          response.end()
        })

      break
    default:
      response.writeHead(405)
      response.end()
  }
})

const io = new SocketIOServer(server, {
  cors: {
    origin: '*', // Разрешить соединения со всех источников
    methods: ['GET', 'POST'] // Разрешенные HTTP методы
  }
})

io.on('connection', (socket) => {
  console.debug('User connected')

  socket.on('message', (data) => {
    console.debug('Message received:', data)
    // Эхо-ответ всем подключенным клиентам
    io.emit('message', data)
  })

  socket.on('disconnect', () => {
    console.debug('User disconnected')
  })
})

server.listen(SERVER_PORT, () => {
  console.debug(`Server ${SERVER_NAME} running at http://localhost:${SERVER_PORT}/`)
})
