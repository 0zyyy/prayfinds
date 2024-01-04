<template>
  <div>
    <HeroSection />
    <WhyUsSection />
    <Category />
    <h2 class="text-2xl font-bold tracking-tight text-blue text-center">Contoh Produk</h2>
    <Products :is-catalog="false"/>
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: 'main',
})
</script>
