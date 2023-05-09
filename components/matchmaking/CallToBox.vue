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
        Necesito una asociación para un proyecto en curso sobre cuestiones ambientales.
      </p>
    </div>
    <div class="container mb-3">
      <span class="mr-3 is-size-6">Tags:</span> <span class="tag is-rounded is-size-7">Rounded</span> <span class="tag is-rounded is-size-7">Rounded</span>
    </div>
    <div class="container">
      <span class="mr-3 is-size-6">Tipo:</span> <span class="tag is-rounded is-size-7 has-background-yellow">Rounded</span> <span class="tag is-rounded is-size-7">Rounded</span>
    </div>
    <div class="container my-3">
      <span class="is-font-size-14"><b>Fecha de finalización:</b>{{ formatDate(endDate) }}</span>
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
function compareDates (d1, d2) {
  const d1ms = d1.getTime()
  const d2ms = d2.getTime()
  return d1ms - d2ms
}
export default {
  name: 'CallToBox',
  props: {
    activeBox: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      activeCallTo: this.activeBox
    }
  },
  computed: {
    creationDate () { return new Date(2023, 0, 1, 0, 0, 0) },
    endDate () { return new Date(2023, 6, 9, 0, 0, 0) },
    isActive () { return this.activeCallTo ? '' : 'inactive' },
    dateDiff () {
      const date1 = new Date()
      const date2 = this.endDate
      return compareDates(date2, date1)
    },
    dayDiff () {
      const milsInADay = 86400000
      const days = this.dateDiff > 0 ? (this.dateDiff / milsInADay) : 0
      if (days >= 1) {
        return parseInt(days)
      }
      return days
    },
    datePercents () {
      if (this.dateDiff > 0) {
        const callToPeriod = compareDates(this.endDate, this.creationDate)
        const timeUnits = callToPeriod / 100
        return this.dateDiff / timeUnits
      }
      this.toggleActive()
      return 0
    }
  },
  methods: {
    debug (v) {
      console.log(v)
    },
    formatDate (date) {
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
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
