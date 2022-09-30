<template>
  <section>
    <b-tabs v-model="activeTab" type="is-boxed" expanded>
      <b-tab-item :label="$t('initiatives.tabLabels.description')">
        <DescriptionTab :initiative="initiative" />
      </b-tab-item>
      <b-tab-item :label="$t('initiatives.tabLabels.barriers')">
        <BarriersTab :initiative="initiative" :barrier-categories="barrierCategories" />
      </b-tab-item>
      <b-tab-item :label="$t('initiatives.tabLabels.methodology')">
        <MetodologyTab :initiative="initiative" />
      </b-tab-item>
      <b-tab-item :label="$t('initiatives.tabLabels.results')">
        <ResultsTab :initiative="initiative" />
      </b-tab-item>
      <b-tab-item :label="$t('initiatives.tabLabels.organization')">
        <OrganizationTab :initiative="initiative" />
      </b-tab-item>
    </b-tabs>
  </section>
</template>

<script>
import DescriptionTab from './DescriptionTab.vue'
import MetodologyTab from './MetodologyTab.vue'
import OrganizationTab from './OrganizationTab.vue'
import BarriersTab from './BarriersTab.vue'
import ResultsTab from './ResultsTab.vue'
export default {
  name: 'InitiativeTabs',
  components: {
    DescriptionTab,
    MetodologyTab,
    OrganizationTab,
    BarriersTab,
    ResultsTab
  },
  props: {
    initiative: {
      type: Object,
      default: null
    },
    barrierCategories: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      activeTab: 0
    }
  }
}
</script>
