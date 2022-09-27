<template>
  <section>
    <b-tabs v-model="activeTab" expanded>
      <b-tab-item :label="$t('initiatives.TabLabels.description')">
        <DescriptionTab :initiative="initiative" />
      </b-tab-item>
      <b-tab-item :label="$t('initiatives.TabLabels.methodology')">
        <MetodologyTab :initiative="initiative" />
      </b-tab-item>
      <b-tab-item :label="$t('initiatives.TabLabels.results')">
        <ResultsTab :initiative="initiative" />
      </b-tab-item>
      <b-tab-item :label="$t('initiatives.TabLabels.resources')">
        <ResourcesTab :initiative="initiative" />
      </b-tab-item>
      <b-tab-item :label="$t('initiatives.TabLabels.organization')">
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
