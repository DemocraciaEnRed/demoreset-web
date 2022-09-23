<template>
  <section>
    <b-tabs v-model="activeTab" expanded>
      <b-tab-item :label="$t('organizations.tableLabels.information')">
        hola
      </b-tab-item>
      <b-tab-item :label="$t('organizations.tableLabels.interests')">
        hola
      </b-tab-item>
    </b-tabs>
  </section>
</template>

<script>
export default {
  name: 'InitiativeTabs',
  components: {
  },
  props: {
    initiative: {
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
