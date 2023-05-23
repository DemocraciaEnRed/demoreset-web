<template>
  <section class="py-5 section container">
    <h1 class="is-uppercase has-text-weight-bold is-size-4 pb-6 has-text-centered">
      Upload your call
    </h1>
    <form>
      <b-field label="Title of your call">
        <b-input v-model="title" type="text" placeholder="Call to title" />
      </b-field>
      <b-field label="Brief about of the call">
        <b-input v-model="about" type="text" placeholder="Call to description" />
      </b-field>
      <b-field label="Barriers - up to 3">
        <b-select v-model="tags" placeholder="Selecciona el tipo de llamado" required>
          <option v-for="(barrier, index) in data" :key="index" :value="barrier.translations[0].name">
            {{ barrier.translations[0].name }}
          </option>
        </b-select>
      </b-field>
      <b-field label="Type of call">
        <b-select v-if="$i18n.locale == 'es'" v-model="types" placeholder="Selecciona el tipo de llamado" required>
          <option v-for="c in calltoTypesEs" :key="c.value" :value="c.name">
            {{ c.name }}
          </option>
        </b-select>
        <b-select v-else v-model="types" placeholder="Select a type of call" required>
          <option v-for="c in calltoTypesEn" :key="c.value" :value="c.name">
            {{ c.name }}
          </option>
        </b-select>
      </b-field>
      <b-field :label="$t('register.country')">
        <b-select v-if="$i18n.locale == 'es'" v-model="country" placeholder="Ingresa tu país" required>
          <option v-for="c in countriesEs" :key="c.code" :value="c.code">
            {{ c.name }}
          </option>
        </b-select>
        <b-select v-else v-model="country" placeholder="Enter your country" required>
          <option v-for="c in countriesEn" :key="c.code" :value="c.name">
            {{ c.name }}
          </option>
        </b-select>
      </b-field>
      <b-field label="Location">
        <b-select v-if="$i18n.locale == 'es'" v-model="location" placeholder="Selecciona la locación" required>
          <option v-for="c in locationEs" :key="c.value" :value="c.name">
            {{ c.name }}
          </option>
        </b-select>
        <b-select v-else v-model="location" placeholder="Select location" required>
          <option v-for="c in locationEn" :key="c.value" :value="c.name">
            {{ c.name }}
          </option>
        </b-select>
      </b-field>
      <b-field label="end date">
        <b-datepicker
          ref="datepicker"
          v-model="endDate"
          expanded
          :min-date="unselectableBeforeDate"
          placeholder="Select a date"
        />
        <b-button
          icon-left="calendar-today"
          type="is-primary"
          @click="$refs.datepicker.toggle()"
        />
      </b-field>
      <div class="has-text-centered mt-5">
        <b-button type="submit" class="login-button" @click.prevent="createCall">
          Send Call
        </b-button>
      </div>
    </form>
    <div>
      <client-only>
        <TipTapEditor :content="content" />
      </client-only>
    </div>
  </section>
</template>

<script>
import { endOfToday, isBefore, isToday, parseISO } from 'date-fns'
import { calltoTypesEs, calltoTypesEn, countriesEn, countriesEs, locationEn, locationEs } from '../../static/index.js'
import TipTapEditor from '~/components/matchmaking/TipTapEditor.vue'

export default {
  name: 'CreateCall',
  components: {
    TipTapEditor
  },
  async asyncData ({ i18n, $axios, $graphql }) {
    try {
      const theQuery = {
        query: $graphql.getQueryForAllBarriers(i18n.localeProperties.iso)
      }
      const response = await $axios.post('/graphql', theQuery)
      return {
        data: response.data.data.barrier_types,
        loading: false
      }
    } catch (error) {
      console.error(error)
      return {
        data: null,
        loading: false
      }
    }
  },
  data: () => {
    return {
      loading: true,
      data: null,
      calltoTypesEn,
      calltoTypesEs,
      countriesEn,
      countriesEs,
      locationEn,
      locationEs,
      barriers: [],
      tags: [],
      types: '',
      country: '',
      location: '',
      endDate: [],
      title: '',
      about: '',
      content: ''
    }
  },
  computed: {
    unselectableBeforeDate () { return endOfToday() }
  },
  methods: {
    createCall () {
      // console.log({
      //   title: this.title,
      //   about: this.about,
      //   selectedBarriers: this.selectedBarriers,
      //   types: this.types,
      //   selectedCountry: this.selectedCountry,
      //   location: this.selectedLocation,
      //   endDate: this.endDate,
      //   content: 'test'
      // })
      this.$axios.$post('http://localhost:4000/api/callto', {
        title: this.title,
        about: this.about,
        tags: this.tags,
        types: this.types,
        country: this.country,
        location: this.location,
        endDate: this.endDate,
        content: 'test'
      }).then((response) => {
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
    },
    unselectableDates (day) {
      const endDate = parseISO(day)
      if (isBefore(endDate, this.unselectableBeforeDate) || isToday(endDate)) {
        return false
      }
      return true
    }
  }
}
</script>
<style scoped>
.mw-300 {
  max-width: 300px;
  margin: auto;
}

.login-button {
  width: 100%;
  max-width: 100%;
  border-radius: 10px;
  border: 2px solid #000;
}

</style>
