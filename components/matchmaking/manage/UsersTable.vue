<template>
  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th>Email</th>
        <th>Full name</th>
        <th>Organization</th>
        <th>Country</th>
        <th>Created at</th>
        <th>Options</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user._id">
        <td>{{ user.email }}</td>
        <td>{{ user.first_name }} {{ user.last_name }}</td>
        <td>{{ user.organization.name }}</td>
        <td>{{ user.country }}</td>
        <td>{{ user.createdAt | createdAt() }}</td>
        <td>
          <b-button v-if="checkAdmin(user) === false" type="is-success is-rounded" size="is-small" @click="makeAdmin(user)">
            Make admin
          </b-button>
          <b-button v-else type="is-danger is-rounded" size="is-small" @click="removeAdmin(user)">
            Remove admin
          </b-button>
        </td>
      </tr>
    </tbody>
  </table>
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
      users: []
    }
  },
  async fetch () {
    try {
      const { data } = await this.$axios.get('http://localhost:4000/api/users')
      this.users = data
      // console.log(this.users)
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
      const isAdmin = user.roles.find(role => role.name === 'admin')
      if (isAdmin) {
        return true
      } else {
        return false
      }
    },
    makeAdmin (user) {
      this.$axios.$put(`http://localhost:4000/api/users/${user._id}`, {
        roles: ['admin']
      })
        .then((res) => {
          actionNotification(this.$buefy, `Hiciste admin a ${user.first_name} ${user.last_name}`, 'is-success', 'check')
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
      if (this.userFromStore._id === user._id) { return actionNotification(this.$buefy, 'No puedes quitarte el admin a ti mismo', 'is-danger', 'trash-can') }
      this.$axios.$put(`http://localhost:4000/api/users/${user._id}`, {
        roles: ['user']
      })
        .then((res) => {
          actionNotification(this.$buefy, `Quitaste admin a ${user.first_name} ${user.last_name}`, 'is-danger', 'trash-can')
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

<style>

</style>
