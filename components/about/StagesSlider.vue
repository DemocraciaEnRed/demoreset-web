<template>
  <div class="has-background-grey-lighter">
    <h2
      class="has-text-centered is-poppins is-uppercase has-text-weight-bold pt-4 is-size-3"
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
      <b-carousel-item v-for="(slide, i) in carousels" :key="i">
        <section class="section is-medium has-text-centered pt-6">
          <div class="pt-6">
            <p
              v-if="slide.id == currentStage"
              class="outline-shadow-red is-poppins has-text-grey-lighter has-text-weight-bold is-size-2 pb-6"
            >
              {{ "FASE " + slide.id }}
            </p>
            <p
              v-else
              class="outline-shadow-black is-poppins has-text-grey-lighter has-text-weight-bold is-size-2 pb-6"
            >
              {{ "FASE " + slide.id }}
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
              <span>Actividades:</span>
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
    const currentStage = 3
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
          title: 'SÉ PARTE DE ESTA RED GLOBAL; DEMO.RESET',
          content: [
            'Esta fase contribuirá a permitir el intercambio entre todos los profesionales del Sur Global estarán en contacto.',
            'El proyecto creará subgrupos en función de estos intereses. Los participantes tendrán la oportunidad de intercambiar, cuestionar y fortalecer sus proyectos en espacios rigurosamente diseñados donde diversas iniciativas se reunirán para intercambiar sus experiencias, mejores prácticas, aprendizajes, metodologías y estrategias.'
          ],
          activities: [
            'GRUPOS DE ENFOQUE',
            'MODELO DE INTERCAMBIO DE EXPERIENCIA',
            'DEMO.TALKS'
          ]
        },
        {
          id: 2,
          title:
            'RECONOCER LOS MUROS DE LA DEMOCRACIA DELIBERATIVA EN EL SUR GLOBAL',
          content: [
            'La segunda fase del proyecto reconoce el impacto de la primera fase, reforzando los subgrupos temáticos de deliberación creados previamente. En cada subgrupo temático se llevará a cabo una evaluación de las necesidades: se evaluarán los principales obstáculos, retos y cuestiones metodológicas y técnicas.',
            'El resto de la fase se centrará en desarrollar respuestas y prototipos de soluciones a los problemas identificados. Para ello, se invitará a 30 profesionales a participar en un Bootcamp experimental para trabajar colectivamente en la resolución de sus problemas y los de otros subgrupos.'
          ],
          activities: ['DEMO.RESET/LAB', 'MAPA DE DELIBERACIÓN INTERACTIVO']
        },
        {
          id: 3,
          title: 'TEJER NUESTRAS EXPERIENCIAS',
          content: [
            'En esta fase se pondrá a prueba la replicabilidad, adaptabilidad y eficacia de los prototipos. Esta implementación será posible gracias a un modelo de residencia de movilidad de expertos, en el que personas con conocimientos específicos acompañarán todas las acciones.',
            'En esta fase se probará la replicabilidad, adaptabilidad y eficacia de los prototipos. Esta aplicación será posible gracias a un modelo de residencia de movilidad de expertos, en el que personas con conocimientos específicos acompañarán todas las acciones.'
          ],
          activities: ['RESIDENCE FOR THE ACTION', 'RESIDENCIA PARA EXPERTOS']
        },
        {
          id: 4,
          title: 'SALTAR LOS MUROS HACIA UNA DEMOCRACIA DELIBERATIVA.',
          content: [
            'En esta última fase, el equipo ofrece recomendaciones para mejorar la eficacia de los procesos de deliberación recogidos a lo largo del proyecto. Se identificaron los retos relacionados con la práctica de la deliberación, se crearon y probaron prototipos de soluciones y es fundamental analizar los resultados de forma consciente y rigurosa.'
          ],
          activities: ['RESIDENCE FOR THE ACTION', 'RESIDENCIA PARA EXPERTOS']
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
