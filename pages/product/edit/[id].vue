<template>
  <div>
    <div class="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:max-w-7xl lg:px-8">
      <div class="py-24">
        <h1 class="text-4xl font-bold tracking-tight text-blue">Edit Produk</h1>
      </div>
      <div class="rounded-lg border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
        <form>
          <div>
            <label for="nama_produk" class="block mb-3 font-semibold text-blue text-md mt-4 text-left">Nama
              produk</label>
            <input id="nama_produk" type="text" v-model="editedProduct.nama_produk"
                   class="block w-full py-3 pl-5 mt-1 border border-orange rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"/>
          </div>
          <div id="harga_produk">
            <label for="harga_produk" class="block mb-3 font-semibold text-blue text-md mt-4 text-left">Harga
              produk</label>
            <input id="harga_produk" name="harga_produk" type="text" placeholder="Baju Koko Bagus"
                   v-model="editedProduct.harga"
                   class="block w-full py-3 pl-5 mt-1 border border-orange rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"/>
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
<!--            <ChevronUpDownIcon-->
                    <!--                class="h-5 w-5 text-gray-400"-->
                    <!--                aria-hidden="true"-->
                    <!--            />-->
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
          <div id="stock">
            <label for="stock_produk" class="block mb-3 font-semibold text-blue text-md mt-4 text-left">Stock
              Produk</label>
            <input id="stock-produk" type="number"
                   name="stok"
                   v-model="editedProduct.stok"
                   class="block w-full py-3 pl-5 mt-1 border border-orange rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"/>
          </div>
          <div id="product_photo">
            <label for="service-name" class="block mb-3 font-semibold text-blue text-md mt-4 text-left">Gambar
              produk</label>
            <input v-for="(input) in items" :key="input" :placeholder="input.placeholder" :type="input.type"
                   :name="input.name" :id="input.id"
                   autocomplete="service-name"
                   @change="handleFileChange($event)"
                   class="block w-full py-3 pl-5 mt-1 border border-orange rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm">
            <button class="btn btn-blue mt-4 flex items-center mb-4" id="tambah-gambar" @click.prevent="addPhoto">
              <p class="font-medium text-white justify-center">Tambah Gambar +</p>
            </button>
          </div>
          <button type="button" class="btn btn-blue mt-4 flex items-center mb-4" id="tambah-produk"
                  @click="storeProduct">
            <p class="font-medium text-white justify-center">Simpan Produk</p>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {Listbox, ListboxButton, ListboxOption, ListboxOptions} from "@headlessui/vue";
import {useCurrencyFormatter} from "~/composables/currencyFormatter";

definePageMeta({
  layout: 'main',
  middleware: 'auth'
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
const selectedCategory = ref(categories[4]);
const route = useRoute();
const idProduk = ref(null)


const editedProduct = ref({
  nama_produk: '',
  harga: null,
  stok: null,
  category_id: '',
  thumbnails: [],
})


const data = ref({})
const handleFileChange = (e: any) => {
  editedProduct.value.thumbnails.push(e.target.files[0]);
}

function select(id) {
  editedProduct.value.category_id = id;
}

function addPhoto() {
  if (items.value.length >= 2) return alert("Maksimal dua gambar");
  items.value.push({
    placeholder: "File gambar " + (items.value.length + 1),
    type: "file",
    name: "thumbnails[]",
    id: "service-name",
  })
}

async function storeProduct() {

  let formData = new FormData();

  formData.append("_method", "PUT");
  formData.append('nama_produk', editedProduct.value.nama_produk);
  formData.append('harga',useCurrencyFormatter(editedProduct.value.harga));
  formData.append('stok', editedProduct.value.stok);
  formData.append('category_id', editedProduct.value.category_id);
  for (let i = 0; i < editedProduct.value.thumbnails.length; i++) {
    formData.append('thumbnails[]', editedProduct.value.thumbnails[i]);
  }
  console.log(editedProduct.value);

  // post data
  try {
    await useFetchApiWithAuth('/products/' + idProduk.value, {
      method: 'POST',
      body: formData,
    }).then((response) => console.log(response)).finally(() =>
        window.location.replace('/manage'));
  } catch (e) {
    console.log(e);
  }
}

onMounted(() => {
  nextTick(async () => {
    const {data: response} = await useFetchApi('/products/' + route.params.id)
    idProduk.value = response?.value?.data.id_produk;
    data.value = response?.value?.data;


    document.getElementById("nama_produk").setAttribute("placeholder", data.value.nama_produk);
    document.getElementById("harga_produk").setAttribute("placeholder", data.value.harga);
    document.getElementById("stock-produk").setAttribute("placeholder", data.value.stok);


    selectedCategory.value = computed(() => categories.find((category) => category.id === data.value.category.id));
    editedProduct.value.nama_produk = data.value.nama_produk;
    editedProduct.value.harga = data.value.harga;
    editedProduct.value.stok = data.value.stok;
    editedProduct.value.category_id = data.value.category.id;
    selectedCategory.value = data.value.category;

    console.log(useCurrencyFormatter(editedProduct.value.stok));
  })
})


</script>
