<template>
  <!-- all section pending -->
  <section class="section">
    <div class="box py-6">
      <div class="columns is-7">
        <div class="column is-offset-1 is-one-fifth is-flex is-align-items-center">
          <img :src="`${apiUrl}/assets/${initiativeorg.logo.id}?width=238&height=238&fit=cover`" alt="Logo" class="mx-auto organization-logo">
        </div>
        <div class="column is-offset-1">
          <div class="title">
            {{ initiativeorg.name }}
            <p class="has-text-grey has-text-weight-normal is-size-7 is-inline-block">
              <i class="fa-solid fa-location-dot" />
              <span class="is-roboto">{{ initiativeorg.locations }}</span>
            </p>
          </div>
          <div v-for="(initiatives, i) in initiativeorg.initiatives" :key="i" class="block mt-1">
            HUB: {{ initiatives.country.hub.name }}
          </div>
          <div class="block">
            <div class="block">
              {{ $t('organizations.workTopics') }}
            </div>
            <b-field>
              <b-tag class="is-mono is-medium" rounded>
                topic 1
              </b-tag>
            </b-field>
          </div>
          <div class="block">
            <div class="block">
              {{ $t('organizations.barriersFaced') }}
            </div>
            <b-field>
              <b-tag class="is-mono is-medium" rounded>
                barrera 1
              </b-tag>
            </b-field>
          </div>
        </div>
        <div class="column is-3">
          <!-- <button class="button is-rounded is-medium is-uppercase is-mono">
            COPIAR CORREO
          </button> -->
          <div class="block has-text-grey mt-5">
            {{ $t('organizations.telephone') }}: <span has-text-black>{{ initiativeorg.whatsapp ? initiativeorg.whatsapp : $t('organizations.noData') }}</span>
          </div>
          <div v-if="initiativeorg.email" class="block has-text-grey">
            Email: <a v-if="initiativeorg.email" :href="`mailto:${initiativeorg.email}`">{{ initiativeorg.email }}</a>
          </div>
          <div v-else class="block has-text-grey">
            Email: {{ $t('organizations.noData') }}
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
  head () {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    return {
      title: `${this.$t('head.title')}`,
      htmlAttrs: {
        lang: this.$i18n.locale
      },
      meta: [
        { hid: 'description', name: 'description', content: this.$t('head.description') },
        { name: 'title', content: this.$t('head.title') },
        { name: 'description', content: this.$t('head.description') },
        { property: 'og:title', content: this.$t('head.title') },
        { property: 'og:description', content: this.$t('head.description') },
        { property: 'twitter:title', content: this.$t('head.title') },
        { property: 'twitter:description', content: this.$t('head.description') },
        ...i18nHead.meta
      ],
      link: [
        ...i18nHead.link
      ]
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
