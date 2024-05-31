<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { toast } from 'vue3-toastify'
import myLog from '@/helpers/myLog'

const randomNumber = ref(' ')
let worker: Worker | null

const stopWorker = () => {
  if (window.Worker) {
    if (!worker) {
      toast.error('Worker stopped')
      return
    }

    worker.terminate()
    worker = null
    toast.success('Worker Stop')
  }
}

const startWorker = () => {
  if (window.Worker) {

    if (worker) {
      toast.error('Worker is running')
      return
    }


    worker = new Worker(new URL('@/workers/randomNumber.worker.ts', import.meta.url),
      { type: 'module' })
    worker.postMessage('start')
    toast.success('Worker Start')

    worker.onmessage = (event) => {
      randomNumber.value = event.data
    }

    worker.onerror = (error) => {
      myLog(error)
    }
  }
}

onBeforeUnmount(() => {
  if (worker) {
    worker.terminate()
  }
})

</script>

<template>
  <div>
    <h2>Local Worker</h2>
    <div>
      <button @click="startWorker">Start</button>
      <button @click="stopWorker">Stop</button>
      Number: {{ randomNumber }}
    </div>
  </div>
</template>

<style scoped>
</style>