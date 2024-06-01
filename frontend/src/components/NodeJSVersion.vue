<template>
  <div>
    <h2> NodeJS Version </h2>
    <div>
      <button @click="startBackWorker">Start</button>
      <button @click="stopBackWorker">Stop</button>
      <button @click="toggleConnection">
        {{ isConnected ? 'Disconnect' : 'Connect' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { io, Socket } from 'socket.io-client'
import myLog from '@/helpers/myLog'
import { toast } from 'vue3-toastify'

let socket: Socket | null = null
const isConnected = ref(false)

const startBackWorker = () => {
  fetch('http://localhost:3001', {
    method: 'POST'
  })
    .then(res => res.json())
    .then(data => myLog(data))
    .catch(err => myLog(err))
}

const stopBackWorker = () => {
  fetch('http://localhost:3001', {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(data => myLog(data))
    .catch(err => myLog(err))
}

const toggleConnection = () => {
  if (!isConnected.value) {
    connect()
  } else {
    disconnect()
  }
}

const connect = () => {
  socket = io('http://localhost:3001')

  socket.on('connect', () => {
    isConnected.value = true
    toast.success('Connected to socket server')
  })

  socket.on('disconnect', () => {
    isConnected.value = false
    toast.error('Disconnected from socket server')
  })

  socket.on('error', (error: any) => {
    toast.error(`Error: ${error.message}`)
  })

  socket.on('message', (message: string) => {
    let dateOrMessage

    // Проверка, является ли сообщение числом
    if (!isNaN(Number(message))) {
      // Преобразование в число и затем в объект Date
      const date = new Date(Number(message))
      // Форматирование времени
      dateOrMessage = date.toLocaleTimeString()
    } else {
      // Сообщение является текстом
      dateOrMessage = message
    }

    // Вывод сообщения или времени
    toast.info(dateOrMessage)
    myLog(dateOrMessage)
  })
}

const disconnect = () => {
  if (socket) {
    socket.disconnect()
    socket = null
    isConnected.value = false
  }
}
</script>

<style scoped>

</style>