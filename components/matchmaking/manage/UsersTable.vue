<template>
  <section>
    <b-table
      :data="users"
    >
      <b-table-column v-slot="props" field="email" label="Email" searchable>
        {{ props.row.email }}
      </b-table-column>
      <b-table-column v-slot="props" field="full_name" :label="$t('adminpanel.userName')" searchable>
        {{ props.row.first_name }} {{ props.row.last_name }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        field="organization"
        :label="$t('adminpanel.userOrganization')"
      >
        {{ props.row.organization.name !== null ? props.row.organization.name : $t('adminpanel.userNoOrganization') }}
      </b-table-column>
      <b-table-column v-slot="props" field="created_at" :label="$t('adminpanel.userCreatedAt')">
        {{ props.row.createdAt | createdAt() }}
      </b-table-column>
      <b-table-column v-slot="props" field="status" :label="$t('adminpanel.userStatus')">
        <span v-if="props.row.active === true" class="tag is-link">
          {{ $t('adminpanel.userActive') }}
        </span>
        <span v-else class="tag is-warning">
          {{ $t('adminpanel.userInactive') }}
        </span>
      </b-table-column>
      <b-table-column v-slot="props" :label="$t('adminpanel.actions')">
        <b-button v-if="checkAdmin(props) === false" type="is-success is-rounded" size="is-small" @click="makeAdmin(props)">
          {{ $t('adminpanel.makeAdmin') }}
        </b-button>
        <b-button v-else type="is-danger is-rounded" size="is-small" @click="removeAdmin(props)">
          {{ $t('adminpanel.removeAdmin') }}
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
  inject: ['$t'],
  data () {
    return {
      users: []
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
          actionNotification(this.$buefy, 3000, `${this.$t('adminpanel.alertMakeAdmin')} ${user.row.first_name} ${user.row.last_name}`, 'is-success', 'check')
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
      if (this.userFromStore._id === user.row._id) { return actionNotification(this.$buefy, 3000, `${this.$t('matchmaking.removeAdminToYou')}`, 'is-danger', 'times-circle') }
      this.$axios.$put(`http://localhost:4000/api/users/${user.row._id}`, {
        roles: ['user']
      })
        .then((res) => {
          actionNotification(this.$buefy, 3000, `${this.$t('adminpanel.alertRemoveAdmin')} ${user.row.first_name} ${user.row.last_name}`, 'is-danger', 'trash-can')
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
