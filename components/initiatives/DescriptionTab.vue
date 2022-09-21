<template>
  <div class="container">
    <div class="block">
      {{ initiative.description }}
    </div>
    <div class="block">
      <div class="title is-mono is-size-5 is-uppercase">
        REDES DEL PROYECTO
      </div>
      <NuxtLink to="#">
        <b-icon
          pack="fa"
          icon="brands fa-facebook"
        />
      </NuxtLink>
      <NuxtLink to="#">
        <b-icon
          pack="fa"
          icon="brands fa-twitter"
        />
      </NuxtLink>
    </div>
    <div class="block">
      <div class="title is-mono is-size-5 is-uppercase">
        PROPOSITO
      </div>
      <ul>
        <li v-for="(purpose,i) in initiative?.purpose" :key="i">
          {{ purpose }}
        </li>
      </ul>
    </div>
    <div class="block">
      <div class="title is-mono is-size-5 is-uppercase">
        ENFOQUE INICIATIVA Y/O SOLUCIÓN
      </div>
      <ul>
        <li v-for="(approach,i) in initiative.approaches" :key="i">
          {{ approach.approaches_id.description }}
        </li>
      </ul>
    </div>
    <div class="block">
      <div class="title is-mono is-size-5 is-uppercase">
        PROBLEMA O RETO
      </div>
      <div class="block">
        {{ initiative.challenge }}
      </div>
    </div>
    <div class="block">
      <div class="title is-mono is-size-5 is-uppercase">
        OBJETIVO
      </div>
      <div class="block">
        {{ initiative.objective }}
      </div>
    </div>
    <div class="block">
      <div class="title is-mono is-size-5 is-uppercase">
        SUJETO DEL CAMBIO
      </div>
      <div class="block">
        {{ initiative.subject_of_change }}
      </div>
    </div>
    <div class="block">
      <div class="title is-mono is-size-5 is-uppercase">
        ACTIVIDADES CLAVE
      </div>
      <div class="block">
        {{ initiative.key_activities }}
      </div>
    </div>
    <div class="block">
      <div class="title is-mono is-size-5 is-uppercase">
        CANTIDAD DE PERSONAS PARTICIPANTES
      </div>
      <div class="">
        <ul>
          <li class="is-size-4 has-text-weight-light is-roboto-condensed">
            {{ initiative.participation_individuals_count }}
          </li>
        </ul>
      </div>
    </div>
    <div class="block">
      <div class="title is-mono is-size-5 is-uppercase">
        CANTIDAD DE ORGANIZACIONES, FAMILIAS, GRUPOS O COMUNIDADES PARTICIPANTES
      </div>
      <div class="content">
        <ul>
          <li class="is-size-4 has-text-weight-light is-roboto-condensed">
            {{ initiative.participation_groups_count ? initiative.participation_groups_count : 'UNKNOWN' }}
          </li>
        </ul>
      </div>
      <!-- test conditional on vue (WIP) -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'DescriptionTab',
  props: {
    initiative: {
      type: Object,
      default: null
    }
  }
}
</script>
