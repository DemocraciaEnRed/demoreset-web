<template>
  <div v-if="loading">
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
        <div v-if="userFromStore === null">
          <b-navbar-item tag="nuxt-link" class="is-poppins is-500" :to="{path: localePath('/login')}">
            {{ $t('login.navbarLogin') }}
          </b-navbar-item>
        </div>
        <div v-else>
          <b-navbar-dropdown class="is-poppins is-500" :label="userFromStore.first_name" hoverable>
            <b-navbar-item @click="logout">
              {{ $t('login.navbarLogout') }}
            </b-navbar-item>
            <div v-if="userFromStore.roles.find(role => role.name === 'admin')">
              <b-navbar-item tag="nuxt-link" class="is-poppins is-500" :to="{path: localePath('/match/manage')}">
                {{ $t('adminpanel.title') }}
              </b-navbar-item>
            </div>
            <div v-else />
          </b-navbar-dropdown>
        </div>
        <b-navbar-item tag="div">
          <div class="buttons">
            <div v-if="$i18n.locale == 'en'">
              <nuxt-link :to="switchLocalePath('es')" class="button is-black is-rounded is-poppins">
                EN
              </nuxt-link>
            </div>
            <div v-else>
              <nuxt-link :to="switchLocalePath('en')" class="button is-black is-rounded is-poppins">
                ES
              </nuxt-link>
            </div>
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
  data: () => {
    return {
      loading: false
    }
  },
  computed: {
    availableLocales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    },
    userFromStore () {
      const user = this.$store.state.user
      return user
    }
  },
  mounted () {
    this.loading = true
  },
  methods: {
    logout () {
      this.$axios.$post('/demoresetAPI/auth/signout')
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
          this.$router.push({ path: this.localePath('/login') })
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
