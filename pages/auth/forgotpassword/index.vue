<template>
  <section class="py-5 mw-300">
    <div class="has-text-centered py-4">
      <h1 class="is-uppercase has-text-weight-bold is-size-4 pb-6">
        Recuperar contraseña
      </h1>
      <p>Al ingresar tu email, recibirás un correo electrónico con un enlace para continuar con el cambio de contraseña.</p>
    </div>
    <form>
      <b-field :label="$t('login.email')">
        <b-input v-model="email" type="email" :placeholder="$t('login.placeholderEmail')" />
      </b-field>
      <b-button class="button mt-2" @click="sendRecoveryEmail">
        Enviar email de recuperación
      </b-button>
    </form>
  </section>
</template>

<script>
import { alertCustomError, actionNotification } from '../../../components/matchmaking/notifications.js'
export default {
  data () {
    return {
      email: ''
    }
  },
  methods: {
    sendRecoveryEmail () {
      if (!this.email) {
        alertCustomError(this.$buefy, 'Debes ingresar un email')
        return
      }
      this.$axios.$post('http://localhost:4000/api/auth/forgotpassword', {
        email: this.email
      }).then((response) => {
        console.log(response)
        actionNotification(this.$buefy, 7000, 'Email de recuperación enviado', 'is-success', 'check')
      })
        .catch((error) => {
          console.log(error.response)
          if (error.response.status === 404) { return alertCustomError(this.$buefy, 'No existe un usuario con ese email') }
          alertCustomError(this.$buefy, 'Ocurrió un error, contacta a soporte')
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
