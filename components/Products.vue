<template>
  <div class="mx-auto max-w-2xl py-7 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
    <div class="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
      <div class="group relative my-2" v-for="product in laravelData.data" :key="product.id">
        <div
            class="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
          <img :src="product.image.thumbnail_url"
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
              <p class="mt-1 text-sm text-gray font-medium capitalize">{{ product.category.nama_kategori.split("-").join(" ")}}</p>
            </div>
            <p class="mt-1 text-sm text-orange font-semibold">{{ product.harga }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
    <PaginationNew
        :data="laravelData"
        @pagination-change-page="getResults"
        v-if="props.isCatalog"
    />
  </div>
</template>
<script setup>
import PaginationNew from "~/components/PaginationNew.vue";
import {ref} from 'vue';


const props = defineProps({
  isCatalog: {
    type: Boolean,
    default: false,
  },
  isRelated: {
    type: Boolean,
    default: false,
  },
  filter: {
    type: String,
    default: '',
  },
})


watch(() => props.filter, async () => {
  console.log("FROM WATCH PRODUCTS",props.filter);
})

const laravelData = ref({});
const emit = defineEmits(['product-exam']);
const getResults = async (page = 1) => {
  const {data: response} = await useFetchApi(`/nyoba?page=${page}`)
  laravelData.value = await response?.value;
  console.log("FROM GET RESULTS",laravelData.value);
}

const productExample = async () => {
  try {
    const {data: response, error} = await useFetchApi(`/product-example`, {
      method: 'GET',
    })
    if(error?.value?.statusCode === 500){
      laravelData.value = [];
      return;
    }
    laravelData.value = await response?.value;
    emit('product-exam', laravelData.value.category);
    console.log(laravelData.value);
  }catch (e){
    console.log(e);
  }
}


onMounted(() => {
  nextTick(async () => {
    if (props.isCatalog) {
      await getResults();
    }  else {
      await productExample();
    }
  })
});
</script>
