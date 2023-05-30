<template>
  <section class="py-5 mw-300">
    <div class="has-text-centered py-4">
      <h1 class="is-uppercase has-text-weight-bold is-size-4 pb-6">
        Cambiar contraseña
      </h1>
      <p>Ingresa la nueva contraseña para tu cuenta</p>
    </div>
    <form>
      <b-field label="Contraseña">
        <b-input
          v-model="password"
          type="password"
          password-reveal
          placeholder="Contraseña"
          minlength="6"
          required
        />
      </b-field>
      <b-button class="button mt-2" @click="sendRecoveryEmail">
        Cambiar contraseña
      </b-button>
    </form>
  </section>
</template>

<script>
import { alertCustomError, actionNotification } from '../../../components/matchmaking/notifications.js'
export default {
  data () {
    return {
      password: ''
    }
  },
  methods: {
    sendRecoveryEmail () {
      if (!this.password) {
        alertCustomError(this.$buefy, 'Debes ingresar tu nueva contraseña')
        return
      }
      this.$axios.$put(`http://localhost:4000/api/auth/forgotpassword/${this.$route.params.id}`, {
        password: this.password
      }).then((response) => {
        console.log(response)
        actionNotification(this.$buefy, 3000, 'Contraseña cambiada correctamente', 'is-success', 'check')
        // setInterval(() => {
        //   this.$router.push({ path: '/login' })
        // }, 3000)
      })
        .catch((error) => {
          console.log({ error })
          if (error.response.status === 498 || error.response.status === 404) {
            this.$buefy.dialog.confirm({
              title: 'Token inválido',
              message: 'El link de recuperación de contraseña ha expirado o no existe. <br> Por favor, solicita un nuevo link de recuperación de contraseña.',
              type: 'is-danger',
              hasIcon: true,
              icon: 'times-circle',
              iconPack: 'fa',
              ariaRole: 'alertdialog',
              ariaModal: true,
              confirmText: 'Volver a solicitar',
              cancelText: 'Cancelar',
              onConfirm: () => {
                this.$router.push({ path: '/auth/forgotpassword' })
              },
              onCancel: () => {
                this.$router.push({ path: '/login' })
              }
            })
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
