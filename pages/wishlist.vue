<template>
  <div>
    <div class="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:max-w-7xl lg:px-8">
      <div class="py-24">
        <h1 class="text-4xl font-bold tracking-tight text-blue">Wishlist</h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

definePageMeta({
  layout: 'main',
  middleware: 'auth'
})
</script>
