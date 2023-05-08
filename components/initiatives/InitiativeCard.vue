<!-- eslint-disable vue/no-parsing-error -->
<template>
  <div class="card organization-card my-2">
    <div class="card-content">
      <div class="columns mb-0 is-vcentered is-mobile">
        <div v-if="initiative.organization?.logo" class="column is-narrow">
          <nuxt-link :to="{ path: localePath('/initiatives/' + initiative.id) }">
            <img :src="`${apiUrl}/assets/${initiative.organization.logo?.id}?${transformationImage}`" class="organization-logo">
          </nuxt-link>
        </div>
        <div v-else class="column is-narrow">
          <nuxt-link :to="{ path: localePath('/initiatives/' + initiative.id) }">
            <figure class="organization-logo empty" />
          </nuxt-link>
        </div>
        <div class="column">
          <div class="has-text-left ml-4">
            <p class="is-mono">
              {{ initiative.organization?.name }} <a v-if="initiative.organization?.email" :href="`mailto:${initiative.organization?.email}`"><i class="fas fa-envelope has-text-red fa-lg" /></a>
            </p>
            <!-- ANALIZAR CONSISTENCIA DE DATOS ORGANIZACION - CONDICIONAL NECESARIO? -->
            <nuxt-link :to="{ path: localePath('/initiatives/' + initiative.id) }" class="has-text-black">
              <h4 class="is-mono is-uppercase has-text-weight-semibold is-size-5">
                {{ initiative.title }}
              </h4>
            </nuxt-link>
            <div v-if="initiative.topics.length > 0" class="mt-4 is-flex is-flex-direction-row is-align-items-flex-start">
              <div class="mr-2">
                <b>Tags:</b>
              </div>
              <div class="is-flex-grow-1">
                <p v-for="topic in initiative.topics" :key="`topic-${topic.initiative_topics_id.id}-initiative-${initiative.id}`" class="tag topic-tag is-rounded">
                  {{ topic.initiative_topics_id.name }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-hidden-touch is-narrow has-text-right-desktop has-text-centered-touch">
          <div class="mb-5">
            <p class="has-text-weight-semibold mb-2">
              {{ $t('initiatives.card.startDate') }}:
            </p>
            <span>{{ initiative.start_date ?? '- - - -' }}</span>
          </div>
          <div>
            <p class="has-text-weight-semibold mb-2">
              {{ $t('initiatives.card.status') }}
            </p>
            <div>{{ initiative.initiative_status == 'ongoing' ? $t('initiatives.ongoing') : $t('initiatives.finished') }}</div>
          </div>
        </div>
      </div>
      <hr class="is-hidden-desktop">
      <div class="is-hidden-desktop is-flex is-flex-direction-row is-justify-content-space-around is-align-items-center">
        <div class="is-flex-grow-1 has-text-centered">
          <p class="has-text-weight-semibold mb-2">
            {{ $t('initiatives.card.startDate') }}:
          </p>
          <span>{{ initiative.start_date ?? '- - - -' }}</span>
        </div>
        <div class="is-flex-grow-1 has-text-centered">
          <p class="has-text-weight-semibold mb-2">
            {{ $t('initiatives.card.status') }}
          </p>
          <div>{{ initiative.initiative_status == 'ongoing' ? $t('initiatives.ongoing') : $t('initiatives.finished') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InitiativeCard',
  props: {
    initiative: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      transformationImage: 'transforms=[["resize", {"background":"rgb(255,255,255)","width": 150,"height": 150,"fit":"contain"}]]'
    }
  },
  computed: {
    apiUrl () {
      return process.env.API_URL
    }
  }
}
</script>

<style lang="scss" scoped>
.organization-logo{
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 1px solid #cacaca;
  background-color: #fff;
  &.empty{
    background-color: #cacaca;
  }
}
.topic-tag {
  background-color: #DFDFDF;
  border: 1px solid #b6b6b6;
  margin-top: 2px;
  margin-bottom: 2px;
}
</style>
