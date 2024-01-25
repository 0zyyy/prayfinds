<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "WhyUs"
})
</script>

<template>
  <div class="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
    <h2 class="text-2xl font-bold tracking-tight text-blue text-center">Mengapa Kami</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 mt-4">
      <div class="justify-start items-center gap-3.5 flex m-1 mt-3">
        <img src="/images/icons/fedex.svg">
        <div class="flex inline-flex">
          <div class="flex-col justify-start items-start gap-0.5 inline-flex mr-2 lg:mr-4">
            <div class="text-xs lg:text-xl font-bold text-blue">Pengiriman Cepat</div>
            <div class="text-xs lg:text-lg text-gray font-medium font-['Poppins']">Kurang dari 48 jam</div>
          </div>
        </div>
      </div>
      <div class="justify-start items-center gap-3.5 flex m-1 mt-3">
        <img src="/images/icons/user.svg">
        <div class="flex inline-flex">
          <div class="flex-col justify-start items-start gap-0.5 inline-flex mr-2 lg:mr-4">
            <div class="text-xs lg:text-xl font-bold text-blue">Produk Beragam</div>
            <div class="text-xs lg:text-lg text-gray font-medium font-['Poppins']">Produk bervariasi</div>
          </div>
        </div>
      </div>
      <div class="justify-start items-center gap-3.5 flex m-1 mt-3">
        <img src="/images/icons/comm.svg">
        <div class="flex inline-flex">
          <div class="flex-col justify-start items-start gap-0.5 inline-flex mr-2 lg:mr-4">
            <div class="text-xs lg:text-xl font-bold text-blue">Berbagai Media Informasi</div>
            <div class="text-xs lg:text-lg text-gray font-medium font-['Poppins']">Info lebih cepat</div>
          </div>
        </div>
      </div>
      <div class="justify-start items-center gap-3.5 flex m-1 mt-3">
        <div class="w-28 lg:w-[60px]">
          <img src="/images/icons/shipping.svg">
        </div>
        <div class="flex inline-flex">
          <div class="flex-col justify-start items-start gap-0.5 inline-flex mr-2 lg:mr-4">
            <div class="text-xs lg:text-xl font-bold text-blue">Pengiriman Seluruh Indonesia</div>
            <div class="text-xs lg:text-lg text-gray font-medium font-['Poppins']">Pengiriman mudah</div>
          </div>
        </div>
      </div>
      <div class="justify-start items-center gap-3.5 flex m-1 mt-3">
        <div class="w-[60px]">
          <img src="/images/icons/harga.svg">
        </div>
        <div class="flex inline-flex">
          <div class="flex-col justify-start items-start gap-0.5 inline-flex mr-2 lg:mr-4">
            <div class="text-xs lg:text-xl font-bold text-blue">Harga Kompetitif</div>
            <div class="text-xs lg:text-lg text-gray font-medium font-['Poppins']">Harga bersaing</div>
          </div>
        </div>
      </div>
      <div class="justify-start items-center gap-3.5 flex m-1 mt-3">
        <img src="/images/icons/shop.svg">
        <div class="flex inline-flex">
          <div class="flex-col justify-start items-start gap-0.5 inline-flex mr-2 lg:mr-4">
            <div class="text-xs lg:text-xl font-bold text-blue">Proses Order Sangat Mudah</div>
            <div class="text-xs lg:text-lg text-gray font-medium font-['Poppins']">Mempermudah pembelian
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
