<template>
  <div class="container">
    <div class="block">
      <div class="title is-mono is-size-5 is-uppercase">
        {{ $t('initiatives.methodologyTab.usedMethods') }}
      </div>
      <p>
        {{ initiative.key_methodologies ? initiative.key_methodologies : $t('initiatives.methodologyTab.noData') }}
      </p>
    </div>
    <div class="block">
      <div class="title is-mono is-size-5 is-uppercase">
        {{ $t('initiatives.methodologyTab.methodsType') }}
      </div>
      <ul>
        <li v-for="(methodType,i) in initiative.general_methodologies" :key="i">
          {{ methodType.general_methodologies_id.name ? methodType.general_methodologies_id.name : $t('initiatives.methodologyTab.noData') }}
        </li>
      </ul>
    </div>
    <div class="block">
      <div class="title is-mono is-size-5 is-uppercase">
        {{ $t('initiatives.methodologyTab.methodsTechniques') }}
      </div>
      <div class="block">
        <ul>
          <li v-for="(techniques, i) in (initiative?.specific_techniques)" :key="i">
            {{ techniques.specific_techniques_id.description ? techniques.specific_techniques_id.description : $t('initiatives.methodologyTab.noData') }}
          </li>
        </ul>
      </div>
    </div>
    <div class="block">
      <div class="title is-mono is-size-5 is-uppercase">
        {{ $t('initiatives.methodologyTab.participationLadder') }}
      </div>
      <div class="block">
        <ul>
          <li v-for="(ladder, i) in (initiative?.citizen_participation_ladder)" :key="i">
            {{ ladder.citizen_participation_ladder_id.description ? ladder.citizen_participation_ladder_id.description : $t('initiatives.methodologyTab.noData') }}
          </li>
        </ul>
      </div>
    </div>
    <div class="block">
      <div class="title is-mono is-size-5 is-uppercase">
        {{ $t('initiatives.methodologyTab.learningInfo') }}
      </div>
      <div class="block">
        <ul>
          <li v-for="(learning, i) in (initiative?.information_resources)" :key="i">
            {{ learning.information_resources_id.name ? learning.information_resources_id.name : $t('initiatives.methodologyTab.noData') }}
          </li>
        </ul>
      </div>
    </div>
    <div class="block">
      <div class="title is-mono is-size-5 is-uppercase">
        {{ $t('initiatives.methodologyTab.decisionMethods') }}
      </div>
      <ul>
        <li v-for="(methods, i) in (initiative.decision_methods)" :key="i">
          {{ methods.decision_methods_id.name ? methods.decision_methods_id.name : $t('initiatives.methodologyTab.noData') }}
        </li>
      </ul>
    </div>
    <div class="block">
      <div class="title is-mono is-size-5 is-uppercase">
        {{ $t('initiatives.methodologyTab.votingType') }}
      </div>
      <div class="block">
        {{ initiative.voting_method ? initiative.voting_method : $t('initiatives.methodologyTab.noData') }}
      </div>
    </div>
    <div class="block">
      <div class="title is-mono is-size-5 is-uppercase">
        {{ $t('initiatives.methodologyTab.recruitmentMethod') }}
      </div>
      <div class="content">
        <span v-for="(recruitment ,i) in initiative?.recruitment_methods" :key="i" class="tag is-gray is-rounded is-medium">
          {{ recruitment.recruitment_methods_id.name ? recruitment.recruitment_methods_id.name : $t('initiatives.methodologyTab.noData') }}
        </span>
      </div>
      <!-- test conditional on vue (WIP) -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'methodologyTab',
  props: {
    initiative: {
      type: Object,
      default: null
    }
  }
}
</script>
