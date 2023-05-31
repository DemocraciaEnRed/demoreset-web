<template>
  <section v-if="!loading" class="py-5 section container">
    <h1 class="is-uppercase has-text-weight-bold is-size-4 pb-6 has-text-centered">
      Edit your call
    </h1>
    <call-to-form :barriers="data.barriers" :callto="data.callto" :is-new-call="isNewCall" :edit-call="editCall" />
  </section>
  <section v-else class="py-5 section container">
    NOT LOADED
  </section>
</template>
<script>
import { alertCustomError } from '~/components/matchmaking/notifications.js'
import CallToForm from '~/components/matchmaking/CallToForm.vue'
export default {
  components: { CallToForm },
  async asyncData ({ i18n, $axios, $graphql, route }) {
    try {
      const data = { barriers: [], callto: {} }
      const theQuery = { query: $graphql.getQueryForAllBarriers(i18n.localeProperties.iso) }

      const barriers = await $axios.post('/graphql', theQuery)
      data.barriers = [...barriers.data.data.barrier_types]

      const callto = await $axios.get(`http://localhost:4000/api/callto/${route.params.id}`)
      data.callto = { ...callto.data }
      return {
        data,
        loading: false
      }
    } catch (error) {
      console.log(error)
    }
  },
  data: () => {
    return {
      data: null,
      loading: true,
      isNewCall: false
    }
  },
  methods: {
    editCall (data) {
      console.log(data)
      if (data.title === '' || data.about === '' || data.types.length === 0 || data.country === '' || data.location === '' || data.endDate.length === 0 || data.tags.length === 0 || data.content === '' || data.content === '<p></p>' || data.content === '') {
        alertCustomError(this.$buefy, 'Debes completar todos los campos')
        return
      }
      this.$axios.$patch(`http://localhost:4000/api/callto/${this.$route.params.id}`, { data })
    }
  }
}
</script>
