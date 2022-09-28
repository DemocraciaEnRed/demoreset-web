<template>
  <div class="card organization-card my-2">
    <div class="card-content">
      <div class="columns is-vcentered">
        <div v-if="initiative.organization?.logo" class="column is-narrow">
          <nuxt-link :to="{ path: localePath('/initiatives/' + initiative.id) }">
            <img :src="`${apiUrl}/assets/${initiative.organization.logo?.id}?width=120&height=120`" alt="Logo" class="organization-logo">
          </nuxt-link>
        </div>
        <div class="column">
          <div class="has-text-left ml-4">
            <p class="is-mono">
              {{ initiative.organization?.name }} <a v-if="initiative.organization?.email" :href="`mailto:${initiative.organization?.email}`"><i class="fas fa-envelope has-text-primary fa-lg" /></a>
            </p>
            <!-- ANALIZAR CONSISTENCIA DE DATOS ORGANIZACION - CONDICIONAL NECESARIO? -->
            <nuxt-link :to="{ path: localePath('/initiatives/' + initiative.id) }" class="has-text-black">
              <h4 class="is-mono is-uppercase has-text-weight-semibold is-size-5">
                {{ initiative.title }}
              </h4>
            </nuxt-link>
          </div>
        </div>
        <div class="column is-3 has-text-right-desktop has-text-centered-touch">
          <div class="mb-5">
            <p class="has-text-weight-semibold mb-2">
              {{ $t('initiatives.card.startDate') }}:
            </p>
            <span>{{ initiative.start_date }}</span>
          </div>
          <div>
            <p class="has-text-weight-semibold mb-2">
              {{ $t('initiatives.card.status') }}
            </p>
            <div>{{ initiative.initiative_status == 'ongoing' ? $t('initiatives.ongoing') : $t('initiatives.finished') }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InitiativeCard',
  props: {
    initiative: {
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
