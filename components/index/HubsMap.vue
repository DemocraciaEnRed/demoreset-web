<template>
  <section>
    <h2 class="column is-four-fifths is-poppins is-uppercase is-size-2 has-text-weight-bold has-text-left">
      Elige un Hub y conoce las barreras a las que se enfrenta
    </h2>
    <img class="my-6" src="~/assets/img/mapaHomeEsp.svg" alt="hubs map">
    <button class="button is-rounded is-uppercase is-mono is-centered">
      QUIERO UNIRME A LA RED
    </button>
  </section>
</template>

<script>
export default {
  name: 'HubsMap'
}
</script>

<style lang="scss" scoped>
.button {
  font-size: 15px;
  line-height: 28px;
  background: transparent;
  border: 2px solid #000;
  font-style: normal;
  font-weight: 500;
  color: #000;
}
</style>
