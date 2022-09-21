<template>
  <section>
    <section class="section">
      <div class="container has-text-centered">
        <h2 class="mb-4 is-poppins is-uppercase initiatives-title">
          {{ $t('initiatives.title') }}
        </h2>
        <InitiativeList :initiatives="initiatives" />
      </div>
    </section>
    <section class="container my-6">
      <div class="has-text-left">
        <h3>Las iniciativas en graficos</h3>
      </div>
    </section>
  </section>
</template>

<script>
import InitiativeList from '../../components/initiatives/InitiativeList.vue'
export default {
  name: 'InitiativePage',
  components: {
    InitiativeList
  },
  async asyncData ({ params, $axios, i18n, $router, $graphql }) {
    const theQuery = {
      query: $graphql.getQueryForAllInitiatives()
    }
    try {
      const response = await $axios.post('/graphql', theQuery)
      // if status is not published, redirect to home
      // if (response.data.data.campaigns_by_id.status !== 'published') {
      //   $router.push('/')
      // }
      // console.log(response.data.data)
      const theInitiative = response.data.data.initiatives
      $graphql.mergeFieldTranslations(theInitiative)
      return {
        initiatives: theInitiative
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

<style lang="scss" scoped>
.initiatives-title {
  font-weight: 800;
  font-size: 40px;
  line-height: 60px;
}
</style>
