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
        <h1 class="text-3xl font-bold tracking-tight text-blue sm:text-4xl break-words"> {{ product?.nama_produk }}</h1>
      </div>

      <section aria-labelledby="information-heading" class="mt-4">
        <h2 id="information-heading" class="sr-only">Product information</h2>

        <div class="flex items-center">
          <p class="text-lg text-orange font-bold sm:text-xl">{{ product.harga }}</p>
        </div>

        <p class="text-blue font-medium mt-4">
          <span>Description</span>
        </p>
        <div class="mt-4 space-y-6">
          <p class="text-base text-gray">Don&#039;t compromise on snack-carrying capacity with this
            lightweight and spacious bag. The drawstring top keeps all your favorite chips, crisps, fries,
            biscuits, crackers, and cookies secure.</p>
        </div>

        <div class="mt-6 flex items-center">
          <!-- Heroicon name: mini/check -->
          <svg class="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clip-rule="evenodd"/>
          </svg>
          <p class="ml-2 text-sm text-blue font-semibold">In stock and ready to ship</p>
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
    </div>
    <!-- Product image -->
    <div class="mt-10 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:self-end">
      <div class="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
        <img :src="product.thumbnail_url"
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
          <img :src="product.thumbnail_url"
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
            <p class="mt-1 text-sm text-orange font-semibold">{{ product.harga }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import router from "#app/plugins/router";

definePageMeta({
  layout: 'main',
})
import {RadioGroup, RadioGroupLabel, RadioGroupOption} from '@headlessui/vue'

const config = useRuntimeConfig();
const product = ref({})
const relatedProducts = ref([])
const route = useRoute();
const sizes = [
  {name: 'S', description: 'Perfect for a reasonable amount of snacks.'},
  {name: 'M', description: 'Enough room for a serious amount of snacks.'},
  {name: 'L', description: 'Enough room for a serious amount of snacks.'},
  {name: 'XL', description: 'Enough room for a serious amount of snacks.'},
];
console.log(config.public);
const getProductById = async () => {
  const {data: response} = await useFetch(`/products/${route.params.id}`, {
    baseURL: 'http://localhost:8000/api',
  })
  product.value = await response?.value?.data;
  relatedProducts.value = await response?.value?.related;
}

async function checkLength() {
  if (product.nama_produk.length > 50) {
    return product.nama_produk.substring(0, 40) + "...";
  }
  return product.nama_produk;
}

onMounted(() => {
  nextTick(async () => {
    await getProductById()
  })
});

const selectedSize = ref(sizes[0])
</script>
