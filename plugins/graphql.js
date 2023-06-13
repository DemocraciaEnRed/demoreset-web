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
    getQueryForAllInitiativesList (page, query, langCode) {
      // query has:
      // query {
      //   hub
      //   barrier
      //   barrierType
      //   barrierCategory
      //   }
      const filters = []
      if (query.hub) {
        const hubQuery = `{country: {hub: {id: {_eq: ${query.hub.id}}}}}`
        filters.push(hubQuery)
      }
      if (query.barrier && query.barrierType) {
        const barrierFilter = `{ ${query.barrierType.field_name}: { barriers_id: { id: {_in: ${query.barrier.id}} } } }`
        filters.push(barrierFilter)
      } else if (query.barrierType) {
        const typeFilter = `{ ${query.barrierType.field_name}: { id: { _nnull: true } } }`
        filters.push(typeFilter)
      } else if (query.barrierCategory) {
        const theFields = query.barrierCategory.barrier_types.map((item) => {
          return `{ ${item.field_name}: { id: { _nnull: true } } }`
        })
        const categoriesFilter = `{_or: [${theFields.join(',')}]}`
        filters.push(categoriesFilter)
      }
      return `
      {
        initiatives_aggregated(filter: {_and: [${filters.join(',')}]}) {
          count {
            id
          }
        }
        initiatives (page: ${page}, limit: 10, filter: {_and: [${filters.join(',')}]}) {
          id
          translations (filter: {languages_code: {code: {_eq: "${langCode}"}}}) {
            title
          }
          initiative_status
          organization{
            logo{
              id
            }
            name
            email
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
          start_date
          end_date
        }
      }
      `
    },
    getQueryForAllBarriers (langCode) {
      return `
        {
          barrier_types {
            id
            field_name
            translations (filter: {languages_code: {code: {_eq: "${langCode}"}}}) {
              name
            }
          }
        }
      `
    },
    getQueryForInitiativeFilters (langCode) {
      return `
      {
        hubs{
          id,
          translations (filter: {languages_id: {code: {_eq: "${langCode}"}}}) {
            name
          }
        }
        barrier_categories {
          id
          translations (filter: {languages_code: {code: {_eq: "${langCode}"}}}) {
            name
          }
          barrier_types {
            id
            field_name
          }
        }
        barrier_types {
          id
          category {
            id
          }
          field_name
          translations (filter: {languages_code: {code: {_eq: "${langCode}"}}}) {
            name
          }
          barriers {
            id
            type {
              field_name
            }
            translations (filter: {languages_code: {code: {_eq: "${langCode}"}}}) {
              name
            }
          }
        }
      }
      `
    },
    getQueryForInitiativeById (id, langCode) {
      return `
      {
        barrier_categories{
          id
          translations (filter: {languages_code: {code: {_eq: "${langCode}"}}}) {
            name
          }
          barrier_types {
            id
            translations (filter: {languages_code: {code: {_eq: "${langCode}"}}}) {
              name
            }
            field_name
          }
        }
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
            email
            logo {
              id
            }
          }
          country {
            hub {
              translations (filter: {languages_id: {code: {_eq: "${langCode}"}}}){
                name
              }
            }
            translations (filter: {languages_code: {code: {_eq: "${langCode}"}}}) {
              name
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
          purpose {
            purposes_id {
              translations (filter: {languages_code: {code: {_eq: "${langCode}"}}}) {
                name
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
    },
    getQueryAllMasterclasses (langCode) {
      return `
      {
        masterclasses (filter: {_or: [{status: {_eq: "published"}},{status: {_eq: "upcoming"}}]}, sort: ["date_published","sort"]) {
          id
          date_published
          author
          author_avatar{
            id
          }
          status
          sort
          translations (filter: {languages_code: {code: {_eq: "${langCode}"}}}){
            title
            objective
          }
        }
      }
      `
    },
    getQueryForMasterclassById (id, langCode) {
      return `
      {
        masterclasses_by_id (id: "${id}"){
          id
          date_published
          author
          author_url
          author_avatar{
            id
          }
          youtube_url
          status
          sort
          translations (filter: {languages_code: {code: {_eq: "${langCode}"}}}){
            title
            description
            objective
          }
        }
      }
      `
    },
    getQueryForAllOrganizations () {
      return `
        {
          organizations {
            id
            name
            country {
              translations {
                name
              }
            }
            logo {
              id
            }
          }
        }
      `
    },
    getQueryForOrganizationById (id, langCode) {
      return `
        {
          organizations_by_id (id: ${id}) {
            name
            email,
            works_with_ethnic_communities
            ethnic_community_name
            lgtbiqplus
            locations
            logo {
              id
            }
            translations (filter: {languages_code: {code: {_eq: "${langCode}"}}}) {
              description
            }
            whatsapp
            initiatives {
              id
              translations (filter: {languages_code: {code: {_eq: "${langCode}"}}}) {
                title
              }
              country {
                hub {
                  translations (filter: {languages_id: {code: {_eq: "${langCode}"}}}){
                    name
                  }
                }
                translations (filter: {languages_code: {code: {_eq: "${langCode}"}}}) {
                  name
                }
              }
              initiative_status
              organization{
                logo{
                  id
                }
                name
                email
              }
              start_date
              end_date
            }
          }
        }
      `
    }
  })
}
