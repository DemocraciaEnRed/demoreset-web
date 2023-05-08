<template>
  <div class="columns is-mobile">
    <div class="column is-3">
      <FiltersDropdown />
    </div>
  </div>
</template>
<script>
import FiltersDropdown from './FiltersDropdown.vue'

export default {
  name: 'MatchmakingFilters',
  components: { FiltersDropdown }
}
</script>
