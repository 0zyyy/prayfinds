<template>
  <div>
    <div class="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:max-w-7xl lg:px-8">
      <div class="py-24">
        <h1 class="text-4xl font-bold tracking-tight text-blue">Manajemen Produk</h1>
      </div>
      <div class="rounded-lg border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
        <NuxtLink to="/product/add" class="flex items-center justify-between my-3">
          <div></div>
          <button
              class="px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue">
            Tambah Produk
          </button>
        </NuxtLink>
        <div class="max-w-full overflow-x-auto">
          <table class="w-full table-auto">
            <thead>
            <tr class="bg-blue text-left ">
              <th class="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Nama Produk
              </th>
              <th class="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Created Data
              </th>
              <th class="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Kategori Produk
              </th>
              <th class="py-4 px-4 font-medium text-black dark:text-white">
                Stock
              </th>
              <th class="py-4 px-4 font-medium text-black dark:text-white">
                Discount
              </th>
              <th class="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-left" v-for="product in laravelData.data" :key="product.id">
              <td class="border-b border-[#eee] py-5 px-4 pl-9  xl:pl-11">
                <h5 class="font-medium text-black">{{ product.nama_produk }}</h5>
                <p class="text-sm text-orange font-medium">{{ useCurrencyFormatter(product.harga) }}</p>
              </td>
              <td class="border-b border-[#eee] py-5 px-4 ">
                <p class="text-black">{{ product.created_at }}</p>
              </td>
              <td class="border-b border-[#eee] py-5 px-4 ">
                <p class="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                  {{ product.category.nama_kategori }}
                </p>
              </td>
              <td class="border-b border-[#eee] py-5 px-4 ">
                <p class="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                  {{ product.stok }}
                </p>
              </td>
              <td class="border-b border-[#eee] py-5 px-4 ">
                <p class="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                  {{ product.amount_discount }}%
                </p>
              </td>
              <td class="border-b border-[#eee] py-5 px-4 ">
                <div class="flex items-center space-x-3.5">
                  <NuxtLink
                      :to="'/produk/'+ product.id"
                      class="inline-flex items-center justify-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue">
                    View
                  </NuxtLink>
                  <button
                      @click="navigate(product.id)"
                      class="inline-flex items-center justify-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue">
                    Edit
                  </button>
                  <button
                      @click="openModal(product.id)"
                      class="inline-flex items-center justify-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="mb-10">
          <PaginationNew
              :data="laravelData"
              @pagination-change-page="getResults"
          />
        </div>
      </div>
    </div>
    <!-- Modal -->
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-10">
        <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/25"/>
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
              class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                  class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle
                    as="h3"
                    class="text-lg font-medium leading-6 text-blue"
                >
                  Apakah anda yakin untuk menghapus produk ini?
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Produk yang dihapus tidak akan muncul pada katalog
                  </p>
                </div>

                <div class="mt-4">
                  <button
                      type="button"
                      class="inline-flex justify-center rounded-md border border-transparent bg-blue px-4 py-2 text-sm font-medium text-white hover:bg-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
                      @click="deleteProduct"
                  >
                    Ya
                  </button>
                  <button
                      type="button"
                      class="inline-flex justify-center rounded-md border ml-3 border-transparent bg-blue px-4 py-2 text-sm font-medium text-white hover:bg-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
                      @click="closeModal"
                  >
                    Tidak
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>
<script lang="ts" setup>
import PaginationNew from "~/components/PaginationNew.vue";
import {ref} from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
definePageMeta({
  layout: 'main',
  middleware: 'auth',
})


const { $jwtAuth } = useNuxtApp()
const laravelData = ref({});

const getResults = async (page = 1) => {
  const {data: response} = await useFetchApi(`/product/filter?page=${page}`);
  laravelData.value = await response?.value;
  console.log(laravelData.value);
}

const isOpen = ref(false)
const productId = ref(1)
const deleteProduct = async () => {
  try {
  const {data: response, error} = await useFetchApiWithAuth(`/products/${productId.value}`, {
    method: 'DELETE',
  })
  if(error?.value?.statusCode === 500){
    laravelData.value = [];
    return;
  }
  console.log(response);
  laravelData.value.data = laravelData.value.data.filter((product) => product.id !== productId.value);
  closeModal();
  }catch (e){
    console.log(e);
  }
}

function closeModal() {
  isOpen.value = false
}

function openModal(id: Number) {
  productId.value = id;
  isOpen.value = true
}

function navigate(id_produk: string){
  return navigateTo({
    path: 'product/edit/' + id_produk,
  })
}

onMounted(() => {
  nextTick(async () => {
    await getResults();
  })
});
</script>
