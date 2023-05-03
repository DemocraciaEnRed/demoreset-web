<template>
  <section class="py-5 mw-300">
    <b-field
      label="Nombre de usuario"
      type="is-success"
      message="This nombre is available"
    >
      <b-input v-model="name" value="deradmin" maxlength="30" />
    </b-field>
    <b-field
      label="Correo electrónico"
      type="is-danger"
      message="This email is invalid"
    >
      <b-input
        v-model="email"
        type="email"
        value="john@"
        maxlength="30"
      />
    </b-field>

    <b-field
      label="Nombre"
      type="is-success"
      message="This nombre is available"
    >
      <b-input v-model="name" value="Juan Carlos" maxlength="30" />
    </b-field>
    <b-field
      label="Apellido"
      type="is-success"
      message="This apellido está ok"
    >
      <b-input v-model="surname" value="Juan Carlos" maxlength="30" />
    </b-field>
    <b-field label="País">
      <b-select placeholder="Seleccione su país">
        <!-- <option v-for="c in options" :key="c.code" :value="c.code">
          {{ c.name }}
        </option> -->
      </b-select>
    </b-field>
    <b-field
      label="Password"
      type="is-warning"
      :message="['Password is too short', 'Password must have at least 8 characters']"
    >
      <b-input v-model="password" value="123" type="password" maxlength="30" />
    </b-field>

    <b-field>
      <b-checkbox type="is-pink">
        Acepto los <a href="#" class="has-text-pink">términos y condiciones</a>
      </b-checkbox>
    </b-field>
    <div class="has-text-centered">
      <b-button class="login-button" @click="register">
        Registrar
      </b-button>
    </div>
  </section>
</template>

<script>
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
      countries: []
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
        email: this.email,
        first_name: this.first_name,
        last_name: this.last_name,
        country: this.country,
        password: this.password
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
