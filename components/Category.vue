<template>
  <div>
    <div class="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div class="md:flex md:items-center md:justify-between">
        <h2 class="text-2xl font-bold tracking-tight text-blue text-center">Kategori Produk</h2>
        <NuxtLink to="/catalog" class="hidden text-sm font-medium text-orange md:block hover:text-blue">
          Lihat katalog produk
          <span aria-hidden="true"> &rarr;</span>
        </NuxtLink>
      </div>

      <div
          class="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:grid-cols-5 justify-center">
        <div class="group relative w-40">
          <div
              class="w-40 p-5 rounded-2xl border border-gray hover:border-orange flex-col justify-start items-center gap-[30px] inline-flex">
            <img src="/images/icons/mukenah.svg">
            <div class="w-[98px] flex-col justify-start items-center flex">
              <div class="text-blue text-md lg:text-xl font-bold">Mukenah</div>
              <div class="text-gray text-sm font-medium">837 items</div>
            </div>
          </div>
        </div>
        <div class="group relative w-40">
          <div
              class="w-40 p-5 rounded-2xl border border-gray hover:border-orange flex-col justify-start items-center gap-[30px] inline-flex">
            <img src="/images/icons/sarung.svg">
            <div class="w-[98px] flex-col justify-start items-center flex">
              <div class="text-blue text-md lg:text-xl font-bold">Sarung</div>
              <div class="text-gray text-sm font-medium">837 items</div>
            </div>
          </div>
        </div>
        <div class="group relative w-40">
          <div
              class="w-40 p-5 rounded-2xl border border-gray hover:border-orange flex-col justify-start items-center gap-[30px] inline-flex">
            <img src="/images/icons/jilbab.svg">
            <div class="w-[98px] flex-col justify-start items-center flex">
              <div class="text-blue text-md lg:text-xl font-bold">Jilbab</div>
              <div class="text-gray text-sm font-medium">837 items</div>
            </div>
          </div>
        </div>
        <div class="group relative w-40">
          <div
              class="w-40 p-5 rounded-2xl border border-gray hover:border-orange flex-col justify-start items-center gap-[30px] inline-flex">
            <img src="/images/icons/baju.svg">
            <div class="w-[98px] flex-col justify-start items-center flex">
              <div class="text-blue text-md lg:text-xl font-bold">Baju</div>
              <div class="text-gray text-sm font-medium">837 items</div>
            </div>
          </div>
        </div>
        <div class="group relative w-40">
          <div
              class="w-40 p-5 rounded-2xl border border-gray hover:border-orange flex-col justify-start items-center gap-[30px] inline-flex">
            <img src="/images/icons/sajadah.svg">
            <div class="w-[98px] flex-col justify-start items-center flex">
              <div class="text-blue text-md lg:text-xl font-bold">Sajadah</div>
              <div class="text-gray text-sm font-medium">837 items</div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8 text-sm md:hidden">
        <NuxtLink to="/catalog" class="font-medium text-orange">
          Lihat katalog produk
          <span aria-hidden="true"> &rarr;</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
