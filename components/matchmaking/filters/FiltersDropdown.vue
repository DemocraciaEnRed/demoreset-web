<template>
  <div>
    <b-dropdown v-model="statusFilter" aria-role="list" expanded>
      <template v-if="statusFilter === 0" #trigger>
        <b-button
          :label="$t('matchmaking.filterAll')"
          type="is-primary"
          icon-right="menu-down"
        />
      </template>
      <template v-else-if="statusFilter === 1" #trigger>
        <b-button
          :label="$t('matchmaking.filterOpen')"
          type="is-primary"
          icon-right="menu-down"
        />
      </template>
      <template v-else #trigger>
        <b-button
          :label="$t('matchmaking.filterEnded')"
          type="is-primary"
          icon-right="menu-down"
        />
      </template>
      <b-dropdown-item :value="0" aria-role="listitem">
        {{ $t('matchmaking.filterAll') }}
      </b-dropdown-item>
      <b-dropdown-item :value="1" aria-role="listitem">
        {{ $t('matchmaking.filterOpen') }}
      </b-dropdown-item>
      <b-dropdown-item :value="2" aria-role="listitem">
        {{ $t('matchmaking.filterEnded') }}
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>
<script>

export default {
  name: 'FiltersDropdown',
  data () {
    return {
      statusFilter: 0
    }
  },
  watch: {
    statusFilter () {

    }
  }
}
</script>
