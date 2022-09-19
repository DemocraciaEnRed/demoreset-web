function jsonConcat (o1, o2) {
  for (const key in o2) {
    o1[key] = o2[key]
  }
  return o1
}

export default ({ app, i18n, params }, inject) => {
  // Inject $hello(msg) in Vue, context and store.
  inject('graphql', {
    mergeFieldTranslations (obj) {
      if (typeof obj === 'object') {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty('translations')) {
          // merge two json
          jsonConcat(obj, obj.translations[0])
          delete obj.translations
        }
        Object.keys(obj).forEach((key) => {
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            this.mergeFieldTranslations(obj[key])
          }
        })
        // eslint-disable-next-line no-empty, no-useless-return
        return
      } else {
        // eslint-disable-next-line no-useless-return
        return
      }
    },
    getQueryForInitiativeById (id, langCode) {
      return `
      {
        initiatives_by_id (id: ${id}) {
          id
          status
          translations (filter: {languages_code: {code: {_eq: "${langCode}"}}}) {
            title
            description
            objective
            subject_of_change
            challenge
            key_activities
            key_methodologies
            key_results
          }
          organization {
            id
            name
            logo {
              id
            }
          }
          initiative_status
          start_date
          end_date
          goal_accomplishment {
            id
            translations (filter: {languages_code: {code: {_eq: "${langCode}"}}}) {
              name
            }
          }
          citizen_participation_ladder {
            citizen_participation_ladder_id {
              id
              value
              translations (filter: {languages_code: {code: {_eq: "${langCode}"}}}) {
                name
                description
              }
            }
          }
          benefited_population {
            benefited_population_id {
              id
              translations (filter: {languages_code: {code: {_eq: "${langCode}"}}}) {
                name
              }
            }
          }
          participation_groups_count
          participation_individuals_count
          recruitment_methods {
            recruitment_methods_id {
              id
              translations (filter: {languages_code: {code: {_eq: "${langCode}"}}}) {
                name
                description
              }
            }
          }
          topics {
            initiative_topics_id {
              id
              value
              translations (filter: {languages_code: {code: {_eq: "${langCode}"}}}) {
                name
              }
            }
          }
          approaches {
            approaches_id {
              id
              translations (filter: {languages_code: {code: {_eq: "${langCode}"}}}) {
                name
                description
              }
            }
          }
          general_methodologies {
            general_methodologies_id {
              id
              translations (filter: {languages_code: {code: {_eq: "${langCode}"}}}) {
                name
                description
              }
            }
          }
          specific_techniques {
            specific_techniques_id {
              id
              translations (filter: {languages_code: {code: {_eq: "${langCode}"}}}) {
                name
                description
              }
            }
          }
          information_resources {
            information_resources_id {
              id
              translations (filter: {languages_code: {code: {_eq: "${langCode}"}}}) {
                name
              }
            }
          }
          decision_methods {
            decision_methods_id {
              id
              translations (filter: {languages_code: {code: {_eq: "${langCode}"}}}) {
                name
                description
              }
            }
          }
          voting_method {
            id
            translations (filter: {languages_code: {code: {_eq: "${langCode}"}}}) {
              name
              description
            }
          }
          political_barriers {
            barriers_id {
              id
              translations (filter: {languages_code: {code: {_eq: "${langCode}"}}}) {
                name
              }
            }
          }
          participation_mechanism_barriers {
            barriers_id {
              id
              translations (filter: {languages_code: {code: {_eq: "${langCode}"}}}) {
                name
              }
            }
          }
          cultural_barriers {
            barriers_id {
              id
              translations (filter: {languages_code: {code: {_eq: "${langCode}"}}}) {
                name
              }
            }
          }
          social_capital_barriers {
            barriers_id {
              id
              translations (filter: {languages_code: {code: {_eq: "${langCode}"}}}) {
                name
              }
            }
          }
          organizational_barriers {
            barriers_id {
              id
              translations (filter: {languages_code: {code: {_eq: "${langCode}"}}}) {
                name
              }
            }
          }
          actors_characteristic_barriers {
            barriers_id {
              id
              translations (filter: {languages_code: {code: {_eq: "${langCode}"}}}) {
                name
              }
            }
          }
          call_for_barriers {
            barriers_id {
              id
              translations (filter: {languages_code: {code: {_eq: "${langCode}"}}}) {
                name
              }
            }
          }
          information_barriers {
            barriers_id {
              id
              translations (filter: {languages_code: {code: {_eq: "${langCode}"}}}) {
                name
              }
            }
          }
          argument_barriers {
            barriers_id {
              id
              translations (filter: {languages_code: {code: {_eq: "${langCode}"}}}) {
                name
              }
            }
          }
          processing_barriers {
            barriers_id {
              id
              translations (filter: {languages_code: {code: {_eq: "${langCode}"}}}) {
                name
              }
            }
          }
          moderation_barriers {
            barriers_id {
              id
              translations (filter: {languages_code: {code: {_eq: "${langCode}"}}}) {
                name
              }
            }
          }
          decision_making_barriers {
            barriers_id {
              id
              translations (filter: {languages_code: {code: {_eq: "${langCode}"}}}) {
                name
              }
            }
          }
        }
      }
      `
    }
  })
}
