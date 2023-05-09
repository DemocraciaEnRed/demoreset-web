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
      <button class="button is-rounded is-outlined is-roboto is-black is-medium button-position is-mono">
        Crear llamada
      </button>
      <MatchmakingFilter />
      <div class="columns is-6">
        <div class="column">
          <CallToBox />
        </div>
        <div class="column">
          <CallToBox :active-box="false" />
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
