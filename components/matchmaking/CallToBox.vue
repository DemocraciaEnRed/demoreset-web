<template>
  <div :class="`box ${isActive}`">
    <div class="media is-align-items-center">
      <div class="media-left">
        <figure class="image is-48x48">
          <img class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" alt="Image">
        </figure>
      </div>
      <div class="media-content">
        <div class="content is-size-5">
          <span class="is-mono">NOMBRE DE LA ORG</span>
          <span class="icon is-small has-text-red ml-1 ctm-opacity-60">
            <i class="fas fa-envelope" aria-hidden="true" />
          </span>
        </div>
      </div>
    </div>
    <div class="container my-5">
      <p class="is-mono is-size-5">
        {{ ct.title }}
      </p>
    </div>
    <div class="container mb-3">
      <span class="mr-3 is-size-6">Tags:</span> <span class="tag is-rounded is-size-7">Rounded</span> <span class="tag is-rounded is-size-7">Rounded</span>
    </div>
    <div class="container">
      <span class="mr-3 is-size-6">Tipo:</span> <span class="tag is-rounded is-size-7 has-background-yellow">Rounded</span> <span class="tag is-rounded is-size-7">Rounded</span>
    </div>
    <div class="container my-3">
      <span class="is-font-size-14"><b>Fecha de finalización: </b>{{ ct.endDate | formatDate }}</span>
      <b-progress
        type="is-primary"
        size="is-large"
        :value="datePercents"
        show-value
      >
        <b v-if="dayDiff > 0 && dayDiff < 1" class="has-text-black">Quedan solo algunas horas para aplicar</b>
        <b v-else-if="dayDiff > 0" class="has-text-black">Hay {{ dayDiff }} {{ dayDiff === 1 ? 'día restante':'días restantes' }} para aplicar</b>
        <b v-else class="has-text-black">Finalizó el periodo para aplicar</b>
      </b-progress>
    </div>
  </div>
</template>
<script>
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, isBefore, isAfter, startOfDay, format, parseISO, differenceInMilliseconds } from 'date-fns'

export default {
  name: 'CallToBox',
  filters: {
    formatDate (date) {
      return format(date, 'dd/MM/yyyy')
    }
  },
  props: {
    activeBox: {
      type: Boolean,
      default: true
    },
    ct: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      activeCallTo: this.activeBox
    }
  },
  computed: {
    isActive () { return this.activeCallTo ? '' : 'inactive' },
    comparedDateWithCurrentInDays () {
      const currentDate = new Date()
      const date = parseISO(this.ct.endDate)
      // Check if the date is in the past
      if (isBefore(date, currentDate)) {
        return -1
      }
      // Check if the date is in the future
      if (isAfter(date, currentDate)) {
        const diffInDays = differenceInDays(date, currentDate)
        const startOfCurrentDate = startOfDay(currentDate)
        // Check if the difference is equal or greater than a day
        if (diffInDays >= 1) {
          return diffInDays
        }
        // Calculate the difference in fractions of a day
        const diffInHours = differenceInHours(date, startOfCurrentDate)
        const diffInMinutes = differenceInMinutes(date, startOfCurrentDate)
        const diffInSeconds = differenceInSeconds(date, startOfCurrentDate)
        const diffInMilliseconds = date.getTime() - startOfCurrentDate.getTime()

        const fractionalDays = diffInHours / 24 + diffInMinutes / (24 * 60) + diffInSeconds / (24 * 60 * 60) + diffInMilliseconds / (24 * 60 * 60 * 1000)
        return parseFloat(fractionalDays.toFixed(2))
      }

      // The date is the current date
      return 0
    },
    datePercents () {
      if (this.comparedDateWithCurrentInDays === 0) { return 100 }
      if (this.comparedDateWithCurrentInDays > 0) {
        const callToPeriod = differenceInMilliseconds(parseISO(this.ct.endDate), parseISO(this.ct.createdAt))
        // console.log(callToPeriod)
        // const timeUnits = callToPeriod / 100
        // return this.dateDiff / timeUnits
        return 1
      }

      this.toggleActive()
      return 0
    }
  },
  methods: {
    debug (v) {
      console.log(v)
    },
    toggleActive (v) {
      this.activeCallTo = false
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
.box{
  border: 1px solid #E6E6E6;
  box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.35);
  border-radius: 20px;
  &.inactive{
    background: #C7C7C7;
    opacity: 0.75;
    border: none;
    box-shadow: initial;
  }
}
</style>
