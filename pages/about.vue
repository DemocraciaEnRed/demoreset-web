<template>
  <div>
    <section class="section">
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
