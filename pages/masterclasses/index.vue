<template>
  <section class="section">
    <div class="container">
      <p class="is-condensed is-size-4 is-500">
        MASTERCLASSES DISPONIBLES
      </p>
      <hr class="mt-2 mb-6" style="width: 600px; background-color: #000">
      <div class="columns">
        <div v-for="masterclass in publishedMasterclasses" :key="masterclass.id" class="column is-6">
          <div class="box is-clickable" @click="goToMasterclass(masterclass.id)">
            <div class="columns is-vcentered">
              <div class="column is-narrow">
                <img :src="`${apiUrl}g/assets/${masterclass.author_avatar.id}`" class="image author_avatar" :alt="masterclass.author">
              </div>
              <div class="column">
                <p class="has-text-red is-300 is-condensed">
                  MASTERCLASS
                </p>
                <p class="is-mono is-uppercase mb-3 is-size-5">
                  <b>{{ masterclass.title }}</b>
                </p>
                <p class="is-size-7">
                  <b>Objetivo:</b>
                </p>
                <p class="is-size-7">
                  {{ trimText(masterclass.objective,150 ) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br>
      <p class="is-condensed is-size-4 is-500">
        PROXIMAMENTE
      </p>
      <hr class="mt-2 mb-6" style="width: 600px; background-color: #000">
      <div class="columns">
        <div v-for="masterclass in upcomingMasterclasses" :key="masterclass.id" class="column is-6">
          <div class="box is-clickable" @click="goToMasterclass(masterclass.id)">
            <div class="columns is-vcentered">
              <div class="column is-narrow">
                <img :src="`${apiUrl}/assets/${masterclass.author_avatar.id}`" class="image author_avatar" :alt="masterclass.author">
              </div>
              <div class="column">
                <p class="has-text-red is-300 is-condensed">
                  MASTERCLASS
                </p>
                <p class="is-mono is-uppercase mb-3 is-size-5">
                  <b>{{ masterclass.title }}</b>
                </p>
                <p class="is-size-7">
                  <b>Objetivo:</b>
                </p>
                <p class="is-size-7">
                  {{ trimText(masterclass.objective,150 ) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'MasterclassesPage',
  async asyncData ({ params, $axios, i18n, $router, $graphql }) {
    const theQuery = {
      query: $graphql.getQueryAllMasterclasses(i18n.localeProperties.iso)
    }
    try {
      const response = await $axios.post('/graphql', theQuery)
      const masterclasses = response.data.data.masterclasses
      $graphql.mergeFieldTranslations(masterclasses)
      return {
        masterclasses
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err.response.data.errors[0].extensions)
    }
  },
  data () {
    return {
      masterclasses: []
    }
  },
  head () {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    return {
      title: `Masterclasses - ${this.$t('head.title')}`,
      htmlAttrs: {
        lang: this.$i18n.locale
      },
      meta: [
        { hid: 'description', name: 'description', content: this.$t('head.description') },
        { name: 'title', content: `Masterclasses - ${this.$t('head.title')}` },
        { name: 'description', content: this.$t('head.description') },
        { property: 'og:title', content: `Masterclasses - ${this.$t('head.title')}` },
        { property: 'og:description', content: this.$t('head.description') },
        { property: 'twitter:title', content: `Masterclasses - ${this.$t('head.title')}` },
        { property: 'twitter:description', content: this.$t('head.description') },
        ...i18nHead.meta
      ],
      link: [
        ...i18nHead.link
      ]
    }
  },
  computed: {
    apiUrl () {
      return this.$config.apiUrl
    },
    publishedMasterclasses () {
      return this.masterclasses.filter(masterclass => masterclass.status === 'published')
    },
    upcomingMasterclasses () {
      return this.masterclasses.filter(masterclass => masterclass.status === 'upcoming')
    }
  },
  methods: {
    trimText (text, length) {
      if (text.length > length) {
        return text.substring(0, length) + '...'
      } else {
        return text
      }
    },
    goToMasterclass (id) {
      this.$router.push(`/masterclasses/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.author_avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
</style>
