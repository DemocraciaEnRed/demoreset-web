<template>
  <form v-if="!loading || isNewCall">
    <b-field :label="$t('matchmaking.formCreateCallTitle')">
      <b-input v-model="title" type="text" placeholder="Call to title" required />
    </b-field>

    <b-field :label="$t('matchmaking.formCreateCallAbout')">
      <b-input v-model="about" type="text" placeholder="Call to description" required />
    </b-field>

    <b-field :label="$t('matchmaking.formCreateCallBarriers')">
      <b-select
        v-model="tags"
        required
        multiple
        expanded
        :placeholder="$t('matchmaking.formCreateCallBarriers')"
      >
        <option v-for="(tag, index) in barriers" :key="index" :value="tag.translations[0].name">
          {{ tag.translations[0].name }}
        </option>
      </b-select>
    </b-field>

    <b-field :label="$t('matchmaking.formCreateCallType')">
      <b-select v-if="$i18n.locale == 'es'" v-model="types[0]" placeholder="Selecciona el tipo de llamado" required>
        <option v-for="c in calltoTypesEs" :key="c.value" :value="c.value">
          {{ c.name }}
        </option>
      </b-select>
      <b-select v-else v-model="types[0]" placeholder="Select a type of call" required>
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
        @click.prevent="$refs.datepicker.toggle()"
      />
    </b-field>

    <b-field label="content">
      <client-only>
        <TipTapEditor v-model="content" />
      </client-only>
    </b-field>
    <div v-if="isNewCall" class="has-text-centered mt-5">
      <b-button type="submit" class="login-button" @click.prevent="createCall">
        {{ $t('matchmaking.createCallButton') }}
      </b-button>
    </div>
    <div v-else>
      <b-button type="submit" class="login-button" @click.prevent="editCall(updatedCallTo)">
        <!-- <b-button type="submit" class="login-button"> -->
        {{ $t('matchmaking.formEditCallButton') }}
      </b-button>
    </div>
  </form>
  <div v-else>
    <b-skeleton size="is-large" :active="loading" />
    <b-skeleton size="is-large" :active="loading" />
    <b-skeleton size="is-large" :active="loading" />
    <b-skeleton size="is-large" :active="loading" />
    <b-skeleton size="is-large" :active="loading" />
    <b-skeleton size="is-large" :active="loading" />
    <b-skeleton size="is-large" :active="loading" />
    <b-skeleton size="is-large" :active="loading" />
  </div>
</template>

<script>
import { endOfToday, isBefore, isToday, parseISO } from 'date-fns'
// import { actionNotification } from '../../components/matchmaking/notifications.js'
import { calltoTypesEs, calltoTypesEn, countriesEn, countriesEs, locationEn, locationEs } from '../../static/index.js'
import TipTapEditor from '~/components/matchmaking/TipTapEditor.vue'

export default {
  name: 'CreateCall',
  components: {
    TipTapEditor
  },
  props: {
    callto: {
      type: Object,
      default: null
    },
    barriers: {
      type: Array,
      default: null
    },
    isNewCall: {
      type: Boolean,
      default: true
    },
    createCall: {
      type: Function,
      default: () => {}
    },
    editCall: {
      type: Function,
      default: () => {}
    }
  },

  data: () => {
    return {
      loading: true,
      calltoTypesEn,
      calltoTypesEs,
      countriesEn,
      countriesEs,
      locationEn,
      locationEs,
      tags: [],
      types: [''],
      country: '',
      location: '',
      endDate: new Date(),
      title: '',
      about: '',
      content: ''
    }
  },
  computed: {
    unselectableBeforeDate () { return endOfToday() },
    updatedCallTo () {
      return {
        title: this.title,
        about: this.about,
        types: this.types,
        tags: this.tags,
        country: this.country,
        location: this.location,
        endDate: this.endDate,
        content: this.content
      }
    }
  },
  mounted () {
    if (this.callto) {
      // mapea todo lo que viene de las props a las diferentes variables locales
      Object.keys(this.callto).forEach((key) => {
        if (key === 'comments') { return }
        if (key === 'endDate') {
          this[key] = parseISO(this.callto[key])
          return
        }
        if (Array.isArray(this.callto[key])) {
          this[key] = [...this.callto[key]]
          return
        }
        if (typeof this.callto[key] === 'object') {
          this[key] = { ...this.callto[key] }
          return
        }
        this[key] = this.callto[key]
      })
    }
    // if (this.barriers) { this.copyOfBarriers = [...this.barriers] }
    this.loading = false
  },
  methods: {
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
