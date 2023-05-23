<template>
  <div class="container-fluid">
    <section class="hero has-background-grey-lighter">
      <div class="hero-body mx-6">
        <div class="is-flex us-flex-direction-row is-justify-content-space-between">
          <div class="pb-6">
            <p class="is-mono has-text-weight-semibold">
              DEMOCRACIA EN RED
            </p>
            <p>
              Buenos Aires, Argentina
            </p>
          </div>
          <div v-if="userFromStore && checkIsAdmin()">
            <b-dropdown
              aria-role="list"
              position="is-bottom-left"
            >
              <template #trigger>
                <b-button
                  icon-right="menu-down"
                  position="is-top-left"
                />
              </template>

              <b-dropdown-item aria-role="listitem">
                <nuxt-link :to="{path: localePath(`/match/editcall/${$route.params.id}`)}">
                  <i class="fa-sharp fa-solid fa-pencil" /> Editar llamada
                </nuxt-link>
              </b-dropdown-item>
              <b-dropdown-item aria-role="listitem" @click="deleteCallTo">
                <i class="fa-solid fa-trash-can" /> Borrar llamada
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
        <p class="title is-uppercase">
          {{ callTo.title }}
        </p>
        <p>{{ callTo.about }}</p>
        <div class="py-3">
          <div class="columns">
            <div class="column is-one-third">
              <span class="is-mono has-text-weight-semibold">TEMA</span>
              <hr class="divider mb-2">
              <div class="is-flex is-flex-direction-row is-flex-wrap-wrap">
                <div v-for="(tag, index) in callTo.tags" :key="index">
                  <span class="tag is-rounded has-background-grey-light mx-1">{{ tag }}</span>
                </div>
              </div>
            </div>
            <div class="column is-one-third">
              <span class="is-mono has-text-weight-semibold">TIPO DE LLAMADO</span>
              <hr class="divider mb-2 ">
              <div class="is-flex is-flex-direction-row is-flex-wrap-wrap">
                <div v-for="(type, index) in callTo.types" :key="index">
                  <span class="tag is-rounded has-background-grey-light mx-1">{{ type }}</span>
                </div>
              </div>
            </div>
            <div class="column is-one-third">
              <span class="is-mono has-text-weight-semibold">LOCACION</span>
              <hr class="divider mb-2">
              <div class="is-flex is-flex-direction-row is-flex-wrap-wrap">
                <span class="tag is-rounded has-background-grey-light mx-1">{{ callTo.country }}</span>
                <span class="tag is-rounded has-background-grey-light mx-1">{{ callTo.location }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="section container py-6">
        <div>
          {{ callTo.content }}
        </div>
        <div class="is-flex is-flex-direction-row is-align-items-center pt-6">
          <p class="is-condensed is-uppercase is-size-5 has-text-weight-semibold">
            Respuestas
          </p>
        </div>
        <div class="py-4">
          <CommentCard />
        </div>
        <div class="columns is-multiline py-5">
          <div v-for="(comment, index) in callTo.comments" :key="index" class="column is-full">
            <ResponseCard :commentprop="comment" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { actionNotification } from '../../components/matchmaking/notifications.js'
import ResponseCard from '../../components/matchmaking/ResponseCard.vue'
import CommentCard from '../../components/matchmaking/CommentCard.vue'

export default {
  name: 'MatchMakingId',
  components: {
    ResponseCard,
    CommentCard
  },
  data: () => {
    return {
      callTo: {}
    }
  },
  async fetch () {
    try {
      const { data } = await this.$axios.get(`http://localhost:4000/api/callto/${this.$route.params.id}`)
      this.callTo = data
    } catch (error) {
      console.log(error)
    }
  },
  computed: {
    userFromStore () {
      if (this.$store.state.user) { return this.$store.state.user }
      return null
    }
  },
  methods: {
    checkIsAdmin () {
      if (this.userFromStore) {
        const isAdmin = this.userFromStore.roles.find(role => role.name === 'admin')
        if (isAdmin) {
          return true
        } else {
          return false
        }
      }
    },
    deleteCallTo () {
      this.$axios.delete(`http://localhost:4000/api/callto/${this.$route.params.id}`)
        .then((res) => {
          actionNotification(this.$buefy, 'Call to eliminado', 'is-danger', 'trash-can')
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.$router.push({ path: this.localePath('match') })
        })
    },
    debug (v) {
      console.log(v)
    }
  }
}
</script>

<style lang="scss" scoped>
  .divider {
    border: 1px solid #000;
    padding: 0;
    margin: 0;
  }

  .tag {
    border: 1px solid rgba(0, 0, 0, 0.12);
  }
</style>
