<template>
  <section class="section container">
    <h1 class="is-uppercase has-text-weight-bold is-size-4 pb-6 has-text-centered">
      Ingresar
    </h1>
    <b-field label="Correo electrónico">
      <b-input v-model="email" type="email" placeholder="Ingresa tu email" />
    </b-field>
    <b-field label="Contraseña">
      <b-input v-model="password" type="password" password-reveal placeholder="Ingresa tu contraseña" />
    </b-field>
    <div class="has-text-centered">
      <b-button class="login-button" @click="login">
        Ingresar
      </b-button>
    </div>
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
      const response = await this.$axios.$post('http://localhost:4000/api/auth/signin', {
        email: this.email,
        password: this.password
      })
      console.log(response)
    }
  }
}
</script>

<style scoped>
.login-button {
  width: 100%;
  max-width: 50%;
  border-radius: 10px;
  border: 2px solid #000;
}
</style>
