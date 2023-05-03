<template>
  <section class="py-5 mw-300">
    <b-field
      label="Nombre de usuario"
      type="is-success"
      message="This nombre is available"
    >
      <b-input v-model="username" placeholder="Ingresa tu nombre de usuario" autofocus required />
    </b-field>
    <b-field
      label="Correo electrónico"
      type="is-danger"
      message="This email is invalid"
    >
      <b-input
        v-model="email"
        placeholder="Ingresa tu correo electrónico"
        maxlength="30"
        required
      />
    </b-field>

    <b-field
      label="Nombre"
    >
      <b-input v-model="first_name" placeholder="Ingresa tu nombre" required />
    </b-field>
    <b-field
      label="Apellido"
    >
      <b-input v-model="last_name" placeholder="Ingresa tu apellido" required />
    </b-field>
    <b-field label="País">
      <b-select v-if="$i18n.locale == 'es'" v-model="country" placeholder="Selecciona tu país" required>
        <option v-for="c in countriesEs" :key="c.code" :value="c.code">
          {{ c.name }}
        </option>
      </b-select>
      <b-select v-else v-model="country" placeholder="Selecciona tu país" required>
        <option v-for="c in countriesEn" :key="c.code" :value="c.code">
          {{ c.name }}
        </option>
      </b-select>
    </b-field>

    <b-field
      label="Organización"
    >
      <b-input v-model="organization" placeholder="Ingresa tu organización (si tienes)" />
    </b-field>

    <b-field
      label="Contraseña"
      type="is-warning"
      :message="['Password is too short', 'Password must have at least 8 characters']"
    >
      <b-input v-model="password" type="password" placeholder="Ingresa tu contraseña" required />
    </b-field>

    <b-field>
      <b-checkbox type="is-pink">
        Acepto los <a href="#" class="has-text-pink">términos y condiciones</a>
      </b-checkbox>
    </b-field>
    <div class="has-text-centered">
      <b-button class="login-button" @click="register">
        Registrarme
      </b-button>
    </div>
  </section>
</template>

<script>
import { countriesEn, countriesEs } from '../static/index.js'
export default {
  data: () => {
    return {
      username: '',
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      organization: '',
      country: '',
      countriesEn,
      countriesEs
    }
  },
  //   computed: {
  //     getCountries () {
  //       const countries = this.$t('register.countries')
  //       console.log(countries)
  //       return countries
  //     }
  //   },
  methods: {
    async register () {
      const response = await this.$axios.$post('http://localhost:4000/api/auth/signup', {
        username: this.username,
        email: this.email,
        first_name: this.first_name,
        last_name: this.last_name,
        country: this.country,
        password: this.password,
        organization: this.organization
      })
      console.log(response)
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
</style>
