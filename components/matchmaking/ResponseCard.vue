<template>
  <div class="card">
    <div class="card-content">
      <div class="content">
        <div class="columns is-multiline">
          <div class="column is-full">
            <span class="has-text-weight-semibold is-mono">{{ `${comment.user.first_name} ${comment.user.last_name}` }} - {{ comment.user.organization }}</span>
            <p class="is-size-7">
              {{ comment.createdAt }} {{ comment.updatedAt > comment.createdAt ? ' - Editado' : '' }}
            </p>
          </div>
          <div class="column is-full">
            <p class="comment-body is-roboto">
              {{ comment.content }}
            </p>
          </div>
          <div class="column is-full is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center is-flex-wrap-nowrap">
            <div>
              <button class="button is-small is-rounded is-outlined is-roboto is-black is-mono">
                Util <i class="fa-solid fa-thumbs-up mx-1" /> {{ comment.likes.length }}
              </button>
              <button v-if="!userFromStore" class="button is-small is-rounded is-outlined is-roboto is-black is-mono" @click="notConnectedAlert">
                Responder
              </button>
              <button v-else-if="userFromStore && !replyBox" class="button is-small is-rounded is-outlined is-roboto is-black is-mono" @click="dialogBox($event)">
                <div>
                  Responder
                </div>
              </button>
            </div>
            <p><span class="has-text-weight-semibold">{{ comment.replies.length }}</span> respuesta{{ comment.replies.length == 1 ? '': 's' }} <img src="~/assets/img/commentIcon.svg"></p>
          </div>
        </div>
        <!-- only visible if the post has comments -->
        <div v-if="comment.replies.length > 0">
          <hr class="has-background-black">
          <p>
            Respuestas
          </p>
        </div>
        <div v-for="(reply, index) in comment.replies" :key="index" class="pt-2 mx-4">
          <div class="columns is-multiline">
            <div class="column is-full">
              <span><span class="has-text-weight-semibold">{{ `${reply.user.first_name} ${reply.user.last_name}` }}</span> - {{ reply.user.organization }}</span>
              <p class="is-size-7">
                {{ reply.updatedAt }}
              </p>
            </div>
            <div class="column is-full has-text-grey replyComment-body">
              <p>{{ reply.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResponseCard',
  props: {
    comment: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    replyBox: false
  }),
  computed: {
    userFromStore () {
      const user = this.$store.state.user
      return user
    }
  },
  methods: {
    notConnectedAlert () {
      this.$buefy.dialog.alert({
        title: 'No estás conectado',
        message: 'Para poder responder debes tener una cuenta. Si aún no la tiene, puede generarla haciendo <a href="/register" class="has-text-primary">click aquí</a>. <br> Si ya tienes una cuenta, <a href="/login" class="has-text-primary">inicia sesión</a>. ',
        confirmText: 'Aceptar'
      })
    },
    dialogBox (e) {
      e.srcElement.classList.toggle('is-hidden')
    }
  }
}
</script>

<style scoped>
.card {
  border: 1px solid black;
}
.comment-body {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 27px;
}

.replyComment-body {
  font-weight: 300;
  font-size: 14px;
  line-height: 19px;
}
</style>
