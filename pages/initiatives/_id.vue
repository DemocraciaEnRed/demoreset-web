<template>
  <section v-if="initiative" class="section">
    <div class="container">
      <div class="box py-6">
        <h2 class="title is-poppins is-size-2-tablet is-size-3-touch">
          {{ initiative.title }}
        </h2>
        <div class="columns py-5">
          <div class="column pl-5">
            <div class="block">
              <p class="is-size-5 is-mono is-uppercase has-text-weight-semibold">
                HUB: {{ initiative.country.hub.name }}
              </p>
              <p class="is-size-5 is-mono is-uppercase has-text-weight-semibold">
                {{ $t('initiatives.region') }}: {{ initiative.location ? initiative.location : $t('initiatives.noData') }}
              </p>
            </div>
            <div class="block">
              <p class="is-size-5 is-mono is-uppercase has-text-weight-semibold">
                {{ $t('initiatives.barriers') }}:
              </p>
              <b-field>
                <b-tag v-for="(barrier,i) in initiative.call_for_barriers.barriers_id" :key="i" class="is-mono" rounded>
                  {{ barrier.length>0 ? barrier.name : $t('initiatives.noData') }}
                  <!-- verificar si acá va call_for_barriers -->
                </b-tag>
              </b-field>
            </div>
            <div class="block">
              <p class="is-size-5 is-mono is-uppercase has-text-weight-semibold">
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
          <div class="column p-1">
            <div class="block maxContent p-2 has-background-white-ter">
              <p class="is-size-5 is-mono is-uppercase has-text-weight-semibold">
                {{ $t('initiatives.status') }}: {{ initiative.initiative_status }}
              </p>
              <p><b>{{ $t('initiatives.startDate') }}: </b> {{ initiative.start_date }} </p>
              <p>
                <b>{{ $t('initiatives.endDate') }}: </b> {{ initiative.end_date ? initiative.end_date : $t('initiatives.ongoing') }}
              </p>
            </div>
          </div>
        </div>
        <InitiativeTabs :initiative="initiative" />
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
      //  {
      //   initiatives_by_id (id: ${params.id}) {
      //     id
      //     status
      //     translations (filter: {languages_code: {code: {_eq: "${i18n.localeProperties.iso}"}}}) {
      //       title
      //       description
      //       objective
      //       subject_of_change
      //       challenge
      //       key_activities
      //       key_methodologies
      //       key_results
      //     }
      //     organization {
      //       id
      //       name
      //       logo {
      //         id
      //       }
      //     }
      //     initiative_status
      //     start_date
      //     end_date
      //     goal_accomplishment {
      //       id
      //       translations (filter: {languages_code: {code: {_eq: "${i18n.localeProperties.iso}"}}}) {
      //         name
      //       }
      //     }
      //     citizen_participation_ladder {
      //       citizen_participation_ladder_id {
      //         id
      //         value
      //         translations (filter: {languages_code: {code: {_eq: "${i18n.localeProperties.iso}"}}}) {
      //           name
      //           description
      //         }
      //       }
      //     }
      //     benefited_population {
      //       benefited_population_id {
      //         id
      //         translations (filter: {languages_code: {code: {_eq: "${i18n.localeProperties.iso}"}}}) {
      //           name
      //         }
      //       }
      //     }
      //     participation_groups_count
      //     participation_individuals_count
      //     recruitment_methods {
      //       recruitment_methods_id {
      //         id
      //         translations (filter: {languages_code: {code: {_eq: "${i18n.localeProperties.iso}"}}}) {
      //           name
      //           description
      //         }
      //       }
      //     }
      //     topics {
      //       initiative_topics_id {
      //         id
      //         value
      //         translations (filter: {languages_code: {code: {_eq: "${i18n.localeProperties.iso}"}}}) {
      //           name
      //         }
      //       }
      //     }
      //     approaches {
      //       approaches_id {
      //         id
      //         translations (filter: {languages_code: {code: {_eq: "${i18n.localeProperties.iso}"}}}) {
      //           name
      //           description
      //         }
      //       }
      //     }
      //     general_methodologies {
      //       general_methodologies_id {
      //         id
      //         translations (filter: {languages_code: {code: {_eq: "${i18n.localeProperties.iso}"}}}) {
      //           name
      //           description
      //         }
      //       }
      //     }
      //     specific_techniques {
      //       specific_techniques_id {
      //         id
      //         translations (filter: {languages_code: {code: {_eq: "${i18n.localeProperties.iso}"}}}) {
      //           name
      //           description
      //         }
      //       }
      //     }
      //     information_resources {
      //       information_resources_id {
      //         id
      //         translations (filter: {languages_code: {code: {_eq: "${i18n.localeProperties.iso}"}}}) {
      //           name
      //         }
      //       }
      //     }
      //     decision_methods {
      //       decision_methods_id {
      //         id
      //         translations (filter: {languages_code: {code: {_eq: "${i18n.localeProperties.iso}"}}}) {
      //           name
      //           description
      //         }
      //       }
      //     }
      //     voting_method {
      //       id
      //       translations (filter: {languages_code: {code: {_eq: "${i18n.localeProperties.iso}"}}}) {
      //         name
      //         description
      //       }
      //     }
      //     political_barriers {
      //       barriers_id {
      //         id
      //         translations (filter: {languages_code: {code: {_eq: "${i18n.localeProperties.iso}"}}}) {
      //           name
      //         }
      //       }
      //     }
      //     participation_mechanism_barriers {
      //       barriers_id {
      //         id
      //         translations (filter: {languages_code: {code: {_eq: "${i18n.localeProperties.iso}"}}}) {
      //           name
      //         }
      //       }
      //     }
      //     cultural_barriers {
      //       barriers_id {
      //         id
      //         translations (filter: {languages_code: {code: {_eq: "${i18n.localeProperties.iso}"}}}) {
      //           name
      //         }
      //       }
      //     }
      //     social_capital_barriers {
      //       barriers_id {
      //         id
      //         translations (filter: {languages_code: {code: {_eq: "${i18n.localeProperties.iso}"}}}) {
      //           name
      //         }
      //       }
      //     }
      //     organizational_barriers {
      //       barriers_id {
      //         id
      //         translations (filter: {languages_code: {code: {_eq: "${i18n.localeProperties.iso}"}}}) {
      //           name
      //         }
      //       }
      //     }
      //     actors_characteristic_barriers {
      //       barriers_id {
      //         id
      //         translations (filter: {languages_code: {code: {_eq: "${i18n.localeProperties.iso}"}}}) {
      //           name
      //         }
      //       }
      //     }
      //     call_for_barriers {
      //       barriers_id {
      //         id
      //         translations (filter: {languages_code: {code: {_eq: "${i18n.localeProperties.iso}"}}}) {
      //           name
      //         }
      //       }
      //     }
      //     information_barriers {
      //       barriers_id {
      //         id
      //         translations (filter: {languages_code: {code: {_eq: "${i18n.localeProperties.iso}"}}}) {
      //           name
      //         }
      //       }
      //     }
      //     argument_barriers {
      //       barriers_id {
      //         id
      //         translations (filter: {languages_code: {code: {_eq: "${i18n.localeProperties.iso}"}}}) {
      //           name
      //         }
      //       }
      //     }
      //     processing_barriers {
      //       barriers_id {
      //         id
      //         translations (filter: {languages_code: {code: {_eq: "${i18n.localeProperties.iso}"}}}) {
      //           name
      //         }
      //       }
      //     }
      //     moderation_barriers {
      //       barriers_id {
      //         id
      //         translations (filter: {languages_code: {code: {_eq: "${i18n.localeProperties.iso}"}}}) {
      //           name
      //         }
      //       }
      //     }
      //     decision_making_barriers {
      //       barriers_id {
      //         id
      //         translations (filter: {languages_code: {code: {_eq: "${i18n.localeProperties.iso}"}}}) {
      //           name
      //         }
      //       }
      //     }
      //   }
      // }
    }
    try {
      const response = await $axios.post('/graphql', theQuery)
      // if status is not published, redirect to home
      // if (response.data.data.campaigns_by_id.status !== 'published') {
      //   $router.push('/')
      // }
      // console.log(response.data.data)
      const theInitiative = response.data.data.initiatives_by_id
      $graphql.mergeFieldTranslations(theInitiative)
      return {
        initiative: theInitiative
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err.response.data.errors[0].extensions)
    }
  },
  data () {
    return {
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
