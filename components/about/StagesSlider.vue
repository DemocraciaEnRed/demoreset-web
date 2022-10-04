<template>
  <div class="background-carrousel">
    <div class="container py-6">
      <h2
        class="title is-800 has-text-centered is-poppins is-uppercase has-text-weight-bold py-5 is-size-3"
      >
        {{ $t('about.title2') }}
      </h2>
      <b-steps
        v-model="carousel"
        :animated="isAnimated"
        :rounded="isRounded"
        :mobile-mode="mobileMode"
        :has-navigation="hasNavigation"
        :class="headerClass"
      >
        <b-step-item v-for="n in 4" :key="n" type="is-black">
          <div v-if="n === currentStage" class="is-flex is-flex-direction-column is-align-items-center">
            <span class="tag is-dark is-poppins">{{ $t('about.here') }} </span>
            <span class="icon">
              <i class="fa-solid fa-arrow-down" />
            </span>
          </div>
        </b-step-item>
      </b-steps>
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
        :indicator="indicator"
      >
        <b-carousel-item v-for="(slide, i) in stages" :key="i">
          <section class="section has-text-centered pt-0">
            <div class="pt-0 mx-auto carrouselContentWidth">
              <p
                v-if="slide.id == currentStage"
                class="outline-shadow-red is-uppercase is-poppins has-text-grey-lighter has-text-weight-bold is-size-2 pb-6 custom-height"
              >
                {{ `${$t('about.phase')} ${slide.id}` }}
              </p>
              <p
                v-else
                class="outline-shadow-black is-uppercase is-poppins has-text-grey-lighter has-text-weight-bold is-size-2 pb-6"
              >
                {{ `${$t('about.phase')} ${slide.id}` }}
              </p>
              <h1 class="title is-800">
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
    <section class="section has-background-white pt-0">
      <div class="container">
        <div class="title is-800 column is-half-desktop is-uppercase has-text-left is-poppins has-border-top pt-6">
          {{ $t('about.title3') }}
        </div>
        <div class="columns is-align-items-center is-justify-content-center mx-auto">
          <div v-for="n in 4" :key="n" class="column is-one-fifth is-flex is-flex-direction-column is-align-items-center">
            <figure class="image is-128x128">
              <img :src="require(`~/assets/img/stage${n}_about_pdf.svg`)">
            </figure>
            <div class="block">
              {{ $t('about.stage')+" "+ n }}
            </div>
            <button v-if="n <= currentStage" class="button is-size-7-touch is-rounded mt-4 is-uppercase">
              {{ $t('about.stagePDF') }}
            </button>
            <button v-else class="button is-size-7-touch is-rounded mt-4 is-uppercase" disabled>
              {{ $t('about.upNext') }}
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'StagesSlider',
  data () {
    const currentStage = 2 // change this value manually when project stage changes
    return {
      currentStage,
      carousel: currentStage - 1, // slide shown by default, changes when slide does
      arrow: true,
      arrowBoth: false,
      arrowHover: false,
      autoPlay: false,
      iconPack: 'fa',
      iconPrev: 'solid fa-chevron-left',
      iconNext: 'solid fa-chevron-right',
      iconSize: 'is-large',
      indicator: false,
      stages: [
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
      ],
      isAnimated: true,
      isRounded: true,
      labelPosition: 'bottom',
      mobileMode: 'minimalist',
      hasNavigation: false,
      headerClass: 'is-small is-flex is-flex-direction-column'
    }
  }
}
</script>
<style lang="scss" scoped>
.background-carrousel{
  background-color: #F1f1f1;
}

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
.carrouselContentWidth{
  width: 75%;
}
ol li {
  list-style-position: inside;
}
.button{
  background-color: transparent;
  border: 2px solid black;
}
.has-border-top{
  border-top: 1px solid black;
}
.half-width{
  width: 50%;
  text-align: left;
}
.custom-height{
  line-height: 1;
}

</style>
