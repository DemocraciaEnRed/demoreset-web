<template>
  <div v-if="callTo.owner !== undefined && loading !== true" class="container-fluid">
    <section class="hero has-background-grey-lighter">
      <div class="hero-body mx-6">
        <div class="is-flex us-flex-direction-row is-justify-content-space-between">
          <div class="columns is-multiline pb-6">
            <div class="column is-narrow">
              <figure v-if="callTo.owner.organization.logoUrl !== null" class="image is-64x64">
                <img :src="`${apiUrl}/assets/${callTo.owner.organization.logoUrl}?${transformationImage}`" class="is-rounded">
              </figure>
            </div>
            <div class="column">
              <p class="is-mono has-text-weight-semibold">
                {{ callTo.owner.organization.name }}
              </p>
              <p v-if="$i18n.locale === 'es'">
                {{ callTo.owner.organization.country_es }}
              </p>
              <p v-else>
                {{ callTo.owner.organization.country_en }}
              </p>
            </div>
            <div class="column is-full web-margin">
              <a :href="URLwhithHttpsAdded" target="_blank"> {{ URLwhithHttpsAdded }}</a>
            </div>
          </div>
          <div v-if="userFromStore && checkIsAdmin()">
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
                <div v-for="(tag, index) in callTo.tags" :key="index">
                  <span class="tag is-rounded has-background-grey-light mx-1">{{ getTagName(tag) }}</span>
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
          <CommentCard />
        </div>
        <div class="columns is-multiline py-5">
          <div v-for="(comment, index) in callTo.comments" :key="index" class="column is-full">
            <ResponseCard :commentprop="comment" />
          </div>
        </div>
      </div>
    </section>
  </div>
  <div v-else>
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
</template>

<script>
import { countriesEn, countriesEs, calltoTypesEn, calltoTypesEs, locationEn, locationEs } from '../../static'
import { actionNotification } from '../../components/matchmaking/notifications.js'
import ResponseCard from '../../components/matchmaking/ResponseCard.vue'
import CommentCard from '../../components/matchmaking/CommentCard.vue'
import TipTapReader from '~/components/matchmaking/TipTapReader.vue'

export default {
  name: 'MatchMakingId',
  components: {
    ResponseCard,
    CommentCard,
    TipTapReader
  },
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
        console.log('type: ' + value)
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
      transformationImage: 'transforms=[["resize", {"background":"rgb(255,255,255)","width": 150,"height": 150,"fit":"contain"}]]'
    }
  },
  async fetch () {
    try {
      const { data } = await this.$axios.get(`http://localhost:4000/api/callto/${this.$route.params.id}`)
      this.callTo = data

      const theQuery = {
        query: this.$graphql.getQueryForAllBarriers(this.$i18n.localeProperties.iso)
      }
      const response = await this.$axios.post('/graphql', theQuery)
      this.barriers = response.data.data.barrier_types
      console.log(this.barriers)
      // console.log(this.callTo)
    } catch (error) {
      console.log(error)
    }
  },
  computed: {
    userFromStore () {
      if (this.$store.state.user) { return this.$store.state.user }
      return null
    },
    apiUrl () {
      return process.env.API_URL
    },
    URLwhithHttpsAdded () {
      if (!/^https?:\/\//i.test(this.callTo.owner.organization.web)) {
        return 'https://' + this.callTo.owner.organization.web
      }
      return this.callTo.owner.organization.web
    }
  },
  mounted () {
    this.loading = false
  },
  methods: {
    checkIsAdmin () {
      if (this.userFromStore) {
        const isAdmin = this.userFromStore.roles.find(role => role.name === 'admin')
        if (isAdmin) {
          return true
        } else {
          return false
        }
      }
    },
    deleteCallTo () {
      this.$axios.delete(`http://localhost:4000/api/callto/${this.$route.params.id}`)
        .then((res) => {
          actionNotification(this.$buefy, 3000, `${this.$t('matchmaking.deletedCallToAlert')}`, 'is-danger', 'trash-can')
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.$router.push({ path: this.localePath('match') })
        })
    },
    getTagName (t) {
      console.log(t)
      const tag = this.barriers.find(barrier => barrier.field_name === t)
      return tag.translations[0].name
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
.web-margin{
  margin-left: calc(64px + 1.5rem)
}
.tag {
  border: 1px solid rgba(0, 0, 0, 0.12);
}
</style>
