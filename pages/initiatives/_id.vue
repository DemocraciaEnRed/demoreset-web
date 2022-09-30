<template>
  <section v-if="initiative" class="section">
    <div class="container">
      <div class="box py-6">
        <h2 class="title has-text-black is-poppins is-size-2-tablet is-size-3-touch">
          {{ initiative.title }}
        </h2>
        <div class="columns py-5">
          <div class="column">
            <div class="block">
              <p class="is-size-5 is-mono is-uppercase has-text-weight-semibold">
                HUB: {{ initiative.country.hub.name }}
              </p>
              <p class="is-size-5 is-mono is-uppercase has-text-weight-semibold">
                {{ initiative.country.name }}
              </p>
              <!-- <p class="is-size-5 is-mono is-uppercase has-text-weight-semibold">
                {{ $t('initiatives.region') }}: {{ initiative.location ? initiative.location : $t('initiatives.noData') }}
              </p> -->
            </div>
            <!-- <div class="block">
              <p class="is-size-5 is-mono is-uppercase has-text-weight-semibold">
                {{ $t('initiatives.barriers') }}:
              </p>
              <div v-if="initiativeBarriers.length > 0">
                <p class="tag is-rounded" v-for="barrier in initiativeBarriers" :key="`initiative-${initiative.id}-barrier-${barrier.id}`">
                  {{ barrier.name }}
                </p>
              </div>
              <p v-else>
                {{ $t('initiatives.noData') }}
              </p>
            </div> -->
            <div class="block">
              <p class="is-size-6 is-mono is-uppercase has-text-weight-semibold mb-3">
                {{ $t('initiatives.topics') }}:
              </p>
              <b-field v-if="initiative.topics.length > 0">
                <b-tag v-for="(topic,i) in initiative.topics" :key="i" class="is-mono" rounded>
                  {{ topic.initiative_topics_id.name }}
                </b-tag>
              </b-field>
              <p v-else>
                {{ $t('initiatives.noData') }}
              </p>
            </div>
          </div>
          <div class="column is-narrow">
            <div class="block maxContent p-2 has-background-white-ter">
              <p class="is-mono is-uppercase has-text-weight-semibold mb-5">
                {{ $t('initiatives.status') }}: {{ initiative.initiative_status }}
              </p>
              <p><b>{{ $t('initiatives.startDate') }}: </b> {{ initiative.start_date }} </p>
              <p>
                <b>{{ $t('initiatives.endDate') }}: </b> {{ initiative.end_date ? initiative.end_date : $t('initiatives.ongoing') }}
              </p>
            </div>
          </div>
        </div>
        <InitiativeTabs :initiative="initiative" :barrier-categories="barrierCategories" />
      </div>
    </div>
  </section>
</template>

<script>
import InitiativeTabs from '../../components/initiatives/InitiativeTabs.vue'
export default {
  name: 'InitiativePage',
  components: {
    InitiativeTabs
  },
  async asyncData ({ params, $axios, i18n, $router, $graphql }) {
    const theQuery = {
      query: $graphql.getQueryForInitiativeById(params.id, i18n.localeProperties.iso)
    }
    try {
      const response = await $axios.post('/graphql', theQuery)
      const theInitiative = response.data.data.initiatives_by_id
      const theBarrierCategories = response.data.data.barrier_categories
      $graphql.mergeFieldTranslations(theInitiative)
      $graphql.mergeFieldTranslations(theBarrierCategories)
      return {
        initiative: theInitiative,
        barrierCategories: theBarrierCategories
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err.response.data.errors[0].extensions)
    }
  },
  data () {
    return {
      initiative: null,
      barrierCategories: []
    }
  },
  head () {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    return {
      title: `${this.initiative.title}`,
      htmlAttrs: {
        lang: this.$i18n.locale
      },
      meta: [
        { hid: 'description', name: 'description', content: this.initiative.description },
        { name: 'title', content: `${this.initiative.title}` },
        { name: 'description', content: this.initiative.description },
        { property: 'og:title', content: `${this.initiative.title}` },
        { property: 'og:description', content: this.initiative.description },
        { property: 'twitter:title', content: `${this.initiative.title}` },
        { property: 'twitter:description', content: this.initiative.description },
        ...i18nHead.meta
      ],
      link: [
        ...i18nHead.link
      ]
    }
  },
  computed: {
    initiativeBarriers () {
      if (!this.initiative) { return [] }
      const fieldsWithBarriers = [
        'political_barriers',
        'participation_mechanism_barriers',
        'cultural_barriers',
        'social_capital_barriers',
        'organizational_barriers',
        'actors_characteristic_barriers',
        'call_for_barriers',
        'information_barriers',
        'argument_barriers',
        'processing_barrier',
        'moderation_barrier',
        'decision_making_barrier'
      ]
      const barriers = []
      fieldsWithBarriers.forEach((field) => {
        // console.log(field)
        // console.log(this.initiative[field])
        // if it is an array, add each element to the barriers array
        if (Array.isArray(this.initiative[field])) {
          this.initiative[field].forEach((element) => {
            barriers.push(element.barriers_id)
          })
        } else if (this.initiative[field]) {
          barriers.push(this.initiative[field])
        }
      })
      return barriers
    }
  }
}
</script>
<style lang="scss" scoped>
.maxContent{
  width: max-content;
  p{
  width: max-content;
  }
}
</style>
