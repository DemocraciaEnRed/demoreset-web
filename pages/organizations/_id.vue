<template>
  <!-- all section pending -->
  <section class="section">
    <div class="box py-6">
      <div class="columns is-7">
        <div class="column is-offset-1 is-one-fifth is-flex is-align-items-center">
          <img :src="`${apiUrl}/assets/${initiativeorg.organization?.logo?.id}?width=238&height=238&fit=cover`" alt="Logo" class="mx-auto organization-logo">
        </div>
        <div class="column is-offset-1">
          <div class="title">
            DEMOCRACIA EN RED
            <p class="has-text-grey-lighter has-text-weight-normal is-size-7 is-inline-block">
              <i class="fa-solid fa-location-dot" />
              <span class="is-roboto"> Ciudad, País</span>
            </p>
          </div>
          <div class="block mt-1">
            HUB: América Latina
          </div>
          <div class="block">
            <div class="block">
              Temas de trabajo
            </div>
            <b-field>
              <b-tag class="is-mono" rounded>
                topic 1
              </b-tag>
            </b-field>
          </div>
          <div class="block">
            <div class="block">
              Barreras que enfrenta
            </div>
            <b-field>
              <b-tag class="is-mono" rounded>
                barrera 1
              </b-tag>
            </b-field>
          </div>
        </div>
        <div class="column is-3">
          <button class="button is-rounded is-medium is-uppercase is-mono">
            COPIAR CORREO
          </button>
          <div class="block has-text-grey-lighter mt-6">
            Web: <NuxtLink to="/">
              Organization webPage
            </NuxtLink>
          </div>
          <div class="block has-text-grey-lighter">
            Teléfono: <span has-text-black> +54 9 1100000000</span>
          </div>
          <div class="block has-text-grey-lighter">
            Correo: <a v-if="initiativeorg.organization?.email" :href="`mailto:${initiativeorg.organization?.email}`">{{ initiativeorg.organization?.email }}</a>
          </div>
        </div>
      </div>
      <TabOrganization :initiativeorg="initiativeorg" />
    </div>
  </section>
</template>

<script>
import TabOrganization from '~/components/organizations/TabOrganization.vue'
export default {
  name: 'OrganizationPage',
  components: {
    TabOrganization
  },
  async asyncData ({ params, $axios, i18n, $router, $graphql }) {
    const theQuery = {
      query: $graphql.getQueryForOrganizationById(params.id, i18n.localeProperties.iso)
    }
    try {
      const response = await $axios.post('/graphql', theQuery)
      const theOrganization = response.data.data.organizations_by_id
      $graphql.mergeFieldTranslations(theOrganization)
      return {
        initiativeorg: theOrganization
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err.response.data.errors[0].extensions)
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
.button {
  background: transparent;
  border: 2px solid #000;
  font-style: normal;
  font-weight: 500;
}
.maxContent{

  div{
  width: max-content;
  }
}

</style>
