<template>
  <div>
    <div class="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:max-w-7xl lg:px-8">
      <div class="py-24">
        <h1 class="text-4xl font-bold tracking-tight text-blue">Tambah Produk</h1>
      </div>
      <div class="rounded-lg border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
        <form @submit.prevent="storeProduct()">
          <div id="nama_produk">
            <label for="nama_produk" class="block mb-3 font-semibold text-blue text-md mt-4 text-left">Nama
              produk</label>
            <input id="nama-produk" type="text" v-model="products.nama_produk" name="nama_produk"
                   class="block w-full py-3 pl-5 text-orange mt-1 border border-orange rounded-md shadow-sm focus:ring-blue focus:border-blue sm:text-sm"/>
          </div>
          <div id="harga_produk">
            <label for="harga_produk" class="block mb-3 font-semibold text-blue text-md mt-4 text-left">Harga
              produk</label>
            <input id="harga_produk" name="harga_produk" type="number" v-model="products.harga"
                   class="block w-full py-3 pl-5 mt-1 border border-orange rounded-md shadow-sm focus:ring-blue focus:border-blue sm:text-sm"/>
          </div>
          <div id="kategori">
            <label for="kategori-produk" class="block mb-3 font-semibold text-blue text-md mt-4 text-left">Kategori
              Produk</label>
            <Listbox v-model="selectedCategory">
              <div class="relative mt-1">
                <ListboxButton
                    class="relative w-full cursor-default rounded-lg ring-1 ring-orange bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                >
                  <span class="block truncate">{{ selectedCategory.nama_kategori }}</span>
                  <span
                      class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                  >
            <ChevronUpDownIcon
                class="h-5 w-5 text-gray-400"
                aria-hidden="true"
            />
          </span>
                </ListboxButton>

                <transition
                    leave-active-class="transition duration-100 ease-in"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                >
                  <ListboxOptions
                      class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                  >
                    <ListboxOption
                        v-slot="{ active, selected }"
                        v-for="category in categories"
                        :key="category.nama_kategori"
                        :value="category"
                        @click="select(category.id)"
                        as="template"
                    >
                      <li
                          :class="[
                  active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                  'relative cursor-default select-none py-2 pl-10 pr-4',
                ]"
                      >
                <span
                    :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                >{{ category.nama_kategori }}</span
                >
                      </li>
                    </ListboxOption>
                  </ListboxOptions>
                </transition>
              </div>
            </Listbox>
          </div>
          <div id="deskripsi">
            <label for="deskrip" class="block mb-3 font-semibold text-blue text-md mt-4 text-left">Deskripsi</label>
            <textarea v-model="products.description" id="deskrip"
                      class="textarea-bordered border border-orange rounded-md textarea-md block w-full py-3 pl-5 mt-1"></textarea>
          </div>
          <div id="stock">
            <label for="stock_produk" class="block mb-3 font-semibold text-blue text-md mt-4 text-left">Stock
              Produk</label>
            <input id="stock-produk" type="number"
                   v-model="products.stock" name="stok"
                   class="block w-full py-3 pl-5 mt-1 border border-orange rounded-md shadow-sm focus:ring-blue focus:border-blue sm:text-sm"/>
          </div>
          <div id="product_photo">
            <label for="service-name" class="block mb-3 font-semibold text-blue text-md mt-4 text-left">Gambar
              produk</label>
            <input v-for="(input) in items" :key="input" :placeholder="input.placeholder" :type="input.type"
                   :name="input.name" :id="input.id"
                   autocomplete="service-name"
                   @change="handleFileChange($event)"
                   class="block w-full py-3 pl-5 mt-1 border border-orange rounded-md shadow-sm focus:ring-blue focus:border-blue sm:text-sm">
            <button class="btn btn-blue mt-4 flex items-center mb-4" id="tambah-gambar" @click.prevent="addPhoto">
              <p class="font-medium text-white justify-center">Tambah Gambar +</p>
            </button>
          </div>
          <button type="submit" class="btn btn-blue mt-4 flex items-center mb-4" id="tambah-produk">
            <p class="font-medium text-white justify-center">Tambak Produk</p>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {Listbox, ListboxButton, ListboxOption, ListboxOptions} from "@headlessui/vue";
import {ChevronUpDownIcon} from "@heroicons/vue/20/solid";
import {ref} from 'vue'

definePageMeta({
  layout: 'main',
  middleware: 'auth',
})


const items = ref([{
  placeholder: "File gambar 1",
  type: "file",
  name: "thumbnails",
  id: "service_name",
}]);

const categories = [
  {id: 1, nama_kategori: 'mukenah'},
  {id: 2, nama_kategori: 'sajadah'},
  {id: 3, nama_kategori: 'baju-koko'},
  {id: 4, nama_kategori: 'sarung'},
  {id: 5, nama_kategori: 'jilbab'},
];

const selectedCategory = ref(categories[0]);
const products = ref({
  nama_produk: '',
  harga: null,
  stock: null,
  description: '',
  category_id: '',
  thumbnails: [],
})

function addPhoto() {
  if (items.value.length >= 2) return alert("Maksimal dua gambar");
  items.value.push({
    placeholder: "File gambar " + (items.value.length + 1),
    type: "file",
    name: "thumbnails[]",
    id: "service-name",
  })
}

const handleFileChange = (e: any) => {
  products.value.thumbnails.push(e.target.files[0]);
}

function select(id) {
  products.value.category_id = id;
}

async function storeProduct() {

  if (products.value.nama_produk === '' || products.value.harga === null || products.value.stock === null || products.value.description === '' || products.value.category_id === '' || products.value.thumbnails.length === 0) {
    alert('Mohon isi semua field');
    return;
  }

  let formData = new FormData();

  formData.append('nama_produk', products.value.nama_produk);
  formData.append('harga', products.value.harga);
  formData.append('stok', products.value.stock);
  formData.append('deskripsi', products.value.description);
  formData.append('category_id', products.value.category_id);
  for (let i = 0; i < products.value.thumbnails.length; i++) {
    formData.append('thumbnails[]', products.value.thumbnails[i]);
  }
  // post data
  try {
    await useFetchApiWithAuth('/products/', {
      method: 'POST',
      body: formData,
      async onResponse({ request, response, options }) {
        // Log response
        if (response.status === 200){
          window.location.href = "/manage";
          alert(response._data.message);
        }
      }
    })
  } catch (e) {
    console.log(e);
  }
}
</script>
