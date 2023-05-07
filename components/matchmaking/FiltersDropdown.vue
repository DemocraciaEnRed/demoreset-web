<template>
  <Fragment>
    <p class="mb-4">
      Estado
    </p>
    <!-- <b-dropdown v-model="optionSelected" class="dropdown-filter" aria-role="list" expanded @change="changeOption"> -->
    <b-dropdown class="dropdown-filter" aria-role="list" expanded>
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
        Estado del llamado
      </b-dropdown-item>
      <!-- <b-dropdown-item v-for="state in CalltoStates" :key="`ct-dd-${hub.id}`" :value="state"> -->
      <b-dropdown-item>
        <!-- {{ state.name }} -->
        Activo
      </b-dropdown-item>
    </b-dropdown>
  </Fragment>
</template>
<script>
const Fragment = {
  functional: true,
  render: (h, ctx) => ctx.children
}
export default {
  name: 'FiltersDropdown',
  components: { Fragment }

}
</script>
