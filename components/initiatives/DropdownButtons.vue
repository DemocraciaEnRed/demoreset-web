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
          </b-dropdown-item>
        </b-dropdown>
      </div>

      <div class="column">
        <b-dropdown aria-role="list">
          <template #trigger="{ active }">
            <p>Tipología de barrera</p>
            <b-button
              label="Tipo de barrera"
              :icon-right="active ? 'menu-up' : 'menu-down'"
              class="button-hub my-5"
            />
          </template>

          <b-dropdown-item aria-role="listitem" class="dropdown">
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
          </b-dropdown-item>
        </b-dropdown>
      </div>

      <div class="column">
        <b-dropdown aria-role="list">
          <template #trigger="{ active }">
            <p>Categoría</p>
            <b-button
              label="Categoría"
              :icon-right="active ? 'menu-up' : 'menu-down'"
              class="button-hub my-5"
            />
          </template>

          <b-dropdown-item aria-role="listitem" class="dropdown">
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
          </b-dropdown-item>
        </b-dropdown>
      </div>

      <div class="column">
        <b-dropdown aria-role="list">
          <template #trigger="{ active }">
            <p>Tema</p>
            <b-button
              label="Falta de garantía de..."
              :icon-right="active ? 'menu-up' : 'menu-down'"
              class="button-hub my-5"
            />
          </template>

          <b-dropdown-item aria-role="listitem" class="dropdown">
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
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
    <OrganizationCard :initiatives="initiatives" />
  </section>
</template>

<script>
import OrganizationCard from './organizationCard.vue'

export default {
  name: 'DropdownButtons',
  components: {
    OrganizationCard
  },
  props: {
    initiatives: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
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
