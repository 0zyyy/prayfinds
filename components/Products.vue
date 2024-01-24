<template>
  <div class="mx-auto max-w-2xl py-7 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
    <div class="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
      <div class="group relative my-2" v-for="product in laravelData.data" :key="product.id">
        <div
            class="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
          <img :src="product?.image?.thumbnail_url"
               alt="Hand stitched, orange leather long wallet."
               class="h-full w-full object-cover object-center">
        </div>
        <NuxtLink :to="'/produk/'+ product.id">
          <div class="block lg:flex lg:justify-between lg:items-center">
            <div>
              <h3 class="mt-4 text-sm text-blue font-bold hover:text-orange" v-if="product.nama_produk.length < 50">
                <span class="absolute inset-0"></span>
                {{ product.nama_produk }}
              </h3>
              <h3 class="mt-4 text-sm text-blue font-bold hover:text-orange" v-else>
                <span class="absolute inset-0"></span>
                {{ product.nama_produk.substring(0, 40) + "..." }}
              </h3>
              <p class="mt-1 text-sm text-gray font-medium capitalize">
                {{ product.category.nama_kategori.split("-").join(" ") }}</p>
            </div>
            <div class="flex items-center" v-if="product?.amount_discount == 0">
              <p class="text-md text-orange font-bold sm:text-xl">{{ useCurrencyFormatter(product.harga) }}</p>
            </div>
            <div v-else>
              <p class="text-md text-orange font-bold sm:text-xl">{{ useDiscountFormatter(product?.harga,product?.amount_discount) }}</p>
              <div class="flex items-center">
                <p class="text-sm text-gray font-bold line-through">{{ useCurrencyFormatter(product.harga) }}</p>
                <p class="ml-2 text-sm text-red font-bold">{{ product?.amount_discount }}%</p>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup>

import {useDiscountFormatter} from "../composables/currencyFormatter.js";

const props = defineProps({
  isRelated: {
    type: Boolean,
    default: false,
  },
  filter: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['product-exam']);

const laravelData = ref({});

const productExample = async () => {
  try {
    const {data: response, error} = await useFetchApi(`/product-example`, {
      method: 'GET',
    })
    if (error?.value?.statusCode === 500) {
      laravelData.value = [];
      return;
    }
    laravelData.value = await response?.value;
    console.log(laravelData?.value);
    emit('product-exam', laravelData?.value.category);
  } catch (e) {
    console.log(e);
  }
}


onMounted(() => {
  nextTick(async () => {
    await productExample();
  })
});
</script>
