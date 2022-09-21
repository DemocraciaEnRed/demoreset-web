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
      <li class="is-size-4 has-text-weight-light">
        {{ initiative.participation_individuals_count }}
        <!-- roboto condensed pending -->
      </li>
    </div>
    <div class="block">
      <div class="title is-mono is-size-5 is-uppercase">
        CANTIDAD DE ORGANIZACIONES, FAMILIAS, GRUPOS O COMUNIDADES PARTICIPANTES
      </div>
      <li class="is-size-4 has-text-weight-light">
        {{ initiative.participation_groups_count ? initiative.participation_groups_count : 'UNKNOWN' }}
        <!-- roboto condensed pending -->
        <!-- test conditional on vue (WIP) -->
      </li>
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
