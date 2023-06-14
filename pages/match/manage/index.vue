<template>
  <section v-if="!loading && mounted" class="section container">
    <h1 class="is-size-4 has-text-centered">
      {{ $t('adminpanel.title') }}
    </h1>
    <section class="mt-6">
      <b-tabs v-model="activeTab" type="is-boxed" expanded>
        <b-tab-item :label="$t('adminpanel.users')">
          <UsersTable />
        </b-tab-item>
        <b-tab-item :label="$t('adminpanel.callTo')">
          <CallToTable :ct="callTo" />
        </b-tab-item>
      </b-tabs>
    </section>
  </section>
  <section v-else class="section container">
    <b-skeleton size="is-large" :active="true" />
    <b-skeleton size="is-large" :active="true" />
    <b-skeleton size="is-large" :active="true" />
    <b-skeleton size="is-large" :active="true" />
    <b-skeleton size="is-large" :active="true" />
    <b-skeleton size="is-large" :active="true" />
    <b-skeleton size="is-large" :active="true" />
    <b-skeleton size="is-large" :active="true" />
    <b-skeleton size="is-large" :active="true" />
    <b-skeleton size="is-large" :active="true" />
    <b-skeleton size="is-large" :active="true" />
    <b-skeleton size="is-large" :active="true" />
  </section>
</template>

<script>
import UsersTable from '../../../components/matchmaking/manage/UsersTable.vue'
import CallToTable from '../../../components/matchmaking/manage/CallToTable.vue'

export default {
  components: {
    UsersTable,
    CallToTable
  },
  data () {
    return {
      activeTab: 0,
      callTo: [],
      users: [],
      loading: true,
      mounted: false
    }
  },
  async fetch () {
    try {
      const { data } = await this.$axios.get(`/demoresetAPI/callto`)
      this.callTo = data
      this.loading = false
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
  mounted () {
    if (this.userFromStore === null) {
      this.$router.push({ path: this.localePath('/') })
    }
    if (!this.userFromStore.roles.find(role => role.name === 'admin')) {
      this.$router.push({ path: this.localePath('/') })
    }
    this.mounted = true
  }
}
</script>

<style>

</style>
