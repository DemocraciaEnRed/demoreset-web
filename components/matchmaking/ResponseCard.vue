<template>
  <div v-if="comment !== null" class="card">
    <div class="card-content">
      <div class="content">
        <div class="columns is-multiline">
          <div class="column is-full is-flex is-flex-direction-row is-justify-content-space-between">
            <div>
              <span class="has-text-weight-semibold is-mono">{{ `${comment.user.first_name} ${comment.user.last_name}` }} - {{ comment.user.organization }}</span>
              <p class="is-size-7">
                {{ comment.createdAt }} {{ comment.updatedAt > comment.createdAt ? ' - Editado' : '' }}
              </p>
            </div>
            <div v-if="userFromStore && userFromStore._id === comment.user._id || userFromStore && checkIsAdmin">
              <b-dropdown
                aria-role="list"
              >
                <template #trigger>
                  <b-button
                    label=""
                    type="is-white"
                    icon-right="menu-down"
                    position="is-top-left"
                  />
                </template>
                <b-dropdown-item aria-role="listitem" @click="editCommentModal(comment.content)">
                  <i class="fa-sharp fa-solid fa-pencil" /> Editar comentario
                </b-dropdown-item>
                <b-dropdown-item aria-role="listitem" @click="deleteComment">
                  <i class="fa-solid fa-trash-can" /> Borrar comentario
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
          <div class="column is-full">
            <p class="comment-body is-roboto">
              {{ comment.content }}
            </p>
          </div>
          <div class="column is-full">
            <div class="columns">
              <div class="column">
                <button class="button is-small is-rounded is-outlined is-black is-mono" @click="addLike" @mouseleave="$event.target.blur()">
                  Util <i class="fa-solid fa-thumbs-up mx-1" /> {{ comment.likes.length }}
                </button>
                <button v-if="!userFromStore" class="button is-small is-rounded is-outlined is-black is-mono" @click="notConnectedAlert">
                  Responder
                </button>
                <button v-else-if="!replyBox" class="button is-small is-rounded is-outlined is-black is-mono" @click="toggleReplyBox($event)">
                  <div>
                    Responder
                  </div>
                </button>
                <div v-else>
                  <div class="field">
                    <div class="control">
                      <textarea
                        ref="replyBoxWrapper"
                        v-model="replyBoxText"
                        class="textarea is-small is-primary my-3"
                        placeholder="Escribe una respuesta..."
                        maxlength="140"
                        @blur="toggleReplyBox($event)"
                      />
                    </div>
                  </div>
                  <button class="button is-small is-rounded is-outlined is-roboto is-black is-mono" @click="sendReply">
                    Responder
                  </button>
                </div>
              </div>
              <div class="column is-narrow">
                <p><span class="has-text-weight-semibold">{{ comment.replies.length }}</span> respuesta{{ comment.replies.length == 1 ? '': 's' }} <img src="~/assets/img/commentIcon.svg"></p>
              </div>
            </div>
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
            <div class="column my-2 is-full">
              <div class="is-flex is-flex-direction-row is-align-items-center is-justify-content-space-between">
                <div>
                  <span class="has-text-weight-semibold">{{ `${reply.user.first_name} ${reply.user.last_name}` }} - {{ reply.user.organization }}</span>
                  <span class="has-text-grey ml-1 is-size-7 mb-0">
                    {{ reply.updatedAt }}
                  </span>
                </div>
                <div v-if="userFromStore && userFromStore._id === reply.user._id || userFromStore && checkIsAdmin">
                  <b-dropdown
                    aria-role="list"
                  >
                    <template #trigger>
                      <b-button
                        type="is-white"
                        icon-right="menu-down"
                        position="is-top-left"
                      />
                    </template>
                    <b-dropdown-item aria-role="listitem" @click="editReplyModal(reply._id, reply.content)">
                      <i class="fa-sharp fa-solid fa-pencil" /> Editar respuesta
                    </b-dropdown-item>
                    <b-dropdown-item aria-role="listitem" @click="deleteReply(reply._id)">
                      <i class="fa-solid fa-trash-can" /> Borrar respuesta
                    </b-dropdown-item>
                  </b-dropdown>
                </div>
              </div>
              <div class="has-text-weight-medium replyComment-body">
                <p>{{ reply.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <section>
      <b-skeleton width="20%" :animated="animated" />
      <b-skeleton width="40%" :animated="animated" />
      <b-skeleton width="20%" :animated="animated" />
      <b-skeleton width="10%" :animated="animated" />
    </section>
  </div>
</template>

<script>
export default {
  name: 'ResponseCard',
  animated: true,
  props: {
    commentprop: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    replyBox: false,
    replyBoxText: '',
    comment: null
  }),
  computed: {
    userFromStore () {
      if (this.$store.state.user) {
        const user = this.$store.state.user
        return user
      }
      return null
    }
  },
  mounted () {
    this.comment = { ...this.commentprop }
  },
  methods: {
    checkIsAdmin () {
      if (this.userFromStore) {
        const admin = this.userFromStore.roles.includes(role => role === 'admin')
        if (admin) {
          return true
        }
      }
    },
    addLike () {
      if (!this.userFromStore) { return this.notConnectedAlert() }
      this.$axios.$post(`http://localhost:4000/api/callto/${this.$route.params.id}/comment/${this.comment._id}/like`)
        .then((res) => {
          this.$axios.$get(`http://localhost:4000/api/callto/${this.$route.params.id}/comment/${this.comment._id}/like`)
            .then((res) => {
              this.comment.likes = [...res.likes]
            })
        })
        .catch((err) => {
          console.error(err)
        })
    },
    deleteComment () {
      this.$axios.$delete(`http://localhost:4000/api/callto/${this.$route.params.id}/comment/${this.comment._id}`)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.error(err)
        })
        .finally(() => {
          this.$router.go()
        })
    },
    deleteReply (replyId) {
      this.$axios.$delete(`http://localhost:4000/api/callto/${this.$route.params.id}/comment/${this.comment._id}/reply/${replyId}`)
        .then(async (res) => {
          console.log(res)
          this.comment = await this.getComment()
        })
        .catch((err) => {
          console.error(err)
        })
    },
    notConnectedAlert () {
      this.$buefy.dialog.alert({
        title: 'No estás conectado',
        message: 'Para poder responder debes tener una cuenta. Si aún no la tiene, puede generarla haciendo <a href="/register" class="has-text-primary">click aquí</a>. <br> Si ya tienes una cuenta, <a href="/login" class="has-text-primary">inicia sesión</a>. ',
        confirmText: 'Aceptar'
      })
    },
    editCommentModal (content) {
      this.$buefy.dialog.prompt({
        message: 'Editar comentario',
        inputAttrs: {
          type: 'text',
          value: content,
          maxlength: 200
        },
        confirmText: 'Editar',
        cancelText: 'Cancelar',
        trapFocus: true,
        onConfirm: (value) => {
          this.$axios.$put(`http://localhost:4000/api/callto/${this.$route.params.id}/comment/${this.comment._id}`, {
            content: value
          }).then(async (res) => {
            console.log(res)
            this.comment = await this.getComment()
          }).catch((err) => {
            console.log(err)
          })
        }
      })
    },
    editReplyModal (replyId, content) {
      this.$buefy.dialog.prompt({
        message: 'Editar respuesta',
        inputAttrs: {
          type: 'text',
          value: content,
          maxlength: 200
        },
        confirmText: 'Editar',
        cancelText: 'Cancelar',
        trapFocus: true,
        onConfirm: (value) => {
          this.$axios.$put(`http://localhost:4000/api/callto/${this.$route.params.id}/comment/${this.comment._id}/reply/${replyId}`, {
            content: value
          }).then(async (res) => {
            console.log(res)
            this.comment = await this.getComment()
          }).catch((err) => {
            console.log(err)
          })
        }
      })
    },
    debug (v) {
      console.log(v)
    },
    toggleReplyBox (e) {
      this.replyBox = !this.replyBox
      this.replyBox && this.$nextTick(() => { this.$refs.replyBoxWrapper.focus() })
    },
    sendReply () {
      this.$axios.$post(`http://localhost:4000/api/callto/${this.$route.params.id}/comment/${this.comment._id}/reply`, {
        content: this.replyBoxText
      }).then((res) => {
        console.log(res)
        this.replyBoxText = ''
        this.toggleReplyBox()
      }).then(async (res) => {
        this.comment = await this.getComment()
        console.log(this.comment)
      }).catch((err) => {
        console.log(err)
      })
    },
    async getComment () {
      const response = await this.$axios.$get(`http://localhost:4000/api/callto/${this.$route.params.id}/comment/${this.comment._id}`)
      if (response) {
        console.log(response)
        return response
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
  word-wrap: break-word;
}

.replyBox{
  display: block;
  max-height: 40em;
  min-height: 8em;
  border-color: $primary;
  padding: calc(0.75em - 1px);
  resize: vertical;
  box-shadow: inset 0 0.0625em 0.125em rgba(10, 10, 10, 0.05);
  width: 100%;
  background-color: hsl(0deg, 0%, 100%);
  border-radius: 4px;
  color: hsl(0deg, 0%, 21%);
}
</style>
