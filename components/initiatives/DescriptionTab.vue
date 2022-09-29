<template>
  <div v-if="initiative" class="container">
    <div class="block">
      {{ initiative.description }}
    </div>
    <div class="block">
      <div class="title is-mono is-size-5 is-uppercase">
        {{ $t('initiatives.descriptionTab.projNetworks') }}
      </div>
      <!-- <NuxtLink to="#">
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
      </NuxtLink> -->
    </div>
    <div class="content">
      <div class="title is-mono is-size-5 is-uppercase">
        {{ $t('initiatives.descriptionTab.purpose') }}
      </div>
      <ul>
        <li v-for="(purpose,i) in initiative.purpose" :key="i">
          {{ purpose.purposes_id.name ? purpose.purposes_id.name : $t('initiatives.noData') }}
        </li>
      </ul>
    </div>
    <div class="content">
      <div class="title is-mono is-size-5 is-uppercase">
        {{ $t('initiatives.descriptionTab.approach') }}
      </div>
      <ul v-if="initiative.approaches.length">
        <li v-for="(approach,i) in initiative.approaches" :key="i">
          <span class="">{{ approach.approaches_id.name }}</span>
          <span v-if="approach.approaches_id.description" class="has-text-grey is-size-7"><br><i>{{ approach.approaches_id.description }}</i></span>
        </li>
      </ul>
      <p v-else>
        {{ $t('initiatives.noData') }}
      </p>
    </div>
    <div class="block">
      <div class="title is-mono is-size-5 is-uppercase">
        {{ $t('initiatives.descriptionTab.challenge') }}
      </div>
      <div class="block">
        {{ initiative.challenge ? initiative.challenge : $t('initiatives.noData') }}
      </div>
    </div>
    <div class="block">
      <div class="title is-mono is-size-5 is-uppercase">
        {{ $t('initiatives.descriptionTab.objective') }}
      </div>
      <div class="block">
        {{ initiative.objective ? initiative.objective : $t('initiatives.noData') }}
      </div>
    </div>
    <div class="block">
      <div class="title is-mono is-size-5 is-uppercase">
        {{ $t('initiatives.descriptionTab.subjectOfChange') }}
      </div>
      <div class="block">
        {{ initiative.subject_of_change ? initiative.subject_of_change : $t('initiatives.noData') }}
      </div>
    </div>
    <div class="block">
      <div class="title is-mono is-size-5 is-uppercase">
        {{ $t('initiatives.descriptionTab.keyActivities') }}
      </div>
      <div class="block">
        {{ initiative.key_activities ? initiative.key_activities : $t('initiatives.noData') }}
      </div>
    </div>
    <div class="content">
      <div class="title is-mono is-size-5 is-uppercase">
        {{ $t('initiatives.descriptionTab.individualsCount') }}
      </div>
      <ul>
        <li class="is-size-4 has-text-weight-light is-roboto-condensed">
          {{ initiative.participation_individuals_count ? initiative.participation_individuals_count: $t('initiatives.noData') }}
        </li>
      </ul>
    </div>
    <div class="content">
      <div class="title is-mono is-size-5 is-uppercase">
        {{ $t('initiatives.descriptionTab.groupsCount') }}
      </div>
      <ul>
        <li class="is-size-4 has-text-weight-light is-roboto-condensed">
          {{ initiative.participation_groups_count ? initiative.participation_groups_count : $t('initiatives.noData') }}
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
