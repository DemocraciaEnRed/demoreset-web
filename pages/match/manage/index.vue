<template>
  <section class="section container">
    <h1 class="is-size-4 has-text-centered">
      Admin panel
    </h1>
    <section class="mt-6">
      <b-tabs v-model="activeTab" type="is-boxed" expanded>
        <b-tab-item label="Users">
          <UsersTable />
        </b-tab-item>
        <b-tab-item label="llamados">
          <CallToTable :ct="callTo" />
        </b-tab-item>
      </b-tabs>
    </section>
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
      users: []
    }
  },
  async fetch () {
    try {
      const { data } = await this.$axios.get('http://localhost:4000/api/callto')
      this.callTo = data
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style>

</style>
