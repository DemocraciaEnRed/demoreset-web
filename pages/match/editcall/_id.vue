<template>
  <section v-if="!loading" class="py-5 section container">
    <h1 class="is-uppercase has-text-weight-bold is-size-4 pb-6 has-text-centered">
      Edit your call
    </h1>
    <call-to-form :barriers="data.barriers" :callto="data.callto" :is-new-call="isNewCall" />
  </section>
  <section v-else class="py-5 section container">
    NOT LOADED
  </section>
</template>
<script>
import CallToForm from '~/components/matchmaking/CallToForm.vue'
export default {
  components: { CallToForm },
  async asyncData ({ i18n, $axios, $graphql, route }) {
    try {
      let loading = true
      const data = { barriers: [], callto: {} }
      const theQuery = { query: $graphql.getQueryForAllBarriers(i18n.localeProperties.iso) }

      const barriers = await $axios.post('/graphql', theQuery)
      data.barriers = [...barriers.data.data.barrier_types]
      console.log(data.barriers)

      const callto = await $axios.get(`http://localhost:4000/api/callto/${route.params.id}`)
      data.callto = {
        title: callto.data.title,
        about: callto.data.about,
        tags: callto.data.tags,
        types: callto.data.types,
        country: callto.data.country,
        location: callto.data.location,
        endDate: callto.data.endDate,
        content: callto.data.content
      }

      loading = false
      return {
        data,
        loading
      }
    } catch (error) {
      console.log(error)
    }
  },
  data: () => {
    return {
      data: null,
      isNewCall: false
    }
  },
  methods: {
    editCall (data) {
      this.$axios.$patch('http://localhost:4000/api/callto', { data })
    }
  }
}
</script>
