<template>
  <RenderlessPagination
      :data="data"
      :limit="limit"
      :keep-length="keepLength"
      @pagination-change-page="onPaginationChangePage"
      v-slot="slotProps"
  >
    <nav
        class="flex items-center justify-between border-t text-blue px-4 sm:px-0 mt-10"
        v-bind="$attrs"
        aria-label="Pagination"
        v-if="slotProps.computed.total > slotProps.computed.perPage"
    >
      <button
          :disabled="!slotProps.computed.prevPageUrl"
          v-on="slotProps.prevButtonEvents"
          class="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-blue hover:text-orange"
      >
        <slot name="prev-nav">
          <ArrowLongLeftIcon class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true"/>
          Previous
        </slot>
      </button>

      <div class="hidden md:-mt-px md:flex">
        <button
            :aria-current="slotProps.computed.currentPage ? 'page' : null"
            v-for="(page, key) in slotProps.computed.pageRange"
            :key="key"
            v-on="slotProps.pageButtonEvents(page)"
            :class="{ 'cursor-not-allowed no-underline text-orange': isCurrentPage(page)}"
            class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
          {{ page }}
        </button>
      </div>

      <button
          :disabled="!slotProps.computed.nextPageUrl"
          v-on="slotProps.nextButtonEvents"
          class="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-blue hover:text-orange"
      >
        <slot name="next-nav">
          Next
          <ArrowLongRightIcon class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true"/>
        </slot>
      </button>
    </nav>
  </RenderlessPagination>
</template>

<script>
import RenderlessPagination from 'laravel-vue-pagination/src/RenderlessPagination.vue';
import {ArrowLongLeftIcon, ArrowLongRightIcon} from "@heroicons/vue/24/solid/index.js";

export default {
  inheritAttrs: false,

  emits: ['pagination-change-page'],

  components: {
    ArrowLongRightIcon,
    ArrowLongLeftIcon,
    RenderlessPagination
  },

  props: {
    data: {
      type: Object,
      default: () => {
      }
    },
    limit: {
      type: Number,
      default: 0
    },
    keepLength: {
      type: Boolean,
      default: false
    },
  },

  methods: {
    onPaginationChangePage(page) {
      this.$emit('pagination-change-page', page);
    },
    isCurrentPage(page) {
      return this.data.current_page === page;
    }
  }
}
</script>
