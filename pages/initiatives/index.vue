<template>
  <section>
    <section class="section">
      <div class="container has-text-centered">
        <h2 class="mb-4 is-poppins is-uppercase initiatives-title">
          {{ $t('initiatives.title') }}
        </h2>
        <DropdownButtons />
      </div>
    </section>
    <section class="container my-6">
      <div class="has-text-left">
        <h3>Las iniciativas en graficos</h3>
      </div>
    </section>
  </section>
</template>

<script>
import DropdownButtons from '../../components/initiatives/DropdownButtons.vue'
export default {
  name: 'InitiativePage',
  components: {
    DropdownButtons
  }
}
</script>

<style lang="scss" scoped>
.initiatives-title {
  font-weight: 800;
  font-size: 40px;
  line-height: 60px;
}
</style>
