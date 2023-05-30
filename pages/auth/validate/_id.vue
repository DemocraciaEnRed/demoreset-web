<template>
  <section class="section container">
    <h1 class="has-text-centered">
      Accout validation
    </h1>
    <h2 class="has-text-centered">
      {{ response.message }}
    </h2>
  </section>
</template>

<script>
export default {
  async asyncData ({ params, $axios }) {
    try {
      const response = await $axios.get(`http://localhost:4000/api/auth/validate/${params.id}`)
      console.log(response.data.message)
      return {
        response: response.data
      }
    } catch (error) {
      console.log(error.response.data.message)
      return {
        response: error.response.data
      }
    }
  },
  data () {
    return {
      response: null
    }
  }
}
</script>

<style>

</style>
