<template>
  <div v-if="!loading" class="container-fluid">
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
      <!-- <MatchmakingFilter :filter-change="filterChange" /> -->
      <div v-if=" callTo.length > 0 && enabledCallToCount > 0" class="columns is-multiline">
        <div v-for="(ct, index) in callTo" :key="index" class="column is-6">
          <nuxt-link class="h-100" :to="{ path: localePath(`/match/${ct._id}`) }">
            <CallToBox :ct="ct" :barriers="barriers" />
          </nuxt-link>
        </div>
      </div>
      <section v-else class="hero">
        <div class="hero-body">
          <p class="title has-text-centered is-uppercase">
            {{ $t('matchmaking.noCalls') }}
          </p>
        </div>
      </section>
    </section>
  </div>
  <!-- SKELETON -->
  <div v-else>
    <div class="container-fluid">
      <section class="hero">
        <div class="hero-body has-background-grey-lighter">
          <b-skeleton :animated="true" />
        </div>
      </section>
      <section class="section container">
        <div class="columns is-multiline">
          <div v-for="x in 6" :key="x" class="column is-6">
            <div class="box is-flex is-flex-direction-column">
              <b-skeleton :animated="true" />
              <b-skeleton :animated="true" />
              <b-skeleton :animated="true" />
              <b-skeleton :animated="true" />
              <b-skeleton :animated="true" />
              <b-skeleton :animated="true" />
              <b-skeleton :animated="true" />
              <b-skeleton :animated="true" />
              <b-skeleton :animated="true" />
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
// import MatchmakingFilter from '../../components/matchmaking/filters/MatchmakingFilter.vue'
import { notConnectedAlert } from '~/components/matchmaking/notifications'
import CallToBox from '~/components/matchmaking/CallToBox.vue'

export default {
  name: 'MatchmakingPage',
  components: {
    CallToBox
    // MatchmakingFilter
  },
  data: () => {
    return {
      callTo: [],
      barriers: [],
      loading: true,
      enabledCallToCount: 0
    }
  },
  async fetch () {
    try {
      const { data } = await this.$axios.get(`${process.env.EXPRESS_API}/callto`)
      this.callTo = data
      for (const ct of data) {
        if (ct.enabled === true) {
          this.enabledCallToCount++
        }
      }
    } catch (error) {
      console.log(error)
    }
    try {
      const theQuery = {
        query: this.$graphql.getQueryForAllBarriers(this.$i18n.localeProperties.iso)
      }
      const response = await this.$axios.post('/graphql', theQuery)
      this.barriers = response.data.data.barrier_types

      this.loading = false
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
    // filterChange (value) {
    //   const ctCopy = [...this.callto]
    //   if (value === 0) { this.filteredCalls = ctCopy }
    //   if (value === 1) {
    //     this.filteredCalls = ctCopy.filter(ct => )
    //   }
    // }
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
