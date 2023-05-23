<template>
  <section class="py-5 section container">
    <h1 class="is-uppercase has-text-weight-bold is-size-4 pb-6 has-text-centered">
      Upload your call
    </h1>
    <form>
      <b-field label="Title of your call">
        <b-input v-model="title" type="text" placeholder="Call to title" />
      </b-field>
      <b-field label="Brief description of the call">
        <b-input v-model="description" type="text" placeholder="Call to description" />
      </b-field>
      <b-field label="Barriers - up to 3">
        <b-select v-model="selectedBarriers" placeholder="Selecciona el tipo de llamado" required>
          <option v-for="(barrier, index) in data" :key="index" :value="barrier.field_name">
            {{ barrier.translations[0].name }}
          </option>
        </b-select>
      </b-field>
      <b-field label="Type of call">
        <b-select v-if="$i18n.locale == 'es'" v-model="selectedType" placeholder="Selecciona el tipo de llamado" required>
          <option v-for="c in calltoTypesEs" :key="c.value" :value="c.value">
            {{ c.name }}
          </option>
        </b-select>
        <b-select v-else v-model="selectedType" placeholder="Select a type of call" required>
          <option v-for="c in calltoTypesEn" :key="c.value" :value="c.value">
            {{ c.name }}
          </option>
        </b-select>
      </b-field>
      <b-field :label="$t('register.country')">
        <b-select v-if="$i18n.locale == 'es'" v-model="selectedCountry" placeholder="Ingresa tu país" required>
          <option v-for="c in countriesEs" :key="c.code" :value="c.code">
            {{ c.name }}
          </option>
        </b-select>
        <b-select v-else v-model="selectedCountry" placeholder="Enter your country" required>
          <option v-for="c in countriesEn" :key="c.code" :value="c.code">
            {{ c.name }}
          </option>
        </b-select>
      </b-field>
      <b-field label="Location">
        <b-select v-if="$i18n.locale == 'es'" v-model="selectedLocation" placeholder="Selecciona la locación" required>
          <option v-for="c in locationEs" :key="c.value" :value="c.value">
            {{ c.name }}
          </option>
        </b-select>
        <b-select v-else v-model="selectedLocation" placeholder="Select location" required>
          <option v-for="c in locationEn" :key="c.value" :value="c.value">
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
      selectedBarriers: [],
      selectedType: '',
      selectedCountry: '',
      endDate: new Date(),
      title: '',
      description: '',
      content: ''
    }
  },
  computed: {
    unselectableBeforeDate () { return endOfToday() }
  },
  methods: {
    createCall () {
      console.log({
        barriers: this.selectedBarriers,
        type: this.selectedType,
        country: this.selectedCountry,
        endDate: this.endDate,
        title: this.title,
        description: this.description
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
