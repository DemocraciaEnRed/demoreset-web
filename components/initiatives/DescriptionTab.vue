<template>
  <div class="container">
    <div class="block">
      {{ initiative.description }}
    </div>
    <div class="block">
      <div class="title is-mono is-size-5 is-uppercase">
        {{ $t('initiatives.descriptionTab.projNetworks') }}
      </div>
      <NuxtLink to="#">
        <b-icon
          pack="fa"
          icon="brands fa-facebook"
        />
      </NuxtLink>
      <NuxtLink to="#">
        <b-icon
          pack="fa"
          icon="brands fa-twitter"
        />
      </NuxtLink>
    </div>
    <div class="content">
      <div class="title is-mono is-size-5 is-uppercase">
        {{ $t('initiatives.descriptionTab.purpose') }}
      </div>
      <ul>
        <li v-for="(purpose,i) in initiative.purpose.purposes_id" :key="i">
          {{ purpose.name }}
        </li>
      </ul>
    </div>
    <div class="content">
      <div class="title is-mono is-size-5 is-uppercase">
        {{ $t('initiatives.descriptionTab.approach') }}
      </div>
      <ul>
        <li v-for="(approach,i) in initiative.approaches" :key="i">
          {{ approach.approaches_id.description }}
        </li>
      </ul>
    </div>
    <div class="block">
      <div class="title is-mono is-size-5 is-uppercase">
        {{ $t('initiatives.descriptionTab.challenge') }}
      </div>
      <div class="block">
        {{ initiative.challenge }}
      </div>
    </div>
    <div class="block">
      <div class="title is-mono is-size-5 is-uppercase">
        {{ $t('initiatives.descriptionTab.objective') }}
      </div>
      <div class="block">
        {{ initiative.objective }}
      </div>
    </div>
    <div class="block">
      <div class="title is-mono is-size-5 is-uppercase">
        {{ $t('initiatives.descriptionTab.subjectOfChange') }}
      </div>
      <div class="block">
        {{ initiative.subject_of_change }}
      </div>
    </div>
    <div class="block">
      <div class="title is-mono is-size-5 is-uppercase">
        {{ $t('initiatives.descriptionTab.keyActivities') }}
      </div>
      <div class="block">
        {{ initiative.key_activities }}
      </div>
    </div>
    <div class="content">
      <div class="title is-mono is-size-5 is-uppercase">
        {{ $t('initiatives.descriptionTab.individualsCount') }}
      </div>
      <ul>
        <li class="is-size-4 has-text-weight-light is-roboto-condensed">
          {{ initiative.participation_individuals_count ? initiative.participation_individuals_count: $t('initiatives.descriptionTab.noData') }}
        </li>
      </ul>
    </div>
    <div class="content">
      <div class="title is-mono is-size-5 is-uppercase">
        {{ $t('initiatives.descriptionTab.groupsCount') }}
      </div>
      <ul>
        <li class="is-size-4 has-text-weight-light is-roboto-condensed">
          {{ initiative.participation_groups_count ? initiative.participation_groups_count : $t('initiatives.descriptionTab.noData') }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DescriptionTab',
  props: {
    initiative: {
      type: Object,
      default: null
    }
  }
}
</script>
