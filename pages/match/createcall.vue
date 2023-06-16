<template>
  <section class="py-5 section container">
    <h1 class="is-uppercase has-text-weight-bold is-size-4 pb-6 has-text-centered">
      {{ $t('matchmaking.formCreateCall') }}
    </h1>
    <call-to-form :barriers="data" :is-new-call="isNewCall" :create-call="createCall" />
  </section>
</template>

<script>
import { actionNotification, alertCustomError } from '../../components/matchmaking/notifications.js'
import CallToForm from '~/components/matchmaking/CallToForm.vue'

export default {
  name: 'CreateCall',
  components: { CallToForm },
  async asyncData ({ i18n, $axios, $graphql }) {
    try {
      const theQuery = {
        query: $graphql.getQueryForAllBarriers(i18n.localeProperties.iso)
      }
      const response = await $axios.post('/graphql', theQuery)
      return {
        data: response.data.data.barrier_types,
        loading: false
      }
    } catch (error) {
      console.error(error)
      return {
        data: null,
        loading: false
      }
    }
  },
  data: () => {
    return {
      data: null,
      loading: true,
      isNewCall: true,
      loggedIn: false
    }
  },
  computed: {
    userFromStore () {
      const user = this.$store.state.user
      return user
    }
  },
  mounted () {
    this.loggedIn = !!this.userFromStore
    if (!this.loggedIn) {
      this.redirectToLogin()
    }
  },
  methods: {
    createCall (callToDb) {
      if (callToDb.title === '' || callToDb.about === '' || callToDb.tags.length === 0 || callToDb.types === '' || callToDb.country === '' || callToDb.location === '' || callToDb.endDate.length === 0 || callToDb.content === '' || callToDb.content === '<p></p>') {
        alertCustomError(this.$buefy, `${this.$t('matchmaking.emptyFields')}`)
        return
      }
      this.$axios.$post(`${this.$config.EXPRESS_API}/callto`, { ...callToDb })
        .then((response) => {
          actionNotification(this.$buefy, 3000, `${this.$t('matchmaking.createdCallToAlert')}`, 'is-success', 'check')
          console.log(response)
        }).catch((error) => {
          console.log(error)
        })
        .finally(() => {
          this.$router.push('/match')
        })
    },
    redirectToLogin () {
      this.$router.push({ path: this.localePath('/login') })
    }
  }
}
</script>
