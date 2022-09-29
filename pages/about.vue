<template>
  <div>
    <section class="section">
      <h1
        class="title is-poppins is-uppercase is-size-2 has-text-weight-bold has-border-top width-40 mb-5 pt-3"
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

.button{
  width: 100%;
  background-color: transparent;
  border: 2px solid black;
}

.width-40{
  width: 40%;
  text-align: left;
}
</style>
