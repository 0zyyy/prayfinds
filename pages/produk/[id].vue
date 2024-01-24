<template>
  <div class="mx-auto max-w-2xl py-4 px-4 sm:py-14 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
    <!-- Product details -->
    <div class="lg:max-w-lg lg:col-start-2 lg:row-start-1 lg:self-center">
      <nav aria-label="Breadcrumb">
        <ol role="list" class="flex items-center space-x-2">
          <li>
            <div class="flex items-center text-sm">
              <a href="#" class="font-medium text-gray hover:text-gray">Fashion Muslim</a>
            </div>
          </li>
        </ol>
      </nav>

      <div class="mt-4 lg:w-[600px]">
        <h1 class="text-2xl font-bold tracking-tight text-blue sm:text-4xl break-words"> {{
            product?.nama_produk
          }}</h1>
      </div>

      <section aria-labelledby="information-heading" class="mt-4">
        <h2 id="information-heading" class="sr-only">Product information</h2>

        <div class="flex items-center" v-if="product?.amount_discount == 0">
          <p class="text-lg text-orange font-bold sm:text-xl">{{ useCurrencyFormatter(product.harga) }}</p>
        </div>
        <div v-else>
          <p class="text-lg text-orange font-bold sm:text-xl">{{ useCurrencyFormatter(product?.discounted_price) }}</p>
          <div class="flex items-center">
            <p class="text-md text-gray font-bold line-through">{{ useCurrencyFormatter(product.harga) }}</p>
            <p class="ml-2 text-lg text-red font-bold sm:text-xl">{{ product?.amount_discount }}%</p>
          </div>
        </div>

        <p class="text-blue font-medium mt-4">
          <span>Description</span>
        </p>
        <div class="mt-4 space-y-6">
          <p class="text-base text-gray">{{ product.deskripsi }}</p>
        </div>
        <h3 class="mb-5 mt-2 text-md font-medium text-blue">Tersedia dalam: </h3>
        <div class="sm:flex sm:justify-between">
          <!-- Size selector -->
          <RadioGroup v-model="selectedSize">
            <div class="mt-1 grid grid-cols-4 gap-4 sm:grid-cols-4">
              <RadioGroupOption as="template" v-for="size in sizes" :key="size.name" :value="size"
                                v-slot="{ active, checked }">
                <div
                    :class="[active ? 'bg-orange text-white' : '', 'relative block cursor-pointer rounded-lg border border-gray-300 p-4 focus:outline-none']">
                  <RadioGroupLabel as="p" class="text-base font-medium text-gray-900 text-center">{{
                      size.name
                    }}
                  </RadioGroupLabel>
                  <div
                      :class="[active ? '' : 'border-2', checked ? 'border-orange' : 'border-transparent', 'pointer-events-none absolute -inset-px rounded-lg']"
                      aria-hidden="true"/>
                </div>
              </RadioGroupOption>
            </div>
          </RadioGroup>
        </div>
      </section>
      <a class="btn rounded-full bg-orange mt-4 text-white outline-none border-0" href="https://wa.me/6281912048852">Pesan Sekarang</a>
    </div>
    <!-- Product image -->
    <div class="mt-10 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:self-end">
      <div class="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
        <img :src="product?.image?.thumbnail_url"
             alt="Model wearing light green backpack with black canvas straps and front zipper pouch."
             class="h-full w-full object-cover object-center">
      </div>
    </div>
    <h2 class="text-2xl font-bold tracking-tight text-blue text-left mt-10">Produk Terkait</h2>
  </div>
  <div class="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
    <div class="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
      <div class="group relative my-2" v-for="product in relatedProducts" :key="product.id">
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
              <p class="mt-1 text-sm text-gray font-medium">Baju Koko</p>
            </div>
            <div class="flex items-center" v-if="product?.amount_discount != 0">
              <p class="mt-1 text-sm text-orange font-semibold line-through">{{
                  useCurrencyFormatter(product.harga)
                }}</p>
            </div>
            <p class="mt-1 text-sm text-orange font-semibold" v-else>{{ useCurrencyFormatter(product.harga) }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: 'main',
})
import {RadioGroup, RadioGroupLabel, RadioGroupOption} from '@headlessui/vue'

const config = useRuntimeConfig();
const product = ref({})
const relatedProducts = ref([])
const route = useRoute();
const sizes = [
  {name: 'S', description: 'Ukuran S'},
  {name: 'M', description: 'Ukuran M'},
  {name: 'L', description: 'Ukuran L'},
  {name: 'XL', description: 'Ukuran XL'},
];
const selectedSize = ref(sizes[0])
const getProductById = async () => {
  const {data: response, error} = await useFetchApi(`/products/${route.params.id}`);
  product.value = await response?.value?.data;
  relatedProducts.value = await response?.value?.related;
}

onMounted(() => {
  nextTick(async () => {
    await getProductById()
  })
});

</script>
