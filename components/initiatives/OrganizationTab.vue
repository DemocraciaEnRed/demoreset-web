<template>
  <section class="section">
    <div class="columns mt-5">
      <div v-if="initiative.organization && initiative.organization.logo" class="column is-2">
        <img :src="`${apiUrl}/assets/${initiative.organization.logo.id}?width=120&height=120&fit=cover`" alt="">
      </div>
      <div class="column is-half">
        <div>
          <h3 class="is-inline mr-4 is-condensed is-uppercase">
            {{ initiative.organization.name }}
          </h3>
          <span class="is-mono"><i class="fa-solid fa-location-dot" /> {{ initiative.country.name }}</span>
        </div>
        <div class="mt-5">
          <p>{{ $t('initiatives.organizationTab.contactInfo') }}</p>
          <p v-if="initiative.organization.web" class="is-mono">
            <span>WEB:</span> <a :href="`${initiative.organization.web}`" target="_blank" class="is-uppercase">{{ initiative.organization.web }}</a>
          </p>
          <p v-else class="is-mono is-uppercase">
            WEB: {{ $t('initiatives.noData') }}
          </p>
          <p v-if="initiative.organization.email" class="is-mono">
            <span>EMAIL:</span> <a :href="`mailto:${initiative.organization.email}` " class="is-uppercase">{{ initiative.organization.email }}</a>
          </p>
          <p v-else class="is-mono is-uppercase">
            EMAIL: {{ $t('initiatives.noData') }}
          </p>
        </div>
      </div>
      <div class="column">
        <nuxt-link :to="{path: localePath('/organizations/' + initiative.organization.id)}">
          <button class="button is-rounded is-uppercase is-mono">
            {{ $t('initiatives.organizationTab.profileButton') }}
          </button>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'OrganizationTab',
  props: {
    initiative: {
      type: Object,
      default: null
    }
  },
  computed: {
    apiUrl () {
      return this.$config.apiUrl
    }
  }
}
</script>

<style scoped>
  .button {
    border: 2px solid #000;
    font-weight: 500;
  }
</style>
