<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div v-for="masterclass in masterclasses" :key="masterclass.id" class="column is-6">
          <div class="box is-clickable" :click="goToMasterclass(masterclass.id)">
            <div class="columns is-vcentered">
              <div class="column is-narrow">
                <img :src="`https://demoreset.democraciaenred.org/assets/${masterclass.author_avatar.id}`" class="image author_avatar" :alt="masterclass.author">
              </div>
              <div class="column">
                <p class="">
                  <b>{{ masterclass.title }}</b>
                </p>
                <p class="is-size-7 is-mono">
                  {{ trimText(masterclass.description,150 ) }}
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
