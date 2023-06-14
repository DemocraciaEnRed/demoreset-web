<template>
  <section class="section container">
    <h1 class="has-text-centered is-size-1">
      {{ $t('matchmaking.accountValidation') }}
    </h1>
    <h2 class="has-text-centered is-size-2">
      {{ response.message }}
    </h2>
    <nuxt-link :to="{ path: localePath('/login') }">
      <button v-if="status !== null && status === 200" class="login-button">
        {{ $t('login.title') }}
      </button>
    </nuxt-link>
  </section>
</template>

<script>
export default {
  async asyncData ({ params, $axios }) {
    try {
      const response = await $axios.get(`/demoresetAPI/auth/validate/${params.id}`)
      console.log(response.status)
      return {
        status: response.status,
        response: response.data
      }
    } catch (error) {
      console.log(error.response.data.message)
      return {
        response: error.response.data,
        status: error.response.status
      }
    }
  },
  data () {
    return {
      response: null,
      status: null
    }
  }
}
</script>

<style scoped>
section {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
}

.login-button {
  margin-top: 20px;
  height: 30px;
  width: 200%;
  max-width: 200%;
  border-radius: 10px;
  border: 2px solid #000;
}

</style>
