<template>
  <div>
    <b-navbar id="navbar-custom" wrapper-class="container" :spaced="true">
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: localePath('/') }">
          <img
            src="@/assets/img/logo-navbar.svg"
            alt="Demoreset"
          >
        </b-navbar-item>
      </template>

      <template #end>
        <b-navbar-item tag="nuxt-link" class="is-poppins is-500" :to="{path: localePath('/hubs')}">
          {{ $t('navbar.hubs') }}
        </b-navbar-item>
        <b-navbar-item tag="nuxt-link" class="is-poppins is-500" :to="{path: localePath('/initiatives')}">
          {{ $t('navbar.initiatives') }}
        </b-navbar-item>
        <b-navbar-item tag="nuxt-link" class="is-poppins is-500" :to="{path: localePath('/masterclasses')}">
          {{ $t('navbar.masterclass') }}
        </b-navbar-item>
        <b-navbar-item tag="nuxt-link" class="is-poppins is-500" :to="{path: localePath('/match')}">
          Match
        </b-navbar-item>
        <b-navbar-item tag="nuxt-link" class="is-poppins is-500" :to="{path: localePath('/about')}">
          {{ $t('navbar.about') }}
        </b-navbar-item>
        <b-navbar-item tag="nuxt-link" class="is-poppins is-500" :to="{path: localePath('/contact')}">
          {{ $t('navbar.contact') }}
        </b-navbar-item>
        <b-navbar-item v-if="!userFromStore" tag="nuxt-link" class="is-poppins is-500" :to="{path: localePath('/login')}">
          {{ $t('navbar.login') }}
        </b-navbar-item>
        <b-navbar-dropdown v-else class="is-poppins is-500" :label="userFromStore.first_name" hoverable>
          <b-navbar-item @click="logout">
            Log out
          </b-navbar-item>
        </b-navbar-dropdown>
        <b-navbar-item tag="div">
          <div class="buttons">
            <nuxt-link v-if="$i18n.locale == 'en'" :to="switchLocalePath('es')" class="button is-black is-rounded is-poppins">
              EN
            </nuxt-link>
            <nuxt-link v-else :to="switchLocalePath('en')" class="button is-black is-rounded is-poppins">
              ES
            </nuxt-link>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
    <hr class="has-background-black my-0">
  </div>
</template>

<script>
export default {
  name: 'NavbarComponent',
  computed: {
    availableLocales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    },
    userFromStore () {
      const user = this.$store.state.user
      return user
    }
  },
  methods: {
    logout () {
      this.$axios.$post('http://localhost:4000/api/auth/signout')
        .then(async (response) => {
          await this.$store.dispatch('setToken', null)
          this.$store.dispatch('clearToken')
        }).then(async (response) => {
          await this.$store.dispatch('setUser', null)
          this.$store.dispatch('clearUser')
          this.$store.dispatch('clearLoginError')
          // push the user to home
          this.$router.push({ path: this.localePath('/') })
        })
        .catch(async (err) => {
          await this.$store.dispatch('setLoginError', err.response.data.message)
          // show an error message or something
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
hr{
  height: 0.5px;
}
</style>
