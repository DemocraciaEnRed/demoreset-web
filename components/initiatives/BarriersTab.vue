<template>
  <section class="section">
    <div v-for="category in barrierCategories" :key="`category-${category.id}`">
      <h1 class="title is-mono is-3 is-size-4-touch my-6 has-text-black is-uppercase">
        <i class="fas fa-arrow-right" />&nbsp; {{ category.name }}
      </h1>
      <div v-for="type in category.barrier_types" :key="`type-${type.id}`" class="ml-5">
        <h1 class="title is-mono is-4 is-size-5-touch my-5 is-800 has-text-black is-uppercase">
          {{ type.name }}
        </h1>
        <div v-if="isArray(initiative[type.field_name])" class="content">
          <ul v-for="barrier in initiative[type.field_name]" :key="`barrier-${barrier.barrier_id}`" class="ml-5">
            <li class="">
              {{ barrier.barriers_id.name }}
            </li>
          </ul>
        </div>
        <div v-else-if="isObject(initiative[type.field_name])">
          <ul class="ml-5">
            <li class="">
              {{ barrier.barriers_id.name }}
            </li>
          </ul>
        </div>
        <div v-else>
          <p class="ml-5">
            {{ $t('initiatives.noData') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'BarriersTab',
  props: {
    initiative: {
      type: Object,
      default: null
    },
    barrierCategories: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      activeTab: 0
    }
  },
  methods: {
    isArray (value) {
      return Array.isArray(value)
    },
    isObject (value) {
      return typeof value === 'object'
    }
  }
}
</script>
