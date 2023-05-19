<template>
  <section class="py-5 mw-300">
    <h1 class="is-uppercase has-text-weight-bold is-size-4 pb-6 has-text-centered">
      {{ $t('register.title') }}
    </h1>
    <form>
      <b-field
        :label="$t('register.email')"
        :state="emailState"
        :message="emailMessage"
        :type="emailType"
      >
        <b-input
          v-model="email"
          type="email"
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
      <b-field :label="$t('register.organization')">
        <b-select v-model="organization" :placeholder="$t('register.placeholderOrganization')" required>
          <option v-for="org in organizationList" :key="org.id" :value="org.name">
            {{ org.name }}
          </option>
        </b-select>
      </b-field>
      <b-field
        :label="$t('register.password')"
        :state="passwordState"
        :message="passwordMessage"
        :type="passwordType"
      >
        <b-input v-model="password" type="password" :placeholder="$t('register.placeholderPassword')" required />
      </b-field>
      <b-field>
        <b-checkbox v-model="checkbox" type="is-pink">
          {{ $t('register.terms') }} <a href="#" class="has-text-pink">{{ $t('register.termsAnchor') }}</a>
        </b-checkbox>
      </b-field>
      <div class="has-text-centered">
        <b-button type="submit" class="login-button" @click="register">
          {{ $t('register.registerButton') }}
        </b-button>
      </div>
    </form>
  </section>
</template>

<script>
import { countriesEn, countriesEs } from '../static/index.js'
export default {
  data: () => {
    return {
      email: '',
      emailState: null,
      emailMessage: '',
      emailType: '',
      first_name: '',
      last_name: '',
      password: '',
      passwordState: null,
      passwordMessage: '',
      passwordType: '',
      organization: null,
      country: null,
      countriesEn,
      countriesEs,
      organizationList: [],
      checkbox: false
    }
  },
  async fetch () {
    const theQuery = {
      query: this.$graphql.getQueryForAllOrganizations()
    }
    const response = await this.$axios.post('/graphql', theQuery)
    this.organizationList = response.data.data.organizations
  },
  watch: {
    email (newEmail, oldEmail) {
      this.validateEmail()
    },
    password (newPassword, oldPassword) {
      this.validatePassword()
    },
    checkbox (newCheckbox, oldCheckbox) {
      this.validateCheckbox()
    }
  },
  methods: {
    register () {
      if (!this.email && !this.first_name && !this.last_name && !this.country && !this.organization && !this.password && !this.checkbox) {
        this.alertCustomError('')
        return
      }
      if (!this.emailState) {
        this.alertCustomError('El email no es válido')
        return
      }
      if (!this.passwordState) {
        this.alertCustomError('La contraseña no es válida')
        return
      }
      if (!this.checkbox) {
        this.alertCustomError('Debes aceptar los términos y condiciones')
        return
      }

      this.$axios.$post('http://localhost:4000/api/auth/signup', {
        email: this.email,
        first_name: this.first_name,
        last_name: this.last_name,
        country: this.country,
        password: this.password,
        organization: this.organization
      }).then((response) => {
        this.$buefy.dialog.alert({
          title: 'Success',
          message: 'Usuario creado correctamente',
          type: 'is-success',
          hasIcon: true,
          icon: 'check-circle',
          iconPack: 'fa',
          ariaRole: 'alertdialog',
          ariaModal: true
        })
        // redirect to the email validation view when ready
        this.$router.push({ path: this.localePath('/login') })
      }).catch((error) => {
        this.$buefy.dialog.alert({
          title: 'Error',
          message: error.response.data.message,
          type: 'is-danger',
          hasIcon: true,
          icon: 'times-circle',
          iconPack: 'fa',
          ariaRole: 'alertdialog',
          ariaModal: true
        })
      })
    },
    alertCustomError (prop) {
      this.$buefy.dialog.alert({
        title: 'Error',
        message: prop !== '' ? prop : 'Todos los campos son requeridos',
        type: 'is-danger',
        hasIcon: true,
        icon: 'times-circle',
        iconPack: 'fa',
        ariaRole: 'alertdialog',
        ariaModal: true
      })
    },
    validateEmail () {
      if (!this.email) {
        this.emailState = null
        this.emailMessage = ''
        return
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (emailRegex.test(this.email)) {
        this.emailState = true
        this.emailMessage = ''
        this.emailType = 'is-success'
      } else {
        this.emailState = false
        this.emailMessage = 'This email is invalid'
        this.emailType = 'is-danger'
      }
    },
    validatePassword () {
      const passwordRegex = /^[^\t\r\n\s.]{6,}$/
      if (!this.password) {
        this.passwordState = null
        this.passwordMessage = ''
      } else if (this.password.length < 6) {
        this.passwordState = false
        this.passwordMessage = 'La contraseña debe contener más de 6 caracteres'
        this.passwordType = 'is-danger'
      } else if (!passwordRegex.test(this.password)) {
        this.passwordState = false
        this.passwordMessage = 'La contraseña no puede contener espacios'
        this.passwordType = 'is-danger'
      } else {
        this.passwordState = true
        this.passwordMessage = ''
        this.passwordType = 'is-success'
      }
    },
    validateCheckbox () {
      if (!this.checkbox) {
        this.checkbox = false
      } else {
        this.checkbox = true
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
</style>