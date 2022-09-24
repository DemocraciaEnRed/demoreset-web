<template>
  <div class="container my-6">
    <div class="block">
      <div class="title is-condensed is-size-5 is-uppercase">
        {{ $t('initiatives.resultsTab.goalsAccomplishment') }}
      </div>
      <div class="content is-uppercase is-condensed">
        <ul>
          <li>
            {{ initiative.goal_accomplishment?.name ? initiative.goal_accomplishment.name : $t('initiatives.noData') }}
          </li>
        </ul>
      </div>
    </div>
    <div class="block">
      <div class="title is-condensed is-size-5 is-uppercase">
        {{ $t('initiatives.resultsTab.initiativeResult') }}
      </div>
      <div class="block">
        {{ initiative.key_results ? initiative.key_results : $t('initiatives.noData') }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ResultsTab',
  props: {
    initiative: {
      type: Object,
      default: null
    }
  }
}
</script>
