<template>
  <section>
    <section class="section">
      <div class="container">
        <h2 class="mb-6 has-text-centered is-poppins is-uppercase initiatives-title">
          {{ $t('initiatives.title') }}
        </h2>
        <InitiativeFilters :hubs="hubs" :barrier-categories="barrierCategories" :barrier-types="barrierTypes" @update="updateQuery" />
        <InitiativeList :query="query" />
      </div>
    </section>
    <!-- <section class="container my-6">
      <div class="has-text-left">
        <h3>Las iniciativas en graficos</h3>
      </div>
    </section> -->
  </section>
</template>

<script>
import InitiativeList from '../../components/initiatives/InitiativeList.vue'
import InitiativeFilters from '../../components/initiatives/InitiativeFilters.vue'
export default {
  name: 'InitiativePage',
  components: {
    InitiativeList,
    InitiativeFilters
  },
  async asyncData ({ params, query, $axios, i18n, $router, $graphql }) {
    const theQuery = {
      query: $graphql.getQueryForInitiativeFilters(i18n.localeProperties.iso)
      // query: {
      // ...$graphql.getQueryForAllInitiativesList(i18n.localeProperties.iso),
      // $graphql.getQueryForInitiativeFilters(i18n.localeProperties.iso)
      // }
    }
    try {
      const response = await $axios.post('/graphql', theQuery)

      const theHubs = response.data.data.hubs
      const theBarrierCategories = response.data.data.barrier_categories
      const theBarrierTypes = response.data.data.barrier_types
      $graphql.mergeFieldTranslations(theHubs)
      $graphql.mergeFieldTranslations(theBarrierCategories)
      $graphql.mergeFieldTranslations(theBarrierTypes)

      const listQuery = {
        hub: null,
        barrierCategory: null,
        barrierType: null,
        barrier: null
      }
      // get hub from the query
      if (query.hub) {
        listQuery.hub = theHubs.find(hub => hub.id === query.hub)
      }

      return {
        hubs: theHubs,
        barrierCategories: theBarrierCategories,
        barrierTypes: theBarrierTypes,
        query: listQuery
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err.response.data.errors[0].extensions)
    }
  },
  data () {
    return {
      hubs: [],
      barrierCategories: [],
      barrierTypes: [],
      query: {
        hub: null,
        barrierCategory: null,
        barrierType: null,
        barrier: null
      }
    }
  },
  head () {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    return {
      title: `${this.$t('initiatives.head.title')} - ${this.$t('head.title')}`,
      htmlAttrs: {
        lang: this.$i18n.locale
      },
      meta: [
        { hid: 'description', name: 'description', content: this.$t('head.description') },
        { name: 'title', content: `${this.$t('initiatives.head.title')} - ${this.$t('head.title')}` },
        { name: 'description', content: this.$t('head.description') },
        { property: 'og:title', content: `${this.$t('initiatives.head.title')} - ${this.$t('head.title')}` },
        { property: 'og:description', content: this.$t('head.description') },
        { property: 'twitter:title', content: `${this.$t('initiatives.head.title')} - ${this.$t('head.title')}` },
        { property: 'twitter:description', content: this.$t('head.description') },
        ...i18nHead.meta
      ],
      link: [
        ...i18nHead.link
      ]
    }
  },
  methods: {
    updateQuery (theQuery) {
      this.$set(this, 'query', theQuery)
    }
  }
}
</script>

<style lang="scss" scoped>
.initiatives-title {
  font-weight: 800;
  font-size: 40px;
  line-height: 60px;
}
</style>
