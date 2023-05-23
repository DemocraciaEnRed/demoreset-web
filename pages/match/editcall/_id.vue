<template>
  <section class="py-5 section container">
    <h1 class="is-uppercase has-text-weight-bold is-size-4 pb-6 has-text-centered">
      Edit your call
    </h1>
  </section>
</template>
<script>
export default {
  asyncData: ($route, $axios) => {
    try {
      const { data } = $axios.get(`http://localhost:4000/api/callto/${$route.params.id}`)
      return data
    } catch (error) {
      console.log(error)
    }
  },
  data: () => {
    return {
      data: null,
      content: 'Escribe el contenido de tu llamado aquí'
    }
  },
  methods: {
    editCall () {
      this.$axios.$patch('http://localhost:4000/api/callto', {
      })
    }
  }
}
</script>
