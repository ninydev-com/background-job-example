import { parentPort, workerData } from 'node:worker_threads'

let isWork = true

const infiniteLoop = async () => {
  while (true) {
    parentPort?.postMessage(Date.now())
    if (isWork)
      await new Promise((resolve) => setTimeout(resolve, 3000))
  }
}

parentPort?.on('message', async (message) => {
  switch (message) {
    case 'start':
      console.debug('Worker received start message')
      await infiniteLoop()
      break
    case 'stop':
      console.log('Worker received stop message')
      isWork = false
      parentPort?.postMessage('Worker Stopped')
      break
    default:
      console.debug('Unknown message:', message)
  }
})

parentPort?.postMessage('Worker Started')