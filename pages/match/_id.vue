<template>
  <div class="container-fluid">
    <section class="hero has-background-grey-lighter">
      <div class="hero-body mx-6">
        <div class="pb-6">
          <p class="is-mono has-text-weight-semibold">
            DEMOCRACIA EN RED
          </p>
          <p>
            Buenos Aires, Argentina
          </p>
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
                <div v-for="(location, index) in callTo.location" :key="index">
                  <span class="tag is-rounded has-background-grey-light mx-1">{{ location }}</span>
                </div>
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
          <!-- <button class="ml-2 button is-small is-rounded is-outlined is-roboto is-black is-mono">
            Responder
          </button> -->
        </div>
        <div class="py-4">
          <CommentCard />
        </div>
        <p class="has-text-right">
          Ordenar respuestas por
        </p>
        <div class="columns is-multiline py-5">
          <div v-for="(comment, index) in callTo.comments" :key="index" class="column is-full">
            <ResponseCard :comment="comment" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
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
      console.log(data)
      this.callTo = data
    } catch (error) {
      console.log(error)
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
