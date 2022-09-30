<template>
  <section>
    <div class="columns">
      <div class="column is-3">
        <p class="mb-4">
          {{ $t('initiatives.filters.hubs') }}
        </p>
        <b-dropdown v-model="hubSelected" class="dropdown-filter" aria-role="list" expanded @change="changeHub">
          <template #trigger="{ active }">
            <b-button
              :label="hubLabel"
              type="is-white"
              expanded
              class="filter-button"
              :icon-right="active ? 'menu-up' : 'menu-down'"
            />
          </template>

          <b-dropdown-item :value="null">
            {{ $t('initiatives.filters.anyHub') }}
          </b-dropdown-item>
          <b-dropdown-item v-for="hub in hubs" :key="`hub-dd-${hub.id}`" :value="hub">
            {{ hub.name }}
          </b-dropdown-item>
        </b-dropdown>
      </div>
      <div class="column is-3">
        <p class="mb-4">
          {{ $t('initiatives.filters.barrierCategories') }}
        </p>
        <b-dropdown v-model="barrierCategorySelected" class="dropdown-filter" aria-role="list" expanded @change="changeBarrierCategory">
          <template #trigger="{ active }">
            <b-button
              :label="barrierCategoryLabel"
              type="is-white"
              expanded
              class="filter-button"
              :icon-right="active ? 'menu-up' : 'menu-down'"
            />
          </template>

          <b-dropdown-item :value="null">
            {{ $t('initiatives.filters.anyBarrierCategory') }}
          </b-dropdown-item>
          <b-dropdown-item v-for="barrierCategory in barrierCategories" :key="`barrierCategory-dd-${barrierCategory.id}`" :value="barrierCategory">
            {{ barrierCategory.name }}
          </b-dropdown-item>
        </b-dropdown>
      </div>
      <div class="column is-3">
        <p class="mb-4">
          {{ $t('initiatives.filters.barrierTypes') }}
        </p>
        <b-dropdown v-model="barrierTypeSelected" class="dropdown-filter" aria-role="list" expanded @change="changeBarrierType">
          <template #trigger="{ active }">
            <b-button
              :label="barrierTypeLabel"
              type="is-white"
              expanded
              class="filter-button"
              :disabled="!barrierCategorySelected"
              :icon-right="active ? 'menu-up' : 'menu-down'"
            />
          </template>

          <b-dropdown-item :value="null">
            {{ $t('initiatives.filters.anyBarrierType') }}
          </b-dropdown-item>
          <b-dropdown-item v-for="barrierType in barrierTypesFilteredByCategory" :key="`barrierType-dd-${barrierType.id}`" :value="barrierType">
            {{ barrierType.name }}
          </b-dropdown-item>
        </b-dropdown>
      </div>
      <div class="column is-3">
        <p class="mb-4">
          {{ $t('initiatives.filters.barriers') }}
        </p>
        <b-dropdown v-model="barrierSelected" class="dropdown-filter" aria-role="list" expanded @change="changeBarrier">
          <template #trigger="{ active }">
            <b-button
              :label="barrierLabel"
              type="is-white"
              expanded
              class="filter-button"
              :disabled="!barrierTypeSelected"
              :icon-right="active ? 'menu-up' : 'menu-down'"
            />
          </template>

          <b-dropdown-item :value="null">
            {{ $t('initiatives.filters.anyBarrier') }}
          </b-dropdown-item>
          <b-dropdown-item v-for="barrier in barriersFilteredByType" :key="`barrier-dd-${barrier.id}`" :value="barrier">
            {{ barrier.name }}
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    hubs: {
      type: Array,
      default: () => []
    },
    barrierCategories: {
      type: Array,
      default: () => []
    },
    barrierTypes: {
      type: Array,
      default: () => []
    },
    barriers: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      hubSelected: null,
      barrierCategorySelected: null,
      barrierTypeSelected: null,
      barrierSelected: null
    }
  },
  computed: {
    hubLabel () {
      return this.hubSelected ? this.hubSelected.name : this.$t('initiatives.filters.selectHub')
    },
    barrierCategoryLabel () {
      return this.barrierCategorySelected ? this.barrierCategorySelected.name : this.$t('initiatives.filters.selectBarrierCategory')
    },
    barrierTypeLabel () {
      return this.barrierTypeSelected ? this.barrierTypeSelected.name : this.$t('initiatives.filters.selectBarrierType')
    },
    barrierLabel () {
      return this.barrierSelected ? this.barrierSelected.name : this.$t('initiatives.filters.selectBarrier')
    },
    barrierTypesFilteredByCategory () {
      if (!this.barrierCategorySelected) {
        return []
      }
      return this.barrierTypes.filter(barrierType => barrierType.category.id === this.barrierCategorySelected.id)
    },
    barriersFilteredByType () {
      if (!this.barrierTypeSelected) {
        return []
      }
      return this.barrierTypeSelected.barriers
    }
  },
  mounted () {
    // get query params from $route
    // const { hub, barrierCategory, barrierType, barrier } = this.$route.query
    const { hub } = this.$route.query
    if (hub) {
      this.hubSelected = this.hubs.find(h => h.id === hub)
    }
  },
  methods: {
    changeHub (hub) {
      this.$nextTick(() => {
        this.emitUpdate()
      })
    },
    changeBarrierCategory (bc) {
      this.barrierTypeSelected = null
      this.barrierSelected = null
      this.$nextTick(() => {
        this.emitUpdate()
      })
    },
    changeBarrierType (bt) {
      this.barrierSelected = null
      this.$nextTick(() => {
        this.emitUpdate()
      })
    },
    changeBarrier (b) {
      this.$nextTick(() => {
        this.emitUpdate()
      })
    },
    emitUpdate () {
      this.$emit('update', {
        hub: this.hubSelected,
        barrierCategory: this.barrierCategorySelected,
        barrierType: this.barrierTypeSelected,
        barrier: this.barrierSelected
      })
    }
  }
  // watch: {
  //   hubSelected (hub) {
  //     this.$emit('hubSelected', hub)
  //   },
  //   barrierCategorySelected (barrierCategory) {
  //     this.$emit('barrierCategorySelected', barrierCategory)
  //   },
  //   barrierTypeSelected (barrierType) {
  //     this.$emit('barrierTypeSelected', barrierType)
  //   },
  //   topicSelected (topic) {
  //     this.$emit('topicSelected', topic)
  //   }
  // }
}
</script>

<style>

</style>
