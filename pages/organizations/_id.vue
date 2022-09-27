<template>
  <!-- all section pending -->
  <section class="section">
    <div class="container">
      <div class="box">
        <TabOrganization :initiativeorg="initiativeorg" />
      </div>
    </div>
  </section>
</template>

<script>
import TabOrganization from '../../components/organizations/TabOrganization.vue'
export default {
  name: 'OrganizationPage',
  components: {
    TabOrganization
  },
  async asyncData ({ params, $axios, i18n, $router, $graphql }) {
    const theQuery = {
      query: $graphql.getQueryForInitiativeById(params.id, i18n.localeProperties.iso)
    }
    try {
      const response = await $axios.post('/graphql', theQuery)
      const theInitiative = response.data.data.initiatives_by_id
      $graphql.mergeFieldTranslations(theInitiative)
      return {
        initiativeorg: theInitiative
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err.response.data.errors[0].extensions)
    }
  },
  data () {
    return {
    }
  }
}
</script>
