<template>
  <section class="py-5 mw-300">
    <h1 class="is-uppercase has-text-weight-bold is-size-4 pb-6 has-text-centered">
      {{ $t('login.title') }}
    </h1>
    <form>
      <b-field :label="$t('login.email')">
        <b-input v-model="email" type="email" :placeholder="$t('login.placeholderEmail')" />
      </b-field>
      <b-field :label="$t('login.password')">
        <b-input v-model="password" type="password" password-reveal :placeholder="$t('login.placeholderPassword')" />
      </b-field>
      <div class="pb-2 has-text-right">
        <a href="#" class="has-text-primary">{{ $t('login.forgotPassword') }}</a>
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
  </section>
</template>

<script>
export default {
  data: () => {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login () {
      if (!this.email || !this.password) {
        this.alertCustomError()
        return
      }
      const response = await this.$axios.$post('http://localhost:4000/api/auth/signin', {
        email: this.email,
        password: this.password
      })
      console.log(response)
      this.$store.dispatch('setToken', response.token)
    },
    alertCustomError () {
      this.$buefy.dialog.alert({
        title: 'Error',
        message: 'Todos los campos son requeridos',
        type: 'is-danger',
        hasIcon: true,
        icon: 'times-circle',
        iconPack: 'fa',
        ariaRole: 'alertdialog',
        ariaModal: true
      })
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
