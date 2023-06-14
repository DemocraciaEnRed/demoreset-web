<template>
  <section class="py-5 mw-300">
    <div class="has-text-centered py-4">
      <h1 class="is-uppercase has-text-weight-bold is-size-4 pb-6">
        {{ $t('login.changePasswordTitle') }}
      </h1>
      {{ $t('login.changePasswordSubtitle') }}
    </div>
    <form @submit.prevent="sendRecoveryEmail">
      <b-input
        v-model="password"
        type="password"
        password-reveal
        :placeholder="$t('login.password')"
        minlength="6"
        required
      />
      <b-button class="button mt-2" @click="sendRecoveryEmail">
        {{ $t('login.changePasswordButton') }}
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
      password: ''
    }
  },
  methods: {
    sendRecoveryEmail () {
      if (!this.password) {
        alertCustomError(this.$buefy, `${this.$t('login.emptyFieldErrorPassword')}`)
        return
      }
      this.$axios.$put(`/demoresetAPI/auth/forgotpassword/${this.$route.params.id}`, {
        password: this.password
      }).then((response) => {
        console.log(response)
        actionNotification(this.$buefy, 3000, 'Contraseña cambiada correctamente', 'is-success', 'check')
        setInterval(() => {
          this.$router.push({ path: '/login' })
        }, 3000)
      })
        .catch((error) => {
          console.log({ error })
          if (error.response.status === 498 || error.response.status === 404) {
            this.$buefy.dialog.confirm({
              title: `${this.$t('login.errorTokenTitle')}`,
              message: `${this.$t('login.errorTokenMsg')}`,
              type: 'is-danger',
              hasIcon: true,
              icon: 'times-circle',
              iconPack: 'fa',
              ariaRole: 'alertdialog',
              ariaModal: true,
              confirmText: `${this.$t('login.errorTokenConfirm')}`,
              cancelText: `${this.$t('login.errorTokenCancel')}`,
              onConfirm: () => {
                this.$router.push({ path: '/auth/forgotpassword' })
              },
              onCancel: () => {
                this.$router.push({ path: '/login' })
              }
            })
          } else {
            alertCustomError(this.$buefy, `${this.$t('login.genericError')}`)
          }
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
