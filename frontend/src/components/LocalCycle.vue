<script setup lang="ts">

import { toast } from 'vue3-toastify'

const cycleTime = 7000
const delayTime = 300

async function delay(duration: number) {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve()
    }, duration)
  })
}

const startCycle = async () => {
  const endTime = Date.now() + cycleTime
  toast.info('Start cycle')
  toast.error('UI is blocked')
  toast('' + endTime)
  toast('' + cycleTime)
  await delay(delayTime)
  while (Date.now() < endTime) {
    const randomNumber = Math.random()
    console.log(Date.now())
  }
  toast.success('End cycle')
}

async function cycle() {
  const endTime = Date.now() + cycleTime
  while (Date.now() < endTime) {
    const randomNumber = Math.random()
    console.log(Date.now())
  }
}

const startCycleAwait = async () => {
  toast.info('Start cycle Async')
  toast.error('UI is blocked')
  await delay(delayTime)
  await cycle()
  toast.success('End cycle')
}

function doTimeOut(endTime: number) {
  const randomNumber = Math.random()
  if (Date.now() < endTime) {
    setTimeout(() => doTimeOut(endTime), 1)
  } else {
    toast.success('End')
  }
}

const startTimeOut = () => {
  const endTime = Date.now() + cycleTime
  toast.info('Start timeout')
  setTimeout(() => doTimeOut(endTime), 1)
}
</script>

<template>
  <div>
    <h2>Local Cycle</h2>
    <div>
      <button @click="startCycle">Start Cycle</button>
      <button @click="startCycleAwait">Start Await</button>
      <button @click="startTimeOut">Start Timeout</button>
    </div>
  </div>
</template>

<style scoped>

</style>