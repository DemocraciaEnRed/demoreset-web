<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="">
    <section class="section has-background-white">
      <div class="container py-6 ">
        <div class="columns">
          <div class="column is-flex is-flex-direction-column">
            <h1
              class="title is-poppins is-uppercase is-size-2 is-size-3-mobile has-text-weight-bold has-border-top pt-3"
            >
              {{ $t('about.title') }}
            </h1>
            <img
              class="about-img"
              src="~/assets/img/About.png"
              :alt="$t('about.alt')"
            >
          </div>
          <div class="column">
            <div class="content">
              <div class="block">
                {{ $t('about.content1') }}
              </div>
              <div class="block" v-html="$t('about.content2')" />
              <b>
                {{ $t('about.content3') }}
              </b>
            </div>
          </div>
        </div>
      </div>
    </section>
    <StagesSlider />
  </div>
</template>

<script>
import StagesSlider from '~/components/about/StagesSlider.vue'
export default {
  name: 'AboutPage',
  components: {
    StagesSlider
  },
  head () {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    return {
      title: `${this.$t('about.head.title')} - ${this.$t('head.title')}`,
      htmlAttrs: {
        lang: this.$i18n.locale
      },
      meta: [
        { hid: 'description', name: 'description', content: this.$t('head.description') },
        { name: 'title', content: `${this.$t('about.head.title')} - ${this.$t('head.title')}` },
        { name: 'description', content: this.$t('head.description') },
        { property: 'og:title', content: `${this.$t('about.head.title')} - ${this.$t('head.title')}` },
        { property: 'og:description', content: this.$t('head.description') },
        { property: 'twitter:title', content: `${this.$t('about.head.title')} - ${this.$t('head.title')}` },
        { property: 'twitter:description', content: this.$t('head.description') },
        ...i18nHead.meta
      ],
      link: [
        ...i18nHead.link
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.about-img{
  object-fit: contain;
  border-radius: 3px;
}
h1.has-border-top{
  border-top: 1px solid black;
}
.width-40{
  width: 40%;
  text-align: left;
}
</style>
