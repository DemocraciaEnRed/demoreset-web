<template>
  <div>
    <Navbar />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'
import Footer from '~/components/Footer'

export default {
  name: 'DefaultLayout',
  components: {
    Navbar,
    Footer
  },
  data () {
    return {
      items: []
    }
  }
}
</script>
