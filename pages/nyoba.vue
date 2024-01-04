<template>
  <div>
    <ul>
      <li v-for="post in laravelData.data" :key="post.id">{{ post.nama_produk }}</li>
    </ul>

    <PaginationNew
        :data="laravelData"
        @pagination-change-page="getResults"
    />
  </div>
</template>

<script setup>
import {ref} from 'vue';
import PaginationNew from "~/components/PaginationNew.vue";

const laravelData = ref({});

const getResults = async (page = 1) => {
  const {data: response} = await useFetch(`/product/filter?page=${page}`,
      {
        baseURL: "http://localhost:8000/api",
      });
  laravelData.value = await response?.value;
  console.log(laravelData.value);
}

onMounted(() => {
  nextTick(async () => {
    await getResults();
  })
});
</script>
