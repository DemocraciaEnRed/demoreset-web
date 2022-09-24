<template>
  <div class="card organization-card my-2">
    <div class="card-content">
      <div class="columns is-vcentered">
        <div v-if="initiativeorg.organization.logo" class="column is-narrow">
          <nuxt-link :to="{ path: localePath('/initiatives/' + initiativeorg.id) }">
            <img :src="`${apiUrl}/assets/${initiativeorg.organization.logo?.id}?width=120&height=120&fit=cover`" alt="Logo" class="organization-logo">
          </nuxt-link>
        </div>
        <div class="column">
          <div class="has-text-left ml-4">
            <p class="is-mono">
              {{ initiativeorg.organization?.name }}
            </p>
            <!-- ANALIZAR CONSISTENCIA DE DATOS ORGANIZACION - CONDICIONAL NECESARIO? -->
            <nuxt-link :to="{ path: localePath('/initiatives/' + initiativeorg.id) }" class="has-text-black">
              <h4 class="is-mono is-uppercase initiative-title has-text-weight-semibold is-size-5">
                {{ initiativeorg.title }}
              </h4>
            </nuxt-link>
          </div>
        </div>
        <div class="column is-3 has-text-right-desktop has-text-centered-touch">
          <div class="mb-5">
            <p class="has-text-weight-semibold mb-2">
              {{ $t('initiatives.card.startDate') }}:
            </p>
            <span>{{ initiativeorg.start_date }}</span>
          </div>
          <div>
            <p class="has-text-weight-semibold mb-2">
              {{ $t('initiatives.card.status') }}
            </p>
            <div>{{ initiativeorg.initiative_status == 'ongoing' ? $t('initiatives.ongoing') : $t('initiatives.finished') }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrganizationCard',
  props: {
    initiativeorg: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
    }
  },
  computed: {
    apiUrl () {
      return process.env.API_URL
    }
  }
}
</script>

<style lang="scss" scoped>
.organization-logo{
  width: 120px;
  height: auto;
}
</style>
