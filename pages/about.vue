<template>
  <div>
    <section class="section">
      <h1
        class="column is-poppins is-uppercase has-text-weight-bold is-5 mb-5 has-border-top is-size-2"
      >
        {{ $t('about.title') }}
      </h1>
      <div class="columns">
        <img
          class="column is-5 about-img"
          src="~/assets/img/About.png"
          :alt="$t('about')"
        >
        <div class="column content">
          <p>
            {{ $t('about.content1') }}
          </p>
          <p v-html="$t('about.content2')" />
          <b>
            {{ $t('about.content3') }}
          </b>
        </div>
      </div>
    </section>
    <StagesSlider />
    <section class="section">
      <div class="title is-uppercase is-poppins">
        {{ $t('about.title3') }}
      </div>
    </section>
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
</style>
