<template>
  <section v-if="loggedIn && isAdmin && !loading" class="py-5 section container">
    <h1 class="is-uppercase has-text-weight-bold is-size-4 pb-6 has-text-centered">
      {{ $t('matchmaking.editCall') }}
    </h1>
    <div>
      <call-to-form :barriers="data.barriers" :callto="data.callto" :is-new-call="isNewCall" :edit-call="editCall" />
    </div>
  </section>
  <section v-else class="py-5 section container">
    <b-skeleton :animated="true" />
    <b-skeleton :animated="true" />
    <b-skeleton :animated="true" />
    <b-skeleton :animated="true" />
    <b-skeleton :animated="true" />
    <b-skeleton :animated="true" />
    <b-skeleton :animated="true" />
    <b-skeleton :animated="true" />
    <b-skeleton :animated="true" />
    <b-skeleton :animated="true" />
    <b-skeleton :animated="true" />
    <b-skeleton :animated="true" />
    <b-skeleton :animated="true" />
    <b-skeleton :animated="true" />
    <b-skeleton :animated="true" />
  </section>
</template>
<script>
import { actionNotification, alertCustomError } from '~/components/matchmaking/notifications.js'
import CallToForm from '~/components/matchmaking/CallToForm.vue'
export default {
  components: { CallToForm },
  async asyncData ({ i18n, $axios, $graphql, route, $config }) {
    try {
      const data = { barriers: [], callto: {} }
      const theQuery = {
        query: $graphql.getQueryForAllBarriers(i18n.localeProperties.iso)
      }
      const barriers = await $axios.post('/graphql', theQuery)
      data.barriers = [...barriers.data.data.barrier_types]

      const callto = await $axios.get(`${$config.expressApi}/callto/${route.params.id}`)
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
      isNewCall: false,
      loggedIn: false,
      isAdmin: false
    }
  },
  computed: {
    userFromStore () {
      const user = this.$store.state.user
      return user
    },
    checkIsAdmin () {
      return this.userFromStore ? !!this.userFromStore.roles.find(role => role.name === 'admin') : false
    }
  },
  mounted () {
    this.loggedIn = !!this.userFromStore
    this.isAdmin = this.checkIsAdmin
    this.$nextTick(() => {
      if (!this.isAdmin) { this.redirect() }
    })
  },
  methods: {
    editCall (callToDb) {
      if (callToDb.title === '' || callToDb.about === '' || callToDb.types.length === 0 || callToDb.country === '' || callToDb.location === '' || callToDb.endDate.length === 0 || callToDb.tags.length === 0 || callToDb.content === '<p></p>' || callToDb.content === '') {
        alertCustomError(this.$buefy, `${this.$t('matchmaking.emptyFields')}`)
        return
      }
      this.$axios.$patch(`${this.$config.expressApi}/callto/${this.$route.params.id}`, { ...callToDb })
        .then((response) => {
          actionNotification(this.$buefy, 3000, `${this.$t('matchmaking.editedCallToAlert')}`, 'is-success', 'check')
          console.log(response)
        }).catch((error) => {
          console.log(error)
        })
        .finally(() => {
          this.$router.push('/match')
        })
    },
    redirect () {
      if (this.loggedIn) {
        this.$router.push({ path: this.localePath('/match') })
      } else {
        this.$router.push({ path: this.localePath('/login') })
      }
    }
  }
}
</script>
