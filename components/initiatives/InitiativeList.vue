<!-- eslint-disable vue/no-v-html -->
<template>
  <section class="my-6">
    <div v-if="$fetchState.pending">
      <b-skeleton height="150px" class="mb-5" />

      <b-skeleton height="150px" class="mb-5" />

      <b-skeleton height="150px" />
    </div>
    <div v-else-if="$fetchState.error">
      <b-notification
        type="is-danger is-light"
        :closable="false"
        role="alert"
      >
        {{ $fetchState.error.message }}
      </b-notification>
    </div>
    <div v-else>
      <div class="box my-2">
        <div class="columns">
          <div class="column">
            <p class="has-text-left-desktop has-text-centered-touch" v-html="$t('initiatives.list.total', {total: totalItems})" />
          </div>
          <div class="column">
            <p class="has-text-right-desktop has-text-centered-touch">
              {{ $t('initiatives.list.page', {page: page, totalPages: totalPages}) }}
            </p>
          </div>
        </div>
      </div>
      <InitiativeCard v-for="initiative in initiatives" :key="`initiative-${initiative.id}`" :initiative="initiative" />
      <section v-if="initiatives.length == 0" class="section py-6">
        <p class="has-text-centered is-mono is-size-5">
          {{ $t('initiatives.list.noResults') }}
        </p>
      </section>
    </div>
    <div v-if="!$fetchState.pending" class="box my-2 is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center ">
      <div>
        <button class="button is-black is-uppercase is-mono" :disabled="page == 1" @click="previousPage">
          <i class="fas fa-arrow-left" />&nbsp;&nbsp;{{ $t('initiatives.list.previousPage') }}
        </button>
      </div>
      <div v-if="totalPages > 1" class="is-hidden-touch">
        <button v-for="p in totalPages" :key="`page-${p}`" class="button is-uppercase is-small is-mono" :class="p === page ? 'is-link' : 'is-white'" @click="changePage(p)">
          {{ p }}
        </button>
      </div>
      <div>
        <button class="button is-black is-uppercase is-mono" :disabled="page === totalPages || initiatives.length === 0" @click="nextPage">
          {{ $t('initiatives.list.nextPage') }}&nbsp;&nbsp;<i class="fas fa-arrow-right" />
        </button>
      </div>
    </div>
    <div v-if="!$fetchState.pending && totalPages > 1" class=" is-hidden-desktop box my-2 is-flex is-flex-direction-row is-justify-content-center is-align-items-center ">
      <div>
        <button v-for="p in totalPages" :key="`page-${p}`" class="button is-uppercase is-small is-mono" :class="p === page ? 'is-link' : 'is-white'" @click="changePage(p)">
          {{ p }}
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import InitiativeCard from './InitiativeCard.vue'

export default {
  name: 'InitiativeList',
  components: {
    InitiativeCard
  },
  props: {
    query: {
      type: Object,
      default: () => ({
        hub: null,
        barrierCategory: null,
        barrierType: null,
        barrier: null
      })
    }
  },
  data () {
    return {
      page: 1,
      totalItems: 0,
      totalPages: 1,
      perPage: 10,
      initiatives: []
    }
  },
  async fetch () {
    const theQuery = {
      query: this.$graphql.getQueryForAllInitiativesList(this.page, this.query, this.$i18n.localeProperties.iso)
    }
    const response = await this.$axios.post('/graphql', theQuery)
    const theInitiatives = response.data.data.initiatives
    this.$graphql.mergeFieldTranslations(theInitiatives)
    this.initiatives = theInitiatives
    this.totalItems = response.data.data.initiatives_aggregated[0].count.id
    this.totalPages = Math.ceil(this.totalItems / this.perPage)
  },
  fetchOnServer: false,
  fetchKey: 'initiative-list',
  watch: {
    query: {
      handler () {
        this.$fetch()
      },
      deep: true
    }
  },
  // props: {
  //   initiatives: {
  //     type: Array,
  //     default: () => []
  //   }
  // }
  methods: {
    nextPage () {
      if (this.page < this.totalPages) {
        this.page++
        this.$fetch()
      }
    },
    changePage (page) {
      this.page = page
      this.$fetch()
    },
    previousPage () {
      if (this.page > 1) {
        this.page--
        this.$fetch()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
