<template>
  <form v-if="!loading || isNewCall">
    <b-field label="Title of your call">
      <b-input v-model="title" type="text" placeholder="Call to title" />
    </b-field>

    <b-field label="Brief about of the call">
      <b-input v-model="about" type="text" placeholder="Call to description" />
    </b-field>

    <b-field label="Barriers - up to 3">
      <b-select
        v-model="tags"
        required
        multiple
        expanded
        placeholder="Selecciona el tipo de llamado (máximo 3)"
      >
        <option v-for="(tag, index) in barriers" :key="index" :value="tag.translations[0].name">
          {{ tag.translations[0].name }}
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
        Send Call
      </b-button>
    </div>
    <div v-else>
      <!-- <b-button type="submit" class="login-button" @click.prevent="editCall()"> -->
      <b-button type="submit" class="login-button">
        Save Changes
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
      content: '<p>Escribe el contenido de tu llamado aquí...</p>'
    }
  },
  computed: {
    unselectableBeforeDate () { return endOfToday() }
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
          console.log('VALOR PARA: ' + key)
          console.log(this[key])
          return
        }
        if (typeof this.callto[key] === 'object') {
          this[key] = { ...this.callto[key] }
          console.log('VALOR PARA: ' + key)
          console.log(this[key])
          return
        }
        this[key] = this.callto[key]
        console.log('VALOR PARA: ' + key)
        console.log(this[key])
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
    },
    tagsLimiter () {
      if (this.tags.length > 3) {
        alert('Solo puedes seleccionar 3 tags')
        this.tags.pop()
      }
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
