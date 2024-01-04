<template>
  <nav class="flex items-center justify-between border-t text-blue px-4 sm:px-0 mt-10">
    <div class="-mt-px flex w-0 flex-1">
      <button class="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray cursor-not-allowed no-underline" v-if="isInFirstPage">
        <ArrowLongLeftIcon class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true"/>
        Previous
      </button>
      <button
          v-else
         @click.prevent="onClickFirstPage"
          @click="onClickPreviousPage"
          :disabled="isInFirstPage"
          aria-label="Go to previous page"
          :class="{ 'cursor-not-allowed no-underline': isInFirstPage }"
         role="button"
         rel="prev"
         class="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-blue hover:text-orange">
        <ArrowLongLeftIcon class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true"/>
        Previous
      </button>
    </div>
    <div class="hidden md:-mt-px md:flex">
      <div v-for="page in links" :key="page">
        <button v-if="isPageActive(page.label)" class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-orange cursor-not-allowed no-underline">
          {{ page.label }}
        </button>
        <button
            v-else
            @click.prevent="onClickNextPage(page.label)"
            role="button"
           class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
           >{{ page.label }}
        </button>
      </div>
    </div>
    <div class="-mt-px flex w-0 flex-1 justify-end">
      <button class="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray cursor-not-allowed no-underline" v-if="isInLastPage">
        Next
        <ArrowLongRightIcon class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true"/>
      </button>
      <button
          v-else
          type="button"
          @click="onClickNextPage"
          :disabled="isInLastPage"
          aria-label="Go to next page"
          :class="{ 'cursor-not-allowed no-underline': isInLastPage }"
         class="inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-blue hover:text-orange">
        Next
        <ArrowLongRightIcon class="ml-3 h-5 w-5 text-gray-400" aria-hidden="true"/>
      </button>
    </div>
  </nav>
</template>


<script>
export default {
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 10
    },

    totalPages: {
      type: Number,
      required: true
    },

    perPage: {
      type: Number,
      required: true
    },

    currentPage: {
      type: Number,
      required: true
    },

    hasMorePages: {
      type: Boolean,
      required: true
    },
    links: {
      type: Object,
      required: false,
      default: () => ({
        previous: null,
        next: null
      })
    }
  },

  computed: {
    startPage() {
      if (this.currentPage === 1) {
        return 1;
      }

      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons + 1;
      }

      return this.currentPage - 1;
    },
    endPage() {
      return Math.min(
          this.startPage + this.maxVisibleButtons - 1,
          this.totalPages
      );
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    }
  },

  methods: {
    onClickPreviousPage() {
      this.$emit("pagechanged", this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit("pagechanged", page);
    },
    onClickNextPage() {
      this.$emit("pagechanged", this.currentPage + 1);
      console.log("clicked njeng");
      navigateTo(`/produk/filter?page=${this.currentPage + 1}`);
    },
    isPageActive(page) {
      return this.currentPage === page;
    }
  }
}
</script>

<script setup>
import {ArrowLongLeftIcon, ArrowLongRightIcon} from "@heroicons/vue/24/solid/index.js";
</script>

