<template>
  <!-- all section pending -->
  <section class="section">
    <div class="container">
      <div class="box">
        <!-- organization card -->
        <h2></h2>
        <!-- info and interests table  -->
        <OrganizationsTab />
      </div>
    </div>
  </section>
</template>

<script>
import OrganizationsTab from '../../components/organizations/organizationsTab.vue'
export default {
  name: 'OrganizationPage',
  components: OrganizationsTab
}
</script>
