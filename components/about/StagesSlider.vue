<template>
  <div class="has-background-grey-lighter">
    <h2
      class="has-text-centered is-poppins is-uppercase has-text-weight-bold pt-4 is-size-3"
    >
      {{ $t('about.title2') }}
    </h2>
    <b-carousel
      v-model="carousel"
      :arrow="arrow"
      :repeat="arrowBoth"
      :arrow-hover="arrowHover"
      :icon-pack="iconPack"
      :icon-prev="iconPrev"
      :icon-next="iconNext"
      :icon-size="iconSize"
      :autoplay="autoPlay"
    >
      <b-carousel-item v-for="(slide, i) in carousels" :key="i">
        <section class="section is-medium has-text-centered pt-6">
          <div class="pt-6">
            <p
              v-if="slide.id == currentStage"
              class="outline-shadow-red is-uppercase is-poppins has-text-grey-lighter has-text-weight-bold is-size-2 pb-6"
            >
              {{ `${$t('about.phase')} ${slide.id}` }}
            </p>
            <p
              v-else
              class="outline-shadow-black is-uppercase is-poppins has-text-grey-lighter has-text-weight-bold is-size-2 pb-6"
            >
              {{ `${$t('about.phase')} ${slide.id}` }}
            </p>
            <h1 class="title">
              {{ slide.title }}
            </h1>
            <p
              v-for="(paragraph, i2) in slide.content"
              :key="i2"
              class="content has-text-left is-size-6"
            >
              {{ paragraph }}
            </p>
            <ol
              type="1"
              class="column is-mono has-text-left is-offset-2 is-size-5"
            >
              <span>{{ $t('about.activities') }}:</span>
              <li v-for="(item, i3) in slide.activities" :key="i3">
                {{ item }}
              </li>
            </ol>
          </div>
        </section>
      </b-carousel-item>
    </b-carousel>
  </div>
</template>

<script>
export default {
  name: 'StagesSlider',
  data () {
    const currentStage = 1
    return {
      currentStage,
      carousel: currentStage - 1, // valor dinámico que cambia cuando cambiamos de slide
      arrow: true,
      arrowBoth: false,
      arrowHover: false,
      autoPlay: false,
      iconPack: 'fa',
      iconPrev: 'solid fa-chevron-left',
      iconNext: 'solid fa-chevron-right',
      iconSize: 'is-large',
      carousels: [
        {
          id: 1,
          title: this.$t('about.slide1.title'),
          content: this.$t('about.slide1.content'),
          activities: this.$t('about.slide1.activities')
        },
        {
          id: 2,
          title: this.$t('about.slide2.title'),
          content: this.$t('about.slide2.content'),
          activities: this.$t('about.slide2.activities')
        },
        {
          id: 3,
          title: this.$t('about.slide3.title'),
          content: this.$t('about.slide3.content'),
          activities: this.$t('about.slide3.activities')
        },
        {
          id: 4,
          title: this.$t('about.slide4.title'),
          content: this.$t('about.slide4.content'),
          activities: this.$t('about.slide4.activities')
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
@mixin stroke($color, $size) {
  text-shadow: -#{$size} -#{$size} 0 $color, 0 -#{$size} 0 $color,
    #{$size} -#{$size} 0 $color, #{$size} 0 0 $color, #{$size} #{$size} 0 $color,
    0 #{$size} 0 $color, -#{$size} #{$size} 0 $color, -#{$size} 0 0 $color;
}
.outline-shadow-black {
  @include stroke(black, 1px);
}
.outline-shadow-red {
  @include stroke(red, 1px);
}
ol li {
  list-style-position: inside;
}
</style>
