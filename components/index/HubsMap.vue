<template>
  <section>
    <h2
      class="column is-four-fifths is-poppins is-uppercase is-size-2 is-size-3-touch has-text-weight-bold has-text-left"
    >
      {{ $t('home.hubsTitle') }}
    </h2>
    <div v-if="$i18n.locale == 'es'" class="my-6">
      <esMap />
    </div>
    <div v-else class="my-6">
      <enMap />
    </div>
    <button class="button is-rounded is-uppercase is-mono is-centered is-large is-responsive">
      {{ $t('home.hubsButton') }}
    </button>
  </section>
</template>

<script>
import esMap from './map/esMap.vue'
import enMap from './map/enMap.vue'

export default {
  name: 'HubsMap',
  components: {
    esMap,
    enMap
  }
}
</script>

<style lang="scss" scoped>
.button {
  background: transparent;
  border: 2px solid #000;
  font-style: normal;
  font-weight: 500;
  color: #000;
}
</style>
