<template>
  <div>
    <Navbar />
    <section class="section">
      <Nuxt />
    </section>
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
