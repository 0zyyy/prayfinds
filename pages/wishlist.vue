<template>
  <div>
    <div class="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:max-w-7xl lg:px-8">
      <div class="py-24">
        <h1 class="text-4xl font-bold tracking-tight text-blue">Wishlist</h1>
      </div>
    </div>
    <div v-if="true">
      Tidak ada product dalam wishlist
    </div>
    <!--    products-->
    <div class="mx-auto max-w-2xl py-7 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8" v-else>
      <div class="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
        <div class="group relative my-2" v-for="product in laravelData?.data" :key="product.id">
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
                <p class="text-sm text-orange font-bold">{{ useCurrencyFormatter(product.harga) }}</p>
              </div>
              <div v-else>
                <p class="text-sm text-orange font-bold">
                  {{ useDiscountFormatter(product?.harga, product?.amount_discount) }}</p>
                <div class="flex items-center">
                  <p class="text-xs text-gray font-bold line-through">{{ useCurrencyFormatter(product.harga) }}</p>
                  <p class="ml-2 text-xs text-red font-bold">{{ product?.amount_discount }}%</p>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
      <PaginationNew
          :data="laravelData"
          @pagination-change-page="getWishlist"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>

import {useDiscountFormatter} from "~/composables/currencyFormatter";
import PaginationNew from "~/components/PaginationNew.vue";

definePageMeta({
  layout: 'main',
  middleware: 'auth'
})

const laravelData = ref({});

const getWishlist = async (page = 1) => {
  await useFetchApiWithAuth(`/wishlist/`, {
    async onResponse({request, response, options}) {
      // Log response
      console.log(response._data);
    }
  })
}

onMounted(() => {
  nextTick(async () => {
    await getWishlist();
  })
})


</script>
