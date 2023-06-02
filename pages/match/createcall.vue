<template>
  <section v-if="userFromStore()" class="py-5 section container">
    <h1 class="is-uppercase has-text-weight-bold is-size-4 pb-6 has-text-centered">
      {{ $t('matchmaking.formCreateCall') }}
    </h1>
    <form>
      <b-field :label="$t('matchmaking.formCreateCallTitle')">
        <b-input v-model="title" type="text" :placeholder="$t('matchmaking.formCreateCallTitle')" required />
      </b-field>
      <b-field :label="$t('matchmaking.formCreateCallAbout')">
        <b-input v-model="about" type="text" :placeholder="$t('matchmaking.formCreateCallAbout')" required />
      </b-field>
      <b-field :label="$t('matchmaking.formCreateCallBarriers')">
        {{ tags }}
        <b-select
          v-model="tags"
          required
          multiple
          expanded
          :placeholder="$t('matchmaking.formCreateCallBarriers')"
        >
          <option v-for="(barrier, index) in data" :key="index" :value="barrier.translations[0].name">
            {{ barrier.translations[0].name }}
          </option>
        </b-select>
      </b-field>
      <b-field :label="$t('matchmaking.formCreateCallType')">
        <b-select v-if="$i18n.locale == 'es'" v-model="types" placeholder="Selecciona el tipo de llamado" required>
          <option v-for="c in calltoTypesEs" :key="c.value" :value="c.value">
            {{ c.name }}
          </option>
        </b-select>
        <b-select v-else v-model="types" placeholder="Select a type of call" required>
          <option v-for="c in calltoTypesEn" :key="c.value" :value="c.value">
            {{ c.name }}
          </option>
        </b-select>
      </b-field>
      <b-field :label="$t('matchmaking.formCreateCallCountry')">
        <b-select v-if="$i18n.locale == 'es'" v-model="country" placeholder="Ingresa tu país" required>
          <option v-for="c in countriesEs" :key="c.code" :value="c.code">
            {{ c.name }}
          </option>
        </b-select>
        <b-select v-else v-model="country" placeholder="Enter your country" required>
          <option v-for="c in countriesEn" :key="c.code" :value="c.code">
            {{ c.name }}
          </option>
        </b-select>
      </b-field>
      <b-field :label="$t('matchmaking.ubication')">
        <b-select v-if="$i18n.locale == 'es'" v-model="location" placeholder="Selecciona la locación" required>
          <option v-for="c in locationEs" :key="c.value" :value="c.value">
            {{ c.name }}
          </option>
        </b-select>
        <b-select v-else v-model="location" placeholder="Select location" required>
          <option v-for="c in locationEn" :key="c.value" :value="c.value">
            {{ c.name }}
          </option>
        </b-select>
      </b-field>
      <b-field :label="$t('matchmaking.formCreateCallDate')">
        <b-datepicker
          ref="datepicker"
          v-model="endDate"
          expanded
          :min-date="unselectableBeforeDate"
          :placeholder="$t('matchmaking.formCreateCallSelectDate')"
        />
        <b-button
          icon-left="calendar-today"
          type="is-primary"
          @click="$refs.datepicker.toggle()"
        />
      </b-field>
      <b-field :label="$t('matchmaking.formCreateCallContent')">
        <client-only>
          <TipTapEditor v-model="content" />
        </client-only>
      </b-field>
      <div class="has-text-centered mt-5">
        <b-button type="submit" class="login-button" @click.prevent="createCall">
          {{ $t('matchmaking.createCallButton') }}
        </b-button>
      </div>
    </form>
  </section>
  <section v-else>
    {{ redirectToLogin() }}
  </section>
</template>

<script>
import { endOfToday, isBefore, isToday, parseISO } from 'date-fns'
import { actionNotification, alertCustomError } from '../../components/matchmaking/notifications.js'
import { calltoTypesEs, calltoTypesEn, countriesEn, countriesEs, locationEn, locationEs } from '../../static/index.js'
import TipTapEditor from '~/components/matchmaking/TipTapEditor.vue'

export default {
  name: 'CreateCall',
  components: {
    TipTapEditor
  },
  inject: ['$t'],
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
      if (this.title === '' || this.about === '' || this.tags.length === 0 || this.types === '' || this.country === '' || this.location === '' || this.endDate.length === 0 || this.content === '' || this.content === '<p></p>') {
        alertCustomError(this.$buefy, `${this.$t('matchmaking.emptyFields')}`)
        return
      }
      this.$axios.$post('http://localhost:4000/api/callto', {
        title: this.title,
        about: this.about,
        tags: this.tags,
        types: this.types,
        country: this.country,
        location: this.location,
        endDate: this.endDate,
        content: this.content
      }).then((response) => {
        actionNotification(this.$buefy, 3000, `${this.$t('matchmaking.createdCallToAlert')}`, 'is-success', 'check')
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
        .finally(() => {
          this.$router.push('/match')
        })
    },
    unselectableDates (day) {
      const endDate = parseISO(day)
      if (isBefore(endDate, this.unselectableBeforeDate) || isToday(endDate)) {
        return false
      }
      return true
    },
    userFromStore () {
      const user = this.$store.state.user
      return user
    },
    redirectToLogin () {
      this.$router.push({ path: this.localePath('/login') })
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
