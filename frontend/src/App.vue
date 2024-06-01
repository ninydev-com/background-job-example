<script setup lang="ts">
import LocalWorker from '@/components/LocalWorker.vue'
import LocalCycle from '@/components/LocalCycle.vue'
import ClickMe from '@/components/ClickMe.vue'
import NodeJSVersion from '@/components/NodeJSVersion.vue'
</script>

<template>
  <LocalCycle />
  <LocalWorker />
  <ClickMe />
  <NodeJSVersion />
  <footer class="text-sm text-white mb-4 text-center w-full">
    &copy;
    <a href="https://ninydev.com/background-job-example/" target="_blank" class="text-white hover:text-gray-300 mx-2"
    >Oleksandr Nykytin</a
    >
    <a href="https://lab325.com" target="_blank" class="text-white hover:text-gray-300 mx-2"
    >Lab325.com</a
    >
    <a
      href="https://nikolaev.itstep.org/"
      target="_blank"
      class="text-white hover:text-gray-300 mx-2"
    >ItStep.org</a
    >
  </footer>
</template>

<style scoped>
</style>
