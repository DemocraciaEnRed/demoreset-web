<template>
  <section>
    <b-table
      :data="ct"
    >
      <b-table-column v-slot="props" field="title" label="Title" searchable>
        <nuxt-link :to="{ path: localePath(`/match/${props.row._id}`)}" target="_blank">
          {{ props.row.title }}
        </nuxt-link>
      </b-table-column>
      <b-table-column v-slot="props" field="owner" label="Owner" searchable>
        {{ props.row.owner.first_name }} {{ props.row.owner.last_name }}
      </b-table-column>
      <b-table-column v-slot="props" field="created_at" label="Created At">
        {{ props.row.createdAt | createdAt() }}
      </b-table-column>
      <b-table-column v-slot="props" field="status" label="Status">
        <span v-if="props.row.enabled === true" class="tag is-link">
          Enabled
        </span>
        <span v-else class="tag is-warning">
          Disabled
        </span>
      </b-table-column>
      <b-table-column v-slot="props" label="Actions">
        <b-button v-if="props.row.enabled === false" type="is-success is-rounded" size="is-small" @click="enableCallTo(props)">
          Show
        </b-button>
        <b-button v-else type="is-danger is-rounded" size="is-small" @click="enableCallTo(props)">
          Hide
        </b-button>
      </b-table-column>
    </b-table>
  </section>
</template>

<script>
import { formatISO } from 'date-fns'
import { actionNotification } from '../notifications.js'
export default {
  name: 'CallToTable',
  filters: {
    createdAt (date) {
      return formatISO(new Date(date), { representation: 'date' })
    }
  },
  props: {
    ct: {
      type: Array,
      required: true
    }
  },
  methods: {
    enableCallTo (callTo) {
      this.$axios.$patch(`http://localhost:4000/api/callto/${callTo.row._id}`, {
        enabled: !callTo.row.enabled
      })
        .then((res) => {
          if (callTo.row.enabled === true) {
            actionNotification(this.$buefy, 3000, `Desactivaste la callto ${callTo.row.title}`, 'is-danger', 'times-circle')
          } else {
            actionNotification(this.$buefy, 3000, `Activaste la callto ${callTo.row.title}`, 'is-success', 'check')
          }
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(
          setTimeout(() => {
            this.$router.go()
          }, 2000)
        )
    }
  }
}
</script>

<style>

</style>
