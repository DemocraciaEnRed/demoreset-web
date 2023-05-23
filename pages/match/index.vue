<template>
  <div class="container-fluid">
    <section class="hero">
      <div class="hero-body has-background-grey-lighter">
        <p class="title has-text-centered is-uppercase">
          Conecta y colabora
        </p>
      </div>
    </section>
    <section class="section container">
      <nuxt-link :to="{path: localePath('/match/createcall')}">
        <button class="button is-rounded is-outlined is-roboto is-black is-medium button-position is-mono">
          Crear llamada
        </button>
      </nuxt-link>
      <MatchmakingFilter />
      <div class="columns is-6">
        <div v-for="(ct, index) in callTo" :key="index" class="column">
          <nuxt-link :to="`/match/${ct._id}`">
            <CallToBox :ct="ct" />
          </nuxt-link>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import MatchmakingFilter from '../../components/matchmaking/filters/MatchmakingFilter.vue'
import CallToBox from '~/components/matchmaking/CallToBox.vue'

export default {
  name: 'MatchmakingPage',
  components: {
    CallToBox,
    MatchmakingFilter
  },
  data: () => {
    return {
      callTo: []
    }
  },
  async fetch () {
    try {
      const { data } = await this.$axios.get('http://localhost:4000/api/callto')
      this.callTo = data
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
<style lang="scss" scoped>

.button-position{
 position: absolute;
 right: 0;
 top: 0;
 margin-top: -24px;
}

</style>
