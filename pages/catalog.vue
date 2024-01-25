<template>
  <div>
    <!-- Mobile filter dialog -->
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-40 sm:hidden" @close="open = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
                         enter-to="opacity-100" leave="transition-opacity ease-linear duration-300"
                         leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-black bg-opacity-25"/>
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                           enter-from="translate-x-full" enter-to="translate-x-0"
                           leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                           leave-to="translate-x-full">
            <DialogPanel
                class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
              <div class="flex items-center justify-between px-4">
                <h2 class="text-lg font-medium text-blue">Filters</h2>
                <button type="button"
                        class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        @click="open = false">
                  <span class="sr-only">Close menu</span>
                  <XMarkIcon class="h-6 w-6 text-blue" aria-hidden="true"/>
                </button>
              </div>

              <!-- Filters -->
              <form class="mt-4">
                <Disclosure as="div" v-for="section in filters" :key="section.name"
                            class="border-t border-blue px-4 py-6 text-blue" v-slot="{ open }">
                  <h3 class="-mx-2 -my-3 flow-root">
                    <DisclosureButton
                        class="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                      <span class="font-medium text-blue">{{ section.name }}</span>
                      <span class="ml-6 flex items-center">
                        <ChevronDownIcon :class="[open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform']"
                                         aria-hidden="true"/>
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel class="pt-6">
                    <div class="space-y-6">
                      <div v-for="(option, optionIdx) in section.options" :key="option.value"
                           class="flex items-center">
                        <input :id="`filter-mobile-${section.id}-${optionIdx}`" :name="`${section.id}[]`"
                               :value="option.value" type="checkbox"
                               v-model="category"
                               @click="currentPage.value = 1"
                               class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                        <label :for="`filter-mobile-${section.id}-${optionIdx}`"
                               class="ml-3 text-sm text-blue">{{ option.label }}</label>
                      </div>
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <div class="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:max-w-7xl lg:px-8">
      <div class="py-24">
        <h1 class="text-4xl font-bold tracking-tight text-blue">Katalog Produk</h1>
      </div>

      <section aria-labelledby="filter-heading" class="border-t border-blue py-6">
        <h2 id="filter-heading" class="sr-only">Product filters</h2>

        <div class="flex items-center justify-between">
          <Menu as="div" class="relative inline-block text-left">
            <div>
              <MenuButton class="group inline-flex justify-center text-sm font-medium text-blue hover:text-orange">
                Sort By
                <ChevronDownIcon class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-blue group-hover:text-orange"
                                 aria-hidden="true"/>
              </MenuButton>
            </div>

            <transition enter-active-class="transition ease-out duration-100"
                        enter-from-class="transform opacity-0 scale-95"
                        enter-to-class="transform opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-75"
                        leave-from-class="transform opacity-100 scale-100"
                        leave-to-class="transform opacity-0 scale-95">
              <MenuItems
                  class="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-blue ring-opacity-5 focus:outline-none">
                <div class="py-1">
                  <MenuItem v-for="option in sortOptions" :key="option" v-slot="{ active }">
                    <a @click="sort = option.value"
                       :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm font-medium text-blue hover:text-orange']">{{
                        option.name
                      }}</a>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>

          <button type="button" class="inline-block text-sm font-medium text-blue hover:text-orange sm:hidden"
                  @click="open = true">Filters
          </button>

          <PopoverGroup class="hidden sm:flex sm:items-baseline sm:space-x-8">
            <Popover as="div" v-for="(section, sectionIdx) in filters" :key="section.name"
                     :id="`desktop-menu-${sectionIdx}`" class="relative inline-block text-left">
              <div>
                <PopoverButton
                    class="group inline-flex items-center justify-center text-sm font-medium text-blue hover:text-orange">
                  <span>{{ section.name }}</span>
                  <ChevronDownIcon class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                   aria-hidden="true"/>
                </PopoverButton>
              </div>

              <transition enter-active-class="transition ease-out duration-100"
                          enter-from-class="transform opacity-0 scale-95"
                          enter-to-class="transform opacity-100 scale-100"
                          leave-active-class="transition ease-in duration-75"
                          leave-from-class="transform opacity-100 scale-100"
                          leave-to-class="transform opacity-0 scale-95">
                <PopoverPanel
                    class="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <form class="space-y-4">
                    <div v-for="(option, optionIdx) in section.options" :key="option.value" class="flex items-center">
                      <input :id="`filter-${section.id}-${optionIdx}`" :name="`${section.id}[]`" :value="option.value"
                             v-model="category"
                             @click="currentPage.value = 1"
                             type="checkbox" class="h-4 w-4 rounded border-blue text-blue focus:text-blue"/>
                      <label :for="`filter-${section.id}-${optionIdx}`"
                             class="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-blue">{{
                          option.label
                        }}</label>
                    </div>
                  </form>
                </PopoverPanel>
              </transition>
            </Popover>
          </PopoverGroup>
        </div>
      </section>
    </div>
    <!--    products-->
    <div class="mx-auto max-w-2xl py-7 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
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
                <p class="text-sm text-orange font-bold">{{ useDiscountFormatter(product?.harga,product?.amount_discount) }}</p>
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
          @pagination-change-page="getResults"
      />
    </div>
  </div>
</template>
<script setup>
import {ref} from 'vue'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import {XMarkIcon} from '@heroicons/vue/24/outline'
import {ChevronDownIcon} from '@heroicons/vue/20/solid'
import Pagination from "~/components/Pagination.vue";
import products from "~/components/Products.vue";
import router from "#app/plugins/router";
import PaginationNew from "~/components/PaginationNew.vue";
import {refreshNuxtData} from "#app";
import {useDiscountFormatter} from "~/composables/currencyFormatter.js";

definePageMeta({
  layout: 'main',
})


const laravelData = ref({});
const sort = ref('');
const category = ref([]);
const open = ref(false)
const currentPage = ref(1)

// options
const sortOptions =
    [
      {name: 'Terbaru', value: '-created_at'},
      {name: 'Terlama', value: 'created_at'},
    ]

//filters
const filters = [
  {
    id: 'category',
    name: 'Kategori',
    options: [
      {value: '3', label: 'Baju Koko', checked: false},
      {value: '5', label: 'Jilbab', checked: false},
      {value: '1', label: 'Mukenah', checked: false},
      {value: '4', label: 'Sarung', checked: false},
      {value: '2', label: 'Sajadah', checked: false},
    ],
  },
]

const getResults = async (page = 1) => {
  await useFetchApi(`/nyoba?page=${page}&sort=${sort.value}&filter[category_id]=${category.value.join(",")}`, {
    onResponse({request, response, options}) {
      // Process the response data
      laravelData.value = response?._data;
    },
  })
}


onMounted(() => {
  nextTick(async () => {
    await getResults();
  })
});

watch([category,sort], async () => {
  await getResults();
})
</script>
