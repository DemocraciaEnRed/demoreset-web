<template>
  <section class="py-5 mw-300">
    <div class="has-text-centered py-4">
      <h1 class="is-uppercase has-text-weight-bold is-size-4 pb-6">
        {{ $t('login.recoveryPasswordTitle') }}
      </h1>
      <p> {{ $t('login.recoveryPasswordSubtitle') }}</p>
    </div>
    <form @submit.prevent="sendRecoveryEmail">
      <b-field :label="$t('login.email')">
        <b-input v-model="email" type="email" :placeholder="$t('login.placeholderEmail')" />
      </b-field>
      <b-button class="button mt-2" @click="sendRecoveryEmail">
        {{ $t('login.recoveryPasswordButton') }}
      </b-button>
    </form>
  </section>
</template>

<script>
import { alertCustomError, actionNotification } from '../../../components/matchmaking/notifications.js'
export default {
  inject: ['$t'],
  data () {
    return {
      email: ''
    }
  },
  methods: {
    sendRecoveryEmail () {
      if (!this.email) {
        alertCustomError(this.$buefy, `${this.$t('login.emptyFieldError')}`)
        return
      }
      this.$axios.$post(`${this.$config.EXPRESS_API}/auth/forgotpassword`, {
        email: this.email
      }).then((response) => {
        console.log(response)
        actionNotification(this.$buefy, 7000, `${this.$t('login.sucessMessage')}`, 'is-success', 'check')
      })
        .catch((error) => {
          console.log(error.response)
          if (error.response.status === 404) { return alertCustomError(this.$buefy, `${this.$t('login.userNotFound')}`) }
          alertCustomError(this.$buefy, `${this.$t('login.genericError')}`)
        })
    }
  }
}
</script>

<style scoped>
.button {
  width: 100%;
  max-width: 100%;
  border-radius: 10px;
  border: 2px solid #000;
}
.mw-300 {
  max-width: 300px;
  margin: auto;
}
</style>
