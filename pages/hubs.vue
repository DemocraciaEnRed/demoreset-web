<template>
  <section class="section">
    <div class="container">
      <h2 class="title is-1 is-800 has-text-black mb-6 has-text-centered is-poppins is-uppercase">
        {{ $t('hubs.title') }}
      </h2>
      <div class="columns is-centered is-vcentered">
        <div class="column ">
          <div class="is-clickable" @click="scrollTo('latinamerica')">
            <img v-if="$i18n.locale == 'es'" src="@/assets/img/iconoAmericaLatina.svg" class="image mx-auto" width="180">
            <img v-else src="@/assets/img/iconLatinAmerica.svg" class="image mx-auto" width="180">
          </div>
        </div>
        <div class="column ">
          <div class="is-clickable" @click="scrollTo('east-europe')">
            <img v-if="$i18n.locale == 'es'" src="@/assets/img/iconoEuropaEste.svg" class="image mx-auto" width="200">
            <img v-else src="@/assets/img/iconEasterEurope.svg" class="image mx-auto" width="200">
          </div>
        </div>
        <div class="column ">
          <div class="is-clickable" @click="scrollTo('africa')">
            <img v-if="$i18n.locale == 'es'" src="@/assets/img/IconoAfrica.svg" class="image mx-auto" width="200">
            <img v-else src="@/assets/img/iconAfrica.svg" class="image mx-auto" width="200">
          </div>
        </div>
        <div class="column ">
          <div class="is-clickable" @click="scrollTo('asia-india')">
            <img v-if="$i18n.locale == 'es'" src="@/assets/img/iconoSudeste.svg" class="image mx-auto" width="170">
            <img v-else src="@/assets/img/iconSoutheastAsia.svg" class="image mx-auto" width="170">
            <img src="@/assets/img/iconoIndia.svg" class="image mx-auto" width="100">
          </div>
        </div>
      </div>
      <hr class="has-background-black">
      <br>
      <br>
      <br>
      <section id="latinamerica">
        <div class="is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center mb-6">
          <h1 class="title is-3 is-size-5-touch is-uppercase is-700 mb-0">
            HUB 1 - {{ $t('hubs.hub1') }}
          </h1>
          <img v-if="$i18n.locale == 'es'" src="@/assets/img/iconoAmericaLatina.svg" class="image" width="200">
          <img v-else src="@/assets/img/iconLatinAmerica.svg" class="image" width="200">
        </div>
        <iframe
          src="https://flo.uri.sh/visualisation/11227764/embed"
          title="Interactive or visual content"
          class="flourish-embed-iframe"
          frameborder="0"
          scrolling="no"
          style="width:100%;height:600px;"
          sandbox="allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
        /><div style="width:100%!;margin-top:4px!important;text-align:right!important;">
          <a class="flourish-credit" href="https://public.flourish.studio/visualisation/11227764/?utm_source=embed&utm_campaign=visualisation/11227764" target="_top" style="text-decoration:none!important"><img alt="Made with Flourish" src="https://public.flourish.studio/resources/made_with_flourish.svg" style="width:105px!important;height:16px!important;border:none!important;margin:0!important;"> </a>
        </div>
      </section>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <section id="east-europe">
        <div class="is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center mb-6">
          <h1 class="title is-3 is-size-5-touch is-uppercase is-700 mb-0">
            HUB 2 - {{ $t('hubs.hub2') }}
          </h1>
          <img v-if="$i18n.locale == 'es'" src="@/assets/img/iconoEuropaEste.svg" class="image" width="200">
          <img v-else src="@/assets/img/iconEasterEurope.svg" class="image" width="200">
        </div>
        <iframe
          src="https://flo.uri.sh/visualisation/11227836/embed"
          title="Interactive or visual content"
          class="flourish-embed-iframe"
          frameborder="0"
          scrolling="no"
          style="width:100%;height:600px;"
          sandbox="allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
        /><div style="width:100%!;margin-top:4px!important;text-align:right!important;">
          <a class="flourish-credit" href="https://public.flourish.studio/visualisation/11227836/?utm_source=embed&utm_campaign=visualisation/11227836" target="_top" style="text-decoration:none!important"><img alt="Made with Flourish" src="https://public.flourish.studio/resources/made_with_flourish.svg" style="width:105px!important;height:16px!important;border:none!important;margin:0!important;"> </a>
        </div>
      </section>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <section id="africa">
        <div class="is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center mb-6">
          <h1 class="title is-3 is-size-5-touch is-uppercase is-700 mb-0">
            HUB 3 - {{ $t('hubs.hub3') }}
          </h1>
          <img v-if="$i18n.locale == 'es'" src="@/assets/img/IconoAfrica.svg" class="image" width="200">
          <img v-else src="@/assets/img/iconAfrica.svg" class="image" width="200">
        </div>
        <iframe
          src="https://flo.uri.sh/visualisation/11227853/embed"
          title="Interactive or visual content"
          class="flourish-embed-iframe"
          frameborder="0"
          scrolling="no"
          style="width:100%;height:600px;"
          sandbox="allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
        /><div style="width:100%!;margin-top:4px!important;text-align:right!important;">
          <a class="flourish-credit" href="https://public.flourish.studio/visualisation/11227853/?utm_source=embed&utm_campaign=visualisation/11227853" target="_top" style="text-decoration:none!important"><img alt="Made with Flourish" src="https://public.flourish.studio/resources/made_with_flourish.svg" style="width:105px!important;height:16px!important;border:none!important;margin:0!important;"> </a>
        </div>
      </section>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <section id="asia-india">
        <div class="is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center mb-6">
          <h1 class="title is-3 is-size-5-touch is-uppercase is-700 mb-0">
            HUB 4 - {{ $t('hubs.hub4') }}
          </h1>
          <div class="">
            <img v-if="$i18n.locale == 'es'" src="@/assets/img/iconoSudeste.svg" class="image mx-auto" width="170">
            <img v-else src="@/assets/img/iconSoutheastAsia.svg" class="image mx-auto" width="170">
            <img src="@/assets/img/iconoIndia.svg" class="image mx-auto" width="100">
          </div>
        </div>
        <iframe
          src="https://flo.uri.sh/visualisation/11227779/embed"
          title="Interactive or visual content"
          class="flourish-embed-iframe"
          frameborder="0"
          scrolling="no"
          style="width:100%;height:600px;"
          sandbox="allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
        /><div style="width:100%!;margin-top:4px!important;text-align:right!important;">
          <a class="flourish-credit" href="https://public.flourish.studio/visualisation/11227779/?utm_source=embed&utm_campaign=visualisation/11227779" target="_top" style="text-decoration:none!important"><img alt="Made with Flourish" src="https://public.flourish.studio/resources/made_with_flourish.svg" style="width:105px!important;height:16px!important;border:none!important;margin:0!important;"> </a>
        </div>
      </section>
      <br>
      <br>
      <br>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HubsPage',
  head () {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    return {
      title: `${this.$t('hubs.head.title')} - ${this.$t('head.title')}`,
      htmlAttrs: {
        lang: this.$i18n.locale
      },
      meta: [
        { hid: 'description', name: 'description', content: this.$t('head.description') },
        { name: 'title', content: `${this.$t('hubs.head.title')} - ${this.$t('head.title')}` },
        { name: 'description', content: this.$t('head.description') },
        { property: 'og:title', content: `${this.$t('hubs.head.title')} - ${this.$t('head.title')}` },
        { property: 'og:description', content: this.$t('head.description') },
        { property: 'twitter:title', content: `${this.$t('hubs.head.title')} - ${this.$t('head.title')}` },
        { property: 'twitter:description', content: this.$t('head.description') },
        ...i18nHead.meta
      ],
      link: [
        ...i18nHead.link
      ]
    }
  },
  mounted () {
    // if query has id, scroll to that section
    if (this.$route.query.id) {
      setTimeout(() => {
        this.scrollTo(this.$route.query.id)
      }, 500)
    }
  },
  methods: {
    scrollTo (id) {
      const element = document.getElementById(id)
      console.log(element)
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
  }
}
</script>
