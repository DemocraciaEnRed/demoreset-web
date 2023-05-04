<template>
  <section class="py-5 mw-300">
    <h1 class="is-uppercase has-text-weight-bold is-size-4 pb-6 has-text-centered">
      {{ $t('register.title') }}
    </h1>
    <b-field
      :label="$t('register.email')"
      type="is-danger"
      message="This email is invalid"
    >
      <b-input
        v-model="email"
        :placeholder="$t('register.placeholderEmail')"
        maxlength="30"
        required
      />
    </b-field>

    <b-field
      :label="$t('register.firstName')"
    >
      <b-input v-model="first_name" :placeholder="$t('register.placeholderFirstName')" required />
    </b-field>
    <b-field
      :label="$t('register.lastName')"
    >
      <b-input v-model="last_name" :placeholder="$t('register.placeholderLastName')" required />
    </b-field>
    <b-field :label="$t('register.country')">
      <b-select v-if="$i18n.locale == 'es'" v-model="country" placeholder="Ingresa tu país" required>
        <option v-for="c in countriesEs" :key="c.code" :value="c.code">
          {{ c.name }}
        </option>
      </b-select>
      <b-select v-else v-model="country" placeholder="Enter your country" required>
        <option v-for="c in countriesEn" :key="c.code" :value="c.code">
          {{ c.name }}
        </option>
      </b-select>
    </b-field>

    <b-field label="Selecciona tu organización">
      <b-select v-model="organization" placeholder="Selecciona tu organización" required>
        <option v-for="org in organizationList" :key="org.id" :value="org.name">
          {{ org.name }}
        </option>
      </b-select>
    </b-field>
    <!--
    <b-field
      :label="$t('register.organization')"
    >
      <b-input v-model="organization" :placeholder="$t('register.placeholderOrganization')" />
    </b-field> -->

    <b-field
      :label="$t('register.password')"
      type="is-warning"
      :message="['Password is too short', 'Password must have at least 8 characters']"
    >
      <b-input v-model="password" type="password" :placeholder="$t('register.placeholderPassword')" required />
    </b-field>

    <b-field>
      <b-checkbox type="is-pink">
        {{ $t('register.terms') }} <a href="#" class="has-text-pink">{{ $t('register.termsAnchor') }}</a>
      </b-checkbox>
    </b-field>
    <div class="has-text-centered">
      <b-button class="login-button" @click="register">
        {{ $t('register.registerButton') }}
      </b-button>
    </div>
  </section>
</template>

<script>
import { countriesEn, countriesEs } from '../static/index.js'
export default {
  data: () => {
    return {
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      organization: '',
      country: '',
      countriesEn,
      countriesEs,
      organizationList: []
    }
  },
  async fetch () {
    const theQuery = {
      query: this.$graphql.getQueryForAllOrganizations()
    }
    const response = await this.$axios.post('/graphql', theQuery)
    this.organizationList = response.data.data.organizations
  },
  methods: {
    async register () {
      const response = await this.$axios.$post('http://localhost:4000/api/auth/signup', {
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
