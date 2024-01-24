<template>
  <div>
    <HeroSection />
    <WhyUsSection />
    <Category :categories="categories"/>
    <h2 class="text-2xl font-bold tracking-tight text-blue text-center">Contoh Produk</h2>
    <Products @product-exam="onProductExample"/>
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: 'main',
})

const categories = ref({});

const onProductExample = (data) => {
  console.log("dari child", data);
  categories.value = data;
}
</script>
