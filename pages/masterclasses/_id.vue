<template>
  <section class="section">
    <div class="container">
      <h1 class="title">
        {{ masterclass.title }}
      </h1>
      <hr>
      <div class="columns is-centered">
        <div class="column is-8">
          <div class="container-responsive mb-6">
            <iframe :src="extractYoutubeId(masterclass.youtube_url)" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
          </div>
          <div class="columns">
            <div class="column has-text-centered-touch">
              <h5 class="title is-5 mb-1">Autor</h5>
              <p>{{masterclass.author}}</p>
            </div>
            <div class="column has-text-right-desktop has-text-centered-touch">
              <h5 class="title is-5 mb-1">Fecha</h5>
              <p>{{masterclass.date_published}}</p>
            </div>
          </div>
          <br>
          <div class="block">
            <h5 class="title is-5 mb-1 is-uppercase">Objetivo de la masterclass</h5>
            <div class="text-field">{{masterclass.objective}}</div>
          </div>
          <div class="block">
            <h5 class="title is-5 mb-1 is-uppercase">Descripción de la masterclass</h5>
            <div class="text-field">{{masterclass.description}}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'MasterClassPage',
  async asyncData ({ params, $axios, i18n, $router, $graphql }) {
    const theQuery = {
      query: $graphql.getQueryForMasterclassById(params.id, i18n.localeProperties.iso)
    }
    try {
      const response = await $axios.post('/graphql', theQuery)
      const masterclass = response.data.data.masterclasses_by_id
      $graphql.mergeFieldTranslations(masterclass)
      return {
        masterclass
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err.response.data.errors[0].extensions)
    }
  },
  methods: {
    extractYoutubeId (url) {
      console.log(url)
      // eslint-disable-next-line no-useless-escape
      const youtubeId = url.match(/^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=))([\w-]{11})(?:\S+)?$/)
      return youtubeId ? 'https://www.youtube.com/embed/' + youtubeId[1] : false
    }
  }
}
</script>

<style lang="scss" scoped>
.container-responsive{
  position: relative;
  overflow: hidden;
  padding-top: 56.25%;
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
