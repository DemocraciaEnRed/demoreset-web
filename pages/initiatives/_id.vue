<template>
  <section class="section">
    <div class="container">
      This is the initiative page for <b>{{ initiative.title }}</b>
    </div>
  </section>
</template>

<script>
export default {
  name: 'InitiativePage',
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
