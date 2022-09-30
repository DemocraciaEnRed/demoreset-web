<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <BannerHome />
    <section class="section">
      <div class="container has-text-centered">
        <p class="is-mono is-uppercase principal-title is-size-4">
          {{ $t("home.hello") }}
        </p>
        <div class="columns is-multiline is-mobile my-5">
          <div v-for="item in buttons" :key="item.id" class="column is-3-desktop is-6-tablet is-12-mobile">
            <ButtonIndex
              :base-text="$t(`home.mainButtons.${item.translationId}.baseText`)"
              :overlay-text="$t(`home.mainButtons.${item.translationId}.overlayText`)"
              :button-text="$t(`home.mainButtons.${item.translationId}.buttonText`)"
              :link="item.link"
              :external-link="item.externalLink"
              :scroll-to="item.scrollTo"
            />
          </div>
        </div>
        <hr class="has-background-black">
        <HubsMap />
        <div class="has-text-left about-section columns is-6">
          <div class="about-section_container column is-half">
            <h2 class="is-poppins about-title is-uppercase is-size-2 is-size-3-touch mb-5">
              {{ $t("home.aboutDemoReset") }}
            </h2>
            <p v-html="$t('home.aboutDemoResetText')" />
          </div>
          <div class="about-section_container column is-half">
            <h2 class="is-poppins about-title is-uppercase is-size-2 is-size-3-touch mb-5">
              {{ $t("home.whyBePart") }}
            </h2>
            <p v-html="$t('home.whyBePartText')" />
          </div>
        </div>
        <div>
          <NuxtLink to="/about" class="button is-rounded is-large is-responsive my-6 is-uppercase is-mono">
            {{ $t("home.aboutButton") }}
          </NuxtLink>
        </div>
      </div>
    </section>
    <div class="has-background-gray py-6 columns">
      <div class="container has-text-centered is-mono is-uppercase column is-full">
        <img src="~/assets/img/logo-paranewsletter.png" alt="">
        <p class="py-6">
          {{ $t("home.newsletterListTitle") }}
        </p>
        <ul>
          <li v-for="item in newsletter" :key="item.id">
            {{ $t(`home.newsletterList.${item.listItem}`) }}
          </li>
        </ul>
      </div>
    </div>
    <section class="container my-6">
      <div class="columns">
        <div class="column">
          <div class="has-border-top mb-5" />
          <h3 class="is-mono is-uppercase project-by-title">
            {{ $t("home.proyectBy") }}
          </h3>
          <img src="~/assets/img/advisers/extituto.png" alt="">
        </div>
        <div class="column">
          <div class="has-border-top mb-5" />
          <h3 class="is-mono is-uppercase project-by-title">
            {{ $t("home.allianceWith") }}
          </h3>
          <img src="~/assets/img/advisers/ned.png" alt="">
        </div>
      </div>
    </section>
    <section class="container">
      <div class="has-border-top mb-5" />
      <h3 class="is-mono is-uppercase project-by-title mb-6">
        {{ $t("home.committee") }}
      </h3>
      <div class="columns is-align-items-center mb-6">
        <div class="column is-2 is-offset-1">
          <img src="~/assets/img/advisers/demsoc.png" alt="">
        </div>
        <div class="column is-2">
          <img src="~/assets/img/advisers/participedia.png" alt="">
        </div>
        <div class="column is-2">
          <img src="~/assets/img/advisers/der.png" alt="">
        </div>
        <div class="column is-2">
          <img src="~/assets/img/advisers/peoplepowered.png" alt="">
        </div>
        <div class="column is-2">
          <img src="~/assets/img/advisers/ifpf.png" alt="">
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import BannerHome from '~/components/index/BannerHome.vue'
import ButtonIndex from '~/components/index/ButtonIndex.vue'
import HubsMap from '~/components/index/HubsMap.vue'
export default {
  name: 'IndexPage',
  components: {
    BannerHome,
    ButtonIndex,
    HubsMap
  },
  data () {
    return {
      buttons: [
        {
          id: 1,
          translationId: 'wannaBePart',
          externalLink: 'https://www.google.com',
          link: null,
          scrollTo: null
        },
        {
          id: 2,
          translationId: 'wannaResolve',
          externalLink: null,
          link: null,
          scrollTo: 'map'
        },
        {
          id: 3,
          translationId: 'wannaSearch',
          externalLink: null,
          link: '/initiatives',
          scrollTo: null
        },
        {
          id: 4,
          translationId: 'wannaKnow',
          externalLink: null,
          link: '/masterclasses',
          scrollTo: null
        }
      ],
      newsletter: [
        {
          id: 1,
          listItem: 'item1'
        },
        {
          id: 2,
          listItem: 'item2'
        },
        {
          id: 3,
          listItem: 'item3'
        }
      ]
    }
  },
  head () {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    return {
      title: `${this.$t('head.title')}`,
      htmlAttrs: {
        lang: this.$i18n.locale
      },
      meta: [
        { hid: 'description', name: 'description', content: this.$t('head.description') },
        { name: 'title', content: this.$t('head.title') },
        { name: 'description', content: this.$t('head.description') },
        { property: 'og:title', content: this.$t('head.title') },
        { property: 'og:description', content: this.$t('head.description') },
        { property: 'twitter:title', content: this.$t('head.title') },
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
.principal-title {
  font-weight: 300;
}

hr {
  width: 50%;
  height: 0.5px;
}

.about-section {
  margin-top: 15%;

  .about-title {
    font-style: normal;
    font-weight: 800;
    font-size: 40px;
    line-height: 60px;
    text-align: center;
  }

  &_container::before {
    width: 98%;
    content: "";
    display: block;
    top: 0;
    border-top: 1px solid black;
    margin-bottom: 20px;
  }
}

.has-background-gray {
  background: #f1f1f1;
  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 27px;

  // padding-top: 3rem;
  // padding-bottom: 3rem;
  ul li {
    padding-bottom: 20px;
  }
}

.button {
  background: transparent;
  border: 2px solid #000;
  font-style: normal;
  font-weight: 500;
  // font-size: 26px;
  // line-height: 50px;
  color: #000;
}

.has-border-top {
  border-top: 1px solid #000;
  width: 60%;
}

.project-by-title {
  font-style: normal;
  font-weight: 300;
  font-size: 26px;
  line-height: 50px;
}
</style>
