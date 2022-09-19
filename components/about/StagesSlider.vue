<template>
  <div class="has-background-light">
    <h2
      class="has-text-centered is-poppins is-uppercase has-text-weight-bold mt-5 is-size-3"
    >
      Etapas del proyecto
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
      <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
        <section :class="`hero is-medium`">
          <div class="hero-body has-text-centered">
            <!-- <p :class="faseActualColor(carousel.id)"> -->
            <p v-if="(carousel.id) == currentStage" class="outline-shadow-red has-text-light is-poppins has-text-weight-bold is-size-2">
              {{ "FASE " + carousel.id }}
            </p>
            <p v-else class="outline-shadow-black has-text-light is-poppins has-text-weight-bold is-size-2">
              {{ "FASE " + carousel.id }}
            </p>
            <h1 class="title">
              {{ carousel.title }}
            </h1>
            <p class="content">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod,
              quae ut iste excepturi eos deserunt, repellendus cum nesciunt
              architecto cumque repellat eum ab blanditiis accusantium facilis
              error obcaecati magni. Quo. Nostrum, velit beatae eos eveniet
              sapiente laboriosam soluta similique ipsa, vel, illum laudantium
              nisi minima cumque dicta fuga ut quam earum reiciendis fugit sit
              delectus? Nostrum repudiandae hic molestiae consectetur. Dicta,
              aspernatur autem veritatis doloremque animi mollitia totam
              sapiente, illum perferendis nam aperiam ad beatae earum? Dolorem,
              asperiores dolorum commodi numquam itaque praesentium ad quibusdam
              id temporibus voluptatem aut deserunt! Suscipit exercitationem
              consequuntur ullam? Aspernatur, libero atque esse ea minus quam
              molestiae rem cum quasi molestias porro eum repellendus
              praesentium, consectetur in corrupti quaerat error rerum.
              Repudiandae eum magni quam. Ratione vitae, nihil dicta totam
              assumenda perferendis fugit corrupti, ea numquam sunt quia
              accusantium! Necessitatibus quo, sint natus expedita neque odit
              aspernatur voluptas! Officia nam veritatis, cum repellat quam
              dolorem.
            </p>
            <ol>
              <li>step 1</li>
              <li>step 2</li>
              <li>step 3</li>
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
    const currentStage = 3
    return {
      currentStage,
      carousel: (currentStage - 1), // valor dinámico que cambia cuando cambiamos de slide
      arrow: true,
      arrowBoth: false,
      arrowHover: false,
      autoPlay: false,
      iconPack: 'fa',
      iconPrev: 'solid fa-chevron-left',
      iconNext: 'solid fa-chevron-right',
      iconSize: '',
      carousels: [
        { id: 1, title: 'Slide 1', color: 'info' },
        { id: 2, title: 'Slide 2', color: 'success' },
        { id: 3, title: 'Slide 3', color: 'warning' },
        { id: 4, title: 'Slide 4', color: 'danger' }
      ]
    }
  },
  methods: {
    faseActualColor (slideID) {
      console.log(slideID)
      console.log(this.currentStage)
      let color = 'black'
      if (this.currentStage === slideID) { color = 'red' }
      return `outline-shadow-${color} has-text-light is-poppins has-text-weight-bold is-size-2`
    }
  }
}
</script>
<style lang="scss" scoped>
@mixin stroke($color, $size) {
  text-shadow:
    -#{$size} -#{$size} 0 $color,
     0        -#{$size} 0 $color,
     #{$size} -#{$size} 0 $color,
     #{$size}  0        0 $color,
     #{$size}  #{$size} 0 $color,
     0         #{$size} 0 $color,
    -#{$size}  #{$size} 0 $color,
    -#{$size}  0        0 $color;
}
  .outline-shadow-black {
    @include stroke(black, 1px)
}
  .outline-shadow-red {
    @include stroke(red, 1px)
}
</style>
