<template>
  <div v-if="callExists">
    <div v-if="callTo.enabled || showForAdmin">
      <div v-if="callTo.owner !== undefined && loading !== true" class="container-fluid">
        <section class="hero has-background-grey-lighter">
          <div class="hero-body mx-6">
            <div class="is-flex us-flex-direction-row is-justify-content-space-between">
              <div class="columns is-multiline pb-6">
                <div v-if="callTo.owner.organization.logoUrl !== null" class="column is-narrow">
                  <figure class="image is-64x64">
                    <img :src="`${apiUrl}/assets/${callTo.owner.organization.logoUrl}?${transformationImage}`" class="is-rounded">
                  </figure>
                </div>
                <div class="column">
                  <p v-if="callTo.owner.organization.name !== null" class="is-mono has-text-weight-semibold">
                    {{ callTo.owner.organization.name }}
                  </p>
                  <p v-else class="is-mono has-text-weight-semibold">
                    {{ callTo.owner.first_name }}
                    {{ callTo.owner.last_name }}
                  </p>
                  <p v-if="$i18n.locale === 'es'">
                    {{ callTo.owner.organization.country_es }}
                  </p>
                  <p v-else>
                    {{ callTo.owner.organization.country_en }}
                  </p>
                </div>
                <div v-if="callTo.owner.organization.web !== null && callTo.owner.organization.web !== ''" class="column is-full">
                  <a :href="URLwhithHttpAdded" target="_blank"> {{ URLwhithHttpAdded }}</a>
                </div>
              </div>
              <div v-if="showForAdmin">
                <b-dropdown aria-role="list" position="is-bottom-left">
                  <template #trigger>
                    <b-button icon-right="menu-down" position="is-top-left" />
                  </template>
                  <nuxt-link :to="{ path: localePath(`/match/editcall/${$route.params.id}`) }">
                    <b-dropdown-item aria-role="listitem">
                      <i class="fa-sharp fa-solid fa-pencil" /> {{ $t('matchmaking.editCall') }}
                    </b-dropdown-item>
                  </nuxt-link>
                  <b-dropdown-item aria-role="listitem" @click="deleteCallTo">
                    <i class="fa-solid fa-trash-can" /> {{ $t('matchmaking.deleteCall') }}
                  </b-dropdown-item>
                </b-dropdown>
              </div>
            </div>
            <p class="title is-uppercase">
              {{ callTo.title }}
            </p>
            <p>{{ callTo.about }}</p>
            <div class="py-3">
              <div class="columns">
                <div class="column is-one-third">
                  <span class="is-mono has-text-weight-semibold is-uppercase">{{ $t('matchmaking.barrier') }}</span>
                  <hr class="divider mb-2">
                  <div class="is-flex is-flex-direction-row is-flex-wrap-wrap">
                    <div v-for="(tag, index) in tagNames" :key="index">
                      <span class="tag is-rounded has-background-grey-light mx-1" style="text-wrap: wrap">{{ tag }}</span>
                    </div>
                  </div>
                </div>
                <div class="column is-one-third">
                  <span class="is-mono has-text-weight-semibold is-uppercase">{{ $t('matchmaking.callType') }}</span>
                  <hr class="divider mb-2 ">
                  <div class="is-flex is-flex-direction-row is-flex-wrap-wrap">
                    <div v-for="(type, index) in callTo.types" :key="index">
                      <span class="tag is-rounded has-background-grey-light mx-1">{{ type | valueToName('types', $i18n.locale) }}</span>
                    </div>
                  </div>
                </div>
                <div class="column is-one-third">
                  <span class="is-mono has-text-weight-semibold is-uppercase">{{ $t('matchmaking.ubication') }}</span>
                  <hr class="divider mb-2">
                  <div class="is-flex is-flex-direction-row is-flex-wrap-wrap">
                    <span class="tag is-rounded has-background-grey-light mx-1">{{ callTo.country | valueToName('country', $i18n.locale) }}</span>
                    <span class="tag is-rounded has-background-grey-light mx-1">{{ callTo.location | valueToName('location', $i18n.locale) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div class="section container py-6">
            <div>
              <tip-tap-reader :content="callTo.content" class="box call-to-content" />
            </div>
            <div class="is-flex is-flex-direction-row is-align-items-center pt-6">
              <p class="is-condensed is-uppercase is-size-5 has-text-weight-semibold">
                {{ $t('matchmaking.answers') }}
              </p>
            </div>
            <div class="py-4">
              <lazy-comment-card />
            </div>
            <div class="columns is-multiline py-5">
              <div v-for="(comment, index) in callTo.comments" :key="index" class="column is-full">
                <lazy-response-card :commentprop="comment" />
              </div>
            </div>
          </div>
        </section>
      </div>
      <div v-else class="container-fluid">
        <section class="hero has-background-grey-lighter">
          <div class="hero-body mx-6">
            <article class="media">
              <figure class="media-left">
                <p class="image is-64x64">
                  <b-skeleton circle width="64px" height="64px" />
                </p>
              </figure>
              <div class="media-content">
                <div class="content">
                  <p>
                    <b-skeleton active />
                    <b-skeleton height="80px" />
                  </p>
                </div>
                <nav class="level is-mobile">
                  <div class="level-left">
                    <a class="level-item">
                      <span class="icon is-small">
                        <b-skeleton />
                      </span>
                    </a>
                    <a class="level-item">
                      <span class="icon is-small">
                        <b-skeleton />
                      </span>
                    </a>
                  </div>
                </nav>
              </div>
            </article>
          </div>
        </section>
        <section class="py-5 section container">
          <b-skeleton :animated="true" />
          <b-skeleton :animated="true" />
          <b-skeleton :animated="true" />
          <b-skeleton :animated="true" />
          <b-skeleton :animated="true" />
          <b-skeleton :animated="true" />
          <b-skeleton :animated="true" />
          <b-skeleton :animated="true" />
          <b-skeleton :animated="true" />
        </section>
      </div>
    </div>
    <div v-else class="noCall is-size-2">
      <h2>{{ $t('matchmaking.noCall') }}</h2>
      <nuxt-link :to="{ path: localePath('/match/') }">
        <b-button class="is-rounded my-2">
          {{ $t('matchmaking.backToCallList') }}
        </b-button>
      </nuxt-link>
    </div>
  </div>
  <div v-else>
    {{ redirect() }}
  </div>
</template>

<script>
import { countriesEn, countriesEs, calltoTypesEn, calltoTypesEs, locationEn, locationEs } from '../../static'
import { actionNotification } from '../../components/matchmaking/notifications.js'
// import ResponseCard from '../../components/matchmaking/ResponseCard.vue'
// import CommentCard from '../../components/matchmaking/CommentCard.vue'
// import TipTapReader from '~/components/matchmaking/TipTapReader.vue'

export default {
  name: 'MatchMakingId',
  filters: {
    valueToName (value, field, locale) {
      let source = []
      let searchField = ''
      if (field === 'country') {
        searchField = 'code'
        if (locale === 'es') {
          source = [...countriesEs]
        } else {
          source = [...countriesEn]
        }
      }
      if (field === 'location') {
        searchField = 'value'
        if (locale === 'es') {
          source = [...locationEs]
        } else {
          source = [...locationEn]
        }
      }
      if (field === 'types') {
        searchField = 'value'
        if (locale === 'es') {
          source = [...calltoTypesEs]
        } else {
          source = [...calltoTypesEn]
        }
      }
      const item = source.find(x => x[searchField] === value)
      return item.name
    }
  },
  data: () => {
    return {
      callTo: {},
      barriers: [],
      loading: true,
      showForAdmin: false,
      tagNames: [],
      transformationImage: 'transforms=[["resize", {"background":"rgb(255,255,255)","width": 150,"height": 150,"fit":"contain"}]]',
      callExists: true
    }
  },
  async fetch () {
    try {
      const { data } = await this.$axios.get(`${this.$config.expressApi}/callto/${this.$route.params.id}`)
      this.callTo = data
      const theQuery = {
        query: this.$graphql.getQueryForAllBarriers(this.$i18n.localeProperties.iso)
      }
      const response = await this.$axios.post('/graphql', theQuery)
      this.callExists = true
      this.barriers = response.data.data.barrier_types
      this.loading = false
    } catch (error) {
      if (error.response && error.response.status === 404) {
        this.callExists = false
      }
    }
  },
  computed: {
    userFromStore () {
      if (this.$store.state.user) { return this.$store.state.user }
      return null
    },
    apiUrl () {
      return this.$config.apiUrl
    },
    URLwhithHttpAdded () {
      if (!this.callTo.owner.organization.web) {
        return ''
      }
      if (!/^https?:\/\//i.test(this.callTo.owner.organization.web)) {
        return 'http://' + this.callTo.owner.organization.web
      }
      return this.callTo.owner.organization.web
    }
  },
  watch: {
    loading () {
      this.tagNames = this.getTagNames()
    }
  },
  mounted () {
    this.showForAdmin = this.checkIsAdmin()
  },
  methods: {
    redirect () {
      this.$router.push({ path: this.localePath('/match') })
    },
    checkIsAdmin () {
      if (this.userFromStore !== null) {
        const isAdmin = this.userFromStore.roles.find(role => role.name === 'admin')
        if (isAdmin) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    deleteCallTo () {
      this.$axios.delete(`${this.$config.expressApi}/callto/${this.$route.params.id}`)
        .then((res) => {
          actionNotification(this.$buefy, 3000, `${this.$t('matchmaking.deletedCallToAlert')}`, 'is-danger', 'trash-can')
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.$router.push({ path: this.localePath('match') })
        })
    },
    getTagNames () {
      const cTags = this.callTo.tags.map(t => this.barriers.find(barrier => barrier.field_name === t))
      const mappedTagNames = [...cTags].map(tag => tag.translations[0].name)
      return mappedTagNames
    },
    debug (v) {
      console.log(v)
    }
  }
}
</script>

<style lang="scss" scoped>
.divider {
  border: 1px solid #000;
  padding: 0;
  margin: 0;
}
// .web-margin{
//   margin-left: calc(64px + 1.5rem)
// }
.tag {
  border: 1px solid rgba(0, 0, 0, 0.12);
  height: auto;
}

.noCall {
  height: 60vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  button {
    border: 2px solid #000;
  }
}
</style>
