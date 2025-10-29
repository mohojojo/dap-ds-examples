<script setup lang="ts">
import { RouterView } from 'vue-router'
import MyForm from './components/MyForm.vue'
</script>

<template>
  <div class="app">
    <MyForm />
    <RouterView />
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  padding: 2rem;
}
</style>
