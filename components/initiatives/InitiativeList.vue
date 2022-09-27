<template>
  <section>
    <div class="columns">
      <div class="column">
        <b-dropdown aria-role="list">
          <template #trigger="{ active }">
            <p>Hub</p>
            <b-button
              label="Hubs"
              :icon-right="active ? 'menu-up' : 'menu-down'"
              class="button-hub my-5"
            />
          </template>

          <b-dropdown-item aria-role="listitem" class="dropdown">
            <label class="checkbox">
              <input type="checkbox">
              {{ $t('initiatives.filtersList.SSA') }}
            </label>
          </b-dropdown-item>
          <b-dropdown-item aria-role="listitem" class="dropdown">
            <label class="checkbox">
              <input type="checkbox">
              {{ $t('initiatives.filtersList.EE') }}
            </label>
          </b-dropdown-item>
          <b-dropdown-item aria-role="listitem" class="dropdown">
            <label class="checkbox">
              <input type="checkbox">
              {{ $t('initiatives.filtersList.IN') }}
            </label>
          </b-dropdown-item>
          <b-dropdown-item aria-role="listitem">
            <label class="checkbox">
              <input type="checkbox">
              {{ $t('initiatives.filtersList.SEA') }}
            </label>
          </b-dropdown-item>
        </b-dropdown>
      </div>

      <div class="column">
        <b-dropdown aria-role="list" disabled>
          <template #trigger="{ active }">
            <p>{{ $t('initiatives.filtersList.barrierTypes') }}</p>
            <b-button
              :label="$t('initiatives.filtersList.barrierTypes')"
              :icon-right="active ? 'menu-up' : 'menu-down'"
              class="button-hub my-5"
            />
          </template>

          <!-- <b-dropdown-item aria-role="listitem" class="dropdown">
            <label class="checkbox">
              <input type="checkbox">
              America Latina
            </label>
          </b-dropdown-item>
          <b-dropdown-item aria-role="listitem" class="dropdown">
            <label class="checkbox">
              <input type="checkbox">
              Africa Sub-sahariana
            </label>
          </b-dropdown-item>
          <b-dropdown-item aria-role="listitem" class="dropdown">
            <label class="checkbox">
              <input type="checkbox">
              Europa del Este
            </label>
          </b-dropdown-item>
          <b-dropdown-item aria-role="listitem" class="dropdown">
            <label class="checkbox">
              <input type="checkbox">
              India
            </label>
          </b-dropdown-item>
          <b-dropdown-item aria-role="listitem">
            <label class="checkbox">
              <input type="checkbox">
              Sudeste asiático
            </label>
          </b-dropdown-item> -->
        </b-dropdown>
      </div>

      <div class="column">
        <b-dropdown aria-role="list" disabled>
          <template #trigger="{ active }">
            <p>{{ $t('initiatives.filtersList.category') }}</p>
            <b-button
              :label="$t('initiatives.filtersList.category')"
              :icon-right="active ? 'menu-up' : 'menu-down'"
              class="button-hub my-5"
            />
          </template>

          <!-- <b-dropdown-item aria-role="listitem" class="dropdown">
            <label class="checkbox">
              <input type="checkbox">
              America Latina
            </label>
          </b-dropdown-item>
          <b-dropdown-item aria-role="listitem" class="dropdown">
            <label class="checkbox">
              <input type="checkbox">
              Africa Sub-sahariana
            </label>
          </b-dropdown-item>
          <b-dropdown-item aria-role="listitem" class="dropdown">
            <label class="checkbox">
              <input type="checkbox">
              Europa del Este
            </label>
          </b-dropdown-item>
          <b-dropdown-item aria-role="listitem" class="dropdown">
            <label class="checkbox">
              <input type="checkbox">
              India
            </label>
          </b-dropdown-item>
          <b-dropdown-item aria-role="listitem">
            <label class="checkbox">
              <input type="checkbox">
              Sudeste asiático
            </label>
          </b-dropdown-item> -->
        </b-dropdown>
      </div>

      <div class="column">
        <b-dropdown aria-role="list" disabled>
          <template #trigger="{ active }">
            <p>{{ $t('initiatives.filtersList.topic') }}</p>
            <b-button
              :label="$t('initiatives.filtersList.topicLabel')"
              :icon-right="active ? 'menu-up' : 'menu-down'"
              class="button-hub my-5"
            />
          </template>

          <!-- <b-dropdown-item aria-role="listitem" class="dropdown">
            <label class="checkbox">
              <input type="checkbox">
              America Latina
            </label>
          </b-dropdown-item>
          <b-dropdown-item aria-role="listitem" class="dropdown">
            <label class="checkbox">
              <input type="checkbox">
              Africa Sub-sahariana
            </label>
          </b-dropdown-item>
          <b-dropdown-item aria-role="listitem" class="dropdown">
            <label class="checkbox">
              <input type="checkbox">
              Europa del Este
            </label>
          </b-dropdown-item>
          <b-dropdown-item aria-role="listitem" class="dropdown">
            <label class="checkbox">
              <input type="checkbox">
              India
            </label>
          </b-dropdown-item>
          <b-dropdown-item aria-role="listitem">
            <label class="checkbox">
              <input type="checkbox">
              Sudeste asiático
            </label>
          </b-dropdown-item> -->
        </b-dropdown>
      </div>
    </div>
    <InitiativeCard v-for="initiative in initiatives" :key="`initiative-${initiative.id}`" :initiative="initiative" />
  </section>
</template>

<script>
import InitiativeCard from './InitiativeCard.vue'

export default {
  name: 'InitiativeList',
  components: {
    InitiativeCard
  },
  props: {
    initiatives: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown {
  text-align: left;
  margin: auto;
}

.button-hub {
  width: 300px;
  display: flex;
  justify-content: space-between;
}
</style>
