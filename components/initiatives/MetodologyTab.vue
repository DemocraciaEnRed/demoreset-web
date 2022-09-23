<template>
  <div class="container">
    <div class="block">
      <div class="title is-mono is-size-5 is-uppercase">
        {{ $t('initiatives.methodologyTab.usedMethods') }}
      </div>
      <p>
        {{ initiative.key_methodologies ? initiative.key_methodologies : $t('initiatives.noData') }}
      </p>
    </div>
    <div class="block">
      <div class="title is-mono is-size-5 is-uppercase">
        {{ $t('initiatives.methodologyTab.methodsType') }}
      </div>
      <div class="content">
        <ul v-if="initiative.general_methodologies.length != 0">
          <li v-for="(methodType,i) in initiative.general_methodologies" :key="i">
            {{ methodType.general_methodologies_id.name }}
          </li>
        </ul>
        <ul v-else>
          <li>
            {{ $t('initiatives.noData') }}
          </li>
        </ul>
      </div>
    </div>
    <div class="block">
      <div class="title is-mono is-size-5 is-uppercase">
        {{ $t('initiatives.methodologyTab.methodsTechniques') }}
      </div>
      <div class="content">
        <ul v-if="initiative.specific_techniques.length != 0">
          <li v-for="(techniques, i) in (initiative.specific_techniques)" :key="i">
            {{ techniques.specific_techniques_id.description }}
          </li>
        </ul>
        <ul v-else>
          <li>
            {{ $t('initiatives.noData') }}
          </li>
        </ul>
      </div>
    </div>
    <div class="block">
      <div class="title is-mono is-size-5 is-uppercase">
        {{ $t('initiatives.methodologyTab.participationLadder') }}
      </div>
      <div class="content">
        <ul v-if="initiative.citizen_participation_ladder.length > 0">
          <li v-for="(ladder, i) in (initiative.citizen_participation_ladder)" :key="i">
            {{ ladder.citizen_participation_ladder_id.description }}
          </li>
        </ul>
        <ul v-else>
          <li>{{ $t('initiatives.noData') }}</li>
        </ul>
      </div>
    </div>
    <div class="block">
      <div class="title is-mono is-size-5 is-uppercase">
        {{ $t('initiatives.methodologyTab.learningInfo') }}
      </div>
      <div class="content">
        <ul v-if="initiative.information_resources.length > 0">
          <li v-for="(learning, i) in (initiative.information_resources)" :key="i">
            {{ learning.information_resources_id.name }}
          </li>
        </ul>
        <ul v-else>
          <li>
            {{ $t('initiatives.noData') }}
          </li>
        </ul>
      </div>
    </div>
    <div class="block">
      <div class="title is-mono is-size-5 is-uppercase">
        {{ $t('initiatives.methodologyTab.decisionMethods') }}
      </div>
      <div class="content">
        <ul v-if="initiative.decision_methods.length > 0">
          <li v-for="(methods, i) in (initiative.decision_methods)" :key="i">
            {{ methods.decision_methods_id.name }}
          </li>
        </ul>
        <ul v-else>
          <li>
            {{ $t('initiatives.noData') }}
          </li>
        </ul>
      </div>
    </div>
    <div class="block">
      <div class="title is-mono is-size-5 is-uppercase">
        {{ $t('initiatives.methodologyTab.votingType') }}
      </div>
      <div class="content">
        <ul>
          <li>
            {{ initiative.voting_method ? initiative.voting_method : $t('initiatives.noData') }}
          </li>
        </ul>
      </div>
    </div>
    <div class="block">
      <div class="title is-mono is-size-5 is-uppercase">
        {{ $t('initiatives.methodologyTab.recruitmentMethod') }}
      </div>
      <div class="content">
        <div v-if="initiative.recruitment_methods.length > 0" class="block">
          <span v-for="(recruitment ,i) in initiative.recruitment_methods" :key="i" class="tag is-gray is-rounded is-medium">
            {{ recruitment.recruitment_methods_id.name }}
          </span>
        </div>
        <div v-else class="block">
          <span class="tag is-gray is-rounded is-medium">
            {{ $t('initiatives.noData') }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MethodologyTab',
  props: {
    initiative: {
      type: Object,
      default: null
    }
  }
}
</script>
