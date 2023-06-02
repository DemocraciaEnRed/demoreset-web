<template>
  <div class="container-fluid">
    <section class="hero">
      <div class="hero-body has-background-grey-lighter">
        <p class="title has-text-centered is-uppercase">
          {{ $t('matchmaking.title') }}
        </p>
      </div>
    </section>
    <section class="section container">
      <div v-if="!userFromStore">
        <button class="button is-rounded is-outlined is-roboto is-black is-medium button-position is-mono" @click="sendNotConnectedAlert">
          {{ $t('matchmaking.createCallButton') }}
        </button>
      </div>
      <div v-else>
        <nuxt-link :to="{path: localePath('/match/createcall')}">
          <button class="button is-rounded is-outlined is-roboto is-black is-medium button-position is-mono">
            {{ $t('matchmaking.createCallButton') }}
          </button>
        </nuxt-link>
      </div>
      <MatchmakingFilter />
      <div class="columns is-multiline">
        <div v-for="(ct, index) in callTo" :key="index" class="column is-6">
          <nuxt-link class="h-100" :to="{ path: localePath(`/match/${ct._id}`) }">
            <CallToBox :ct="ct" />
          </nuxt-link>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import MatchmakingFilter from '../../components/matchmaking/filters/MatchmakingFilter.vue'
import { notConnectedAlert } from '~/components/matchmaking/notifications'
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
  },
  computed: {
    userFromStore () {
      const user = this.$store.state.user
      return user
    }
  },
  methods: {
    sendNotConnectedAlert () {
      notConnectedAlert(this.$buefy, this.$t('matchmaking.notConnectedAlertTitle'), this.$t('matchmaking.notConnectedAlertMessage'), this.$t('matchmaking.notConnectedAlertButton'))
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
