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
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, nihil beatae. Suscipit iusto sunt voluptatum corrupti iste accusantium debitis quisquam cupiditate, in reprehenderit, illum quod. Nam ad dolorum et consequatur!
        Atque veritatis sequi soluta earum ipsum corrupti praesentium, tempora aut molestias dolore similique rerum enim sunt facere, magni eveniet delectus repudiandae animi ut id reprehenderit quam doloremque. Minus, nisi eaque.
      </b-tab-item>
    </b-tabs>
  </section>
</template>

<script>
import OrganizationCard from './OrganizationCard.vue'
export default {
  name: 'TabOrganization',
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
