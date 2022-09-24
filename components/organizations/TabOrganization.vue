<template>
  <section>
    <b-tabs v-model="activeTab" expanded>
      <!-- organization initiatives card table  -->
      <b-tab-item :label="$t('organizations.tableLabels.information')">
        <div class="container my-5">
          <div class="block">
            <p>{{ $t('organizations.description') }}</p>
            <p> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit autem perferendis nulla, animi culpa dicta odio vel esse minus, atque ab illo magnam beatae ad similique aperiam repellat id? Facere. </p>
          </div>
          <h4 class="is-mono is-uppercase has-text-weight-semibold mb-6">
            {{ $t('organizations.initiatives') }}
          </h4>
          <OrganizationCard :initiativeorg="initiativeorg" />
        </div>
      </b-tab-item>
      <!-- interests table  -->
      <b-tab-item :label="$t('organizations.tableLabels.interests')">
        hola
      </b-tab-item>
    </b-tabs>
  </section>
</template>

<script>
import OrganizationCard from './organizationCard.vue'
export default {
  name: 'InitiativeTabs',
  components: {
    OrganizationCard
  },
  props: {
    initiativeorg: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      activeTab: 0
    }
  }
}
</script>
