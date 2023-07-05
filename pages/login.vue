<template>
  <section class="py-5 mw-300">
    <div v-if="!loggedIn">
      <h1 class="is-uppercase has-text-weight-bold is-size-4 pb-6 has-text-centered">
        {{ $t('login.title') }}
      </h1>
      <form @keypress.enter="login">
        <b-field :label="$t('login.email')">
          <b-input v-model="email" type="email" :placeholder="$t('login.placeholderEmail')" />
        </b-field>
        <b-field :label="$t('login.password')">
          <b-input v-model="password" type="password" password-reveal :placeholder="$t('login.placeholderPassword')" />
        </b-field>
        <div class="pb-2 has-text-right">
          <nuxt-link :to="{ path: localePath('/auth/forgotpassword') }">
            {{ $t('login.forgotPassword') }}
          </nuxt-link>
        </div>
        <div class="has-text-centered mt-1">
          <b-button type="submit" class="login-button" @click.prevent="login">
            {{ $t('login.title') }}
          </b-button>
        </div>
        <div class="divider" />
        <div>
          <p class="is-uppercase has-text-weight-medium is-size-5 has-text-centered">
            {{ $t('login.registerTitle') }}
          </p>
          <nuxt-link :to="{path: localePath('/register')}">
            <b-button class="login-button mt-2">
              {{ $t('login.registerButton') }}
            </b-button>
          </nuxt-link>
        </div>
      </form>
    </div>
    <div v-else>
      {{ redirect() }}
    </div>
  </section>
</template>

<script>
import { alertCustomError } from '../components/matchmaking/notifications.js'
export default {
  data: () => {
    return {
      email: '',
      password: '',
      loading: false,
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
  },
  methods: {
    login () {
      if (!this.email || !this.password) {
        alertCustomError(this.$buefy, 'Todos los campos son requeridos')
        return
      }
      this.loading = true
      this.$axios.$post(`${this.$config.expressApi}/auth/signin`, {
        email: this.email.toLocaleLowerCase(),
        password: this.password
      }).then(async (response) => {
        await this.$store.dispatch('setToken', response.token)
        return this.$axios.$get(`${this.$config.expressApi}/users/me`)
      }).then(async (response) => {
        await this.$store.dispatch('setUser', response)
        this.$store.dispatch('clearLoginError')
        // push the user to home
        this.$router.push({ path: this.localePath('/') })
      })
        .catch(async (err) => {
          if (err.response.status === 403) {
            alertCustomError(this.$buefy, 'Tu usuario no está activo, revisa tu correo electrónico')
          }
          if (err.response.status === 401) {
            alertCustomError(this.$buefy, 'Usuario o contraseña incorrectos, intenta nuevamente')
          }
          this.$store.dispatch('clearToken')
          this.$store.dispatch('clearUser')
          await this.$store.dispatch('setLoginError', err.response.data.message)
          // show an error message or something
        })
        .finally(() => {
          this.loading = false
        })
    },
    redirect () {
      if (this.loggedIn) {
        this.$router.push({ path: this.localePath('/') })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-button {
  width: 100%;
  max-width: 100%;
  border-radius: 10px;
  border: 2px solid #000;
}

.mw-300 {
    max-width: 300px;
    margin: auto;
}

/* centered divider 80px */
.divider {
  position: relative;
  margin: 20px auto;
  width: 80px;
  height: 2px;
  background-color: #CACACA;
}
</style>
