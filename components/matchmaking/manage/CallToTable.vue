<template>
  <table-container>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>View</th>
          <th>Title</th>
          <th>Owner</th>
          <th>Enabled</th>
          <th>Created at</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="c in ct" :key="c._id">
          <td>
            <nuxt-link :to="{ path: localePath(`/match/${c._id}`)}" target="_blank">
              <b-icon icon="eye" size="is-small" />
            </nuxt-link>
          </td>
          <td>{{ c.title }}</td>
          <td>{{ c.owner.first_name }} {{ c.owner.last_name }}</td>
          <td>{{ c.enabled }}</td>
          <td>{{ c.createdAt | createdAt() }}</td>
          <td>
            <b-button v-if="c.enabled === false" type="is-success is-rounded" size="is-small" @click="enableCallTo(c)">
              Make enabled
            </b-button>
            <b-button v-else type="is-danger is-rounded" size="is-small" @click="enableCallTo(c)">
              Make disabled
            </b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </table-container>
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
      this.$axios.$put(`http://localhost:4000/api/callto/${callTo._id}`, {
        enabled: true
      })
        .then((res) => {
          actionNotification(this.$buefy, `Activaste la callto ${callTo.title}`, 'is-success', 'check')
          console.log(res)
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
