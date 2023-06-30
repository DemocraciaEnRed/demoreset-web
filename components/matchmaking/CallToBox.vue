<template>
  <div v-if="ct.enabled === true" class="h-100">
    <div :class="`box ${isActive} is-flex is-flex-direction-column`">
      <div class="media is-align-items-center">
        <div v-if="ct.owner.organization.logoUrl !== null" class="media-left">
          <figure class="image is-64x64">
            <img :src="`${apiUrl}/assets/${ct.owner.organization.logoUrl}?${transformationImage}`" class="is-rounded">
          </figure>
        </div>
        <div class="media-content">
          <div class="content is-size-5">
            <span class="is-mono has-text-weight-medium">{{ ct.owner.organization.name || ct.owner.first_name + ' ' + ct.owner.last_name }}</span>
            <!-- <span class="icon is-small has-text-red ml-1 ctm-opacity-60">
              <i class="fas fa-envelope" aria-hidden="true"><a :href="`mailto:${ct.owner.email}`" /></i>
            </span> -->
          </div>
        </div>
      </div>
      <div class="container-fluid is-flex-grow-1 is-flex is-flex-direction-column is-justify-content-space-between">
        <div class="content my-5">
          <p class="is-mono is-size-5 is-capitalized has-text-grey-darker has-text-weight-medium">
            {{ ct.title }}
          </p>
        </div>
        <div class="mb-3">
          <div v-if="tagNames.length > 0" class="is-flex">
            <span class="mr-3 is-size-6">Tags:</span>
            <div>
              <span v-for="(tag,idx) in tagNames" :key="idx" class="tag is-rounded is-size-7 mr-1 mb-1">{{ tag }}</span>
            </div>
          </div>
          <div class="content">
            <span class="mr-3 is-size-6">{{ $t('matchmaking.type') }}</span>
            <span class="tag is-rounded is-size-7 has-background-yellow">
              {{ ct.location | valueToName('location', $i18n.locale) }}
            </span>
            <span v-for="(type,idx) in ct.types" :key="idx" class="tag is-rounded is-size-7">
              {{ type | valueToName('types', $i18n.locale) }}
            </span>
          </div>
        </div>
        <div class="content my-3">
          <span class="is-font-size-14"><b>{{ $t('matchmaking.dateEnd') }} </b>{{ endDate | formatDate }}</span>
          <b-progress
            type="is-primary"
            size="is-large"
            :value="datePercents"
            show-value
          >
            <b v-if="dayDiff > 0 && dayDiff < 1" class="has-text-black">{{ $t('matchmaking.statusHours') }}</b>
            <b v-else-if="dayDiff >= 1" class="has-text-black">{{ $t('matchmaking.pluralize1') }} {{ dayDiff }} {{ dayDiff | pluralize(`${ $t('matchmaking.pluralize2') }`,`${ $t('matchmaking.pluralize3') }`, `${ $t('matchmaking.pluralize3') }`) }} {{ $t('matchmaking.pluralize4') }}</b>
            <b v-else class="has-text-black">{{ $t('matchmaking.statusEnded') }}</b>
          </b-progress>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { format, parseISO, differenceInMilliseconds, milliseconds } from 'date-fns'
import { calltoTypesEn, calltoTypesEs, countriesEn, countriesEs, locationEn, locationEs } from '~/static'

export default {
  name: 'CallToBox',
  filters: {
    formatDate (date) {
      if (typeof date === 'string') { date = parseISO(date) }
      return format(date, 'dd/MM/yyyy')
    },
    pluralize (num, singularStr, pluralStr, none) {
      if (num === 1) { return singularStr }
      if (num <= 0) { return none }
      return pluralStr
    },
    valueToName (value, field, locale) {
      let source = []
      let searchField = ''
      if (field === 'country') {
        searchField = 'code'
        if (locale === 'es') {
          source = [...countriesEs]
        } else {
          source = [...countriesEn]
        }
      }
      if (field === 'location') {
        searchField = 'value'
        if (locale === 'es') {
          source = [...locationEs]
        } else {
          source = [...locationEn]
        }
      }
      if (field === 'types') {
        searchField = 'value'
        if (locale === 'es') {
          source = [...calltoTypesEs]
        } else {
          source = [...calltoTypesEn]
        }
      }
      const item = source.find(x => x[searchField] === value)
      return item.name
    }
  },
  props: {
    ct: {
      type: Object,
      default: () => {}
    },
    barriers: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      transformationImage: 'transforms=[["resize", {"background":"rgb(255,255,255)","width": 150,"height": 150,"fit":"contain"}]]',
      currentDate: new Date(),
      loading: true
    }
  },
  computed: {
    endDate () { return parseISO(this.ct.endDate) },
    dateDiff () {
      const currentDate = this.currentDate
      const date = this.endDate
      return differenceInMilliseconds(date, currentDate)
    },
    dayDiff () {
      const dateDiff = this.dateDiff
      const millisecondsInDay = milliseconds({ days: 1 })
      const days = dateDiff / millisecondsInDay
      // Check if the difference is equal or greater than a day
      if (days >= 1) {
        return parseInt(days)
      }
      // return fraction of a day
      return days
    },
    datePercents () {
      if (this.dayDiff < 0) {
        return -1
      }
      const callToPeriod = differenceInMilliseconds(parseISO(this.ct.endDate), parseISO(this.ct.createdAt))
      const timeUnits = callToPeriod / 100
      return this.dateDiff / timeUnits
    },
    apiUrl () {
      return this.$config.apiUrl
    },
    isActive () { return this.datePercents !== -1 ? '' : 'inactive' },
    tagNames () {
      return this.ct.tags.map((tagField) => {
        const barrier = this.barriers.find(barrier => barrier.field_name === tagField)
        if (barrier.translations) {
          return barrier.translations[0].name
        }
        return null
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.ctm-opacity-60{
  opacity: 60%;
}
.tag{
  border: 1px solid rgba(0, 0, 0, 0.12);
}

.h-100{
  height: 100%;
}

.box{
  border: 1px solid #E6E6E6;
  box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.35);
  border-radius: 20px;
  height: 100%;
  &.inactive{
    background: #C7C7C7;
    opacity: 0.75;
    border: none;
    box-shadow: initial;
  }
}
</style>
