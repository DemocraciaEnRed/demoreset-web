<template>
  <div>
    <!-- <b-dropdown v-model="optionSelected" class="dropdown-filter" aria-role="list" expanded @change="changeOption"> -->
    <b-dropdown class="dropdown-filter" aria-role="list" expanded>
      <template #trigger="{ active }">
        <b-button
          label="Estado del llamado"
          type="is-white"
          expanded
          class="filter-button"
          :icon-right="active ? 'menu-up' : 'menu-down'"
        />
      </template>
      <b-dropdown-item>
        Inactivos
      </b-dropdown-item>
      <!-- <b-dropdown-item v-for="state in CalltoStates" :key="`ct-dd-${hub.id}`" :value="state"> -->
      <b-dropdown-item>
        <!-- {{ state.name }} -->
        Activos
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>
<script>

export default {
  name: 'FiltersDropdown'
}
</script>
