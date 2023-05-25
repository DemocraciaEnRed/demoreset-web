<template>
  <section>
    <b-table
      :data="users"
      :mobile-cards="hasMobileCards"
    >
      <b-table-column v-slot="props" field="email" label="Email">
        {{ props.row.email }}
      </b-table-column>
      <b-table-column v-slot="props" field="last_name" label="Full name">
        {{ props.row.first_name }} {{ props.row.last_name }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        field="organization"
        label="Organization"
      >
        {{ props.row.organization.name }}
      </b-table-column>
      <b-table-column v-slot="props" field="created_at" label="Created At">
        {{ props.row.createdAt | createdAt() }}
      </b-table-column>
      <b-table-column v-slot="props" label="Actions">
        <b-button v-if="checkAdmin(props) === false" type="is-success is-rounded" size="is-small" @click="makeAdmin(props)">
          Make admin
        </b-button>
        <b-button v-else type="is-danger is-rounded" size="is-small" @click="removeAdmin(props)">
          Remove admin
        </b-button>
      </b-table-column>
    </b-table>
  </section>
</template>

<script>
import { formatISO } from 'date-fns'
import { actionNotification } from '../notifications.js'
export default {
  name: 'UsersTable',
  filters: {
    createdAt (date) {
      return formatISO(new Date(date), { representation: 'date' })
    }
  },
  data () {
    return {
      users: [],
      hasMobileCards: true
    }
  },
  async fetch () {
    try {
      const { data } = await this.$axios.get('http://localhost:4000/api/users')
      this.users = data
    } catch (error) {
      console.log(error)
    }
  },
  computed: {
    userFromStore () {
      const user = this.$store.state.user
      return user
    }
  },
  methods: {
    checkAdmin (user) {
      const isAdmin = user.row.roles.some(role => role.name === 'admin')
      if (isAdmin) {
        return true
      } else {
        return false
      }
    },
    makeAdmin (user) {
      this.$axios.$put(`http://localhost:4000/api/users/${user.row._id}`, {
        roles: ['admin']
      })
        .then((res) => {
          actionNotification(this.$buefy, `Hiciste admin a ${user.row.first_name} ${user.row.last_name}`, 'is-success', 'check')
          console.log(res)
        })
        .catch((err) => {
          console.error(err)
        })
        .finally(
          setTimeout(() => {
            this.$router.go()
          }, 2000)
        )
    },
    removeAdmin (user) {
      if (this.userFromStore._id === user.row._id) { return actionNotification(this.$buefy, 'No puedes quitarte el admin a ti mismo', 'is-danger', 'trash-can') }
      this.$axios.$put(`http://localhost:4000/api/users/${user.row._id}`, {
        roles: ['user']
      })
        .then((res) => {
          actionNotification(this.$buefy, `Quitaste admin a ${user.row.first_name} ${user.row.last_name}`, 'is-danger', 'trash-can')
          console.log(res)
        })
        .catch((err) => {
          console.error(err)
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
