<template>
  <section>
    <b-tabs v-model="activeTab" expanded>
      <b-tab-item label="DESCRIPCION">
        <DescriptionTab :initiative="initiative" />
      </b-tab-item>
      <b-tab-item label="METODOLOGIA">
        <MetodologyTab :initiative="initiative" />
      </b-tab-item>
      <b-tab-item label="RESULTADOS">
        <ResultsTab :initiative="initiative" />
      </b-tab-item>
      <b-tab-item label="RECURSOS">
        <ResourcesTab :initiative="initiative" />
      </b-tab-item>
      <b-tab-item label="ORGANIZACION">
        <OrganizationTab :initiative="initiative" />
      </b-tab-item>
    </b-tabs>
  </section>
</template>

<script>
import DescriptionTab from './DescriptionTab.vue'
import MetodologyTab from './MetodologyTab.vue'
import OrganizationTab from './OrganizationTab.vue'
import ResourcesTab from './ResourcesTab.vue'
import ResultsTab from './ResultsTab.vue'
export default {
  name: 'InitiativeTabs',
  components: {
    DescriptionTab,
    MetodologyTab,
    OrganizationTab,
    ResourcesTab,
    ResultsTab
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
