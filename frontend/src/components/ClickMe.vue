<script setup lang="ts">
import { toast } from 'vue3-toastify'

const testClick = () => {
  toast.info('Click')
}
</script>

<template>
  <div>
    <h2> Test: Click Me </h2>
    <div>
      <button @click="testClick"> Click Me</button>
    </div>
  </div>
</template>

<style scoped>

</style>