<template>
  <div v-if="comment !== null" class="card">
    <div class="card-content">
      <div class="content">
        <div class="columns is-multiline">
          <div class="column is-full is-flex is-flex-direction-row is-justify-content-space-between">
            <div>
              <span class="has-text-weight-semibold is-mono">{{ `${comment.user.first_name} ${comment.user.last_name}` }} - {{ comment.user.organization }}</span>
              <p class="is-size-7">
                {{ comment.createdAt | timeAgo($i18n.locale) }} {{ comment.updatedAt > comment.createdAt ? ' - Editado' : '' }}
              </p>
            </div>
            <div v-if="userFromStore && userFromStore._id === comment.user._id || userFromStore && checkIsAdmin()">
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
                <button v-if="!userFromStore" class="button is-small is-rounded is-outlined is-black is-mono" @click="sendNotConnectedAlert">
                  Responder
                </button>
                <button v-else-if="!replyBox" ref="replyBtnToggler" class="button is-small is-rounded is-outlined is-black is-mono">
                  Responder
                </button>
                <div v-else>
                  <div ref="replyBoxWrapper" class="field">
                    <div class="control">
                      <textarea
                        v-model="replyBoxText"
                        class="textarea is-small is-primary my-3"
                        placeholder="Escribe una respuesta..."
                        maxlength="140"
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
                    {{ reply.updatedAt | timeAgo($i18n.locale) }}
                  </span>
                </div>
                <div v-if="userFromStore && userFromStore._id === reply.user._id || userFromStore && checkIsAdmin()">
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
import { formatDistanceToNow, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import { actionNotification, notConnectedAlert } from '../../components/matchmaking/notifications.js'

export default {
  name: 'ResponseCard',
  filters: {
    timeAgo (date, locale) {
      if (typeof date === 'string') { date = parseISO(date) }
      const options = { addSuffix: true }
      if (locale === 'es') { options.locale = es }
      console.log(options)
      const distance = formatDistanceToNow(date, { ...options })
      console.log(distance)
      return distance
    }
  },
  props: {
    commentprop: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    animated: true,
    replyBox: false,
    replyBoxText: '',
    comment: null
  }),
  computed: {
    userFromStore () {
      if (this.$store.state.user) { return this.$store.state.user }
      return null
    }
  },
  mounted () {
    this.comment = { ...this.commentprop }
    window.addEventListener('click', this.onClickOutside)
  },
  beforeUnmount () {
    window.removeEventListener('click', this.onClickOutside)
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
    addLike () {
      if (!this.userFromStore) { return this.sendNotConnectedAlert() }
      this.$axios.$post(`http://localhost:4000/api/callto/${this.$route.params.id}/comment/${this.comment._id}/like`)
        .then((res) => {
          this.$axios.$get(`http://localhost:4000/api/callto/${this.$route.params.id}/comment/${this.comment._id}/like`)
            .then((res) => {
              this.comment.likes = [...res.likes]
            })
            .catch((err) => {
              actionNotification(this.$buefy, 'Ocurrio un error al conectarse con la base de datos', 'is-danger', 'exclamation-triangle')
              console.error(err)
            })
        })
        .catch((err) => {
          actionNotification(this.$buefy, 'Ocurrio un error guardando tu like', 'is-danger', 'exclamation-triangle')
          console.error(err)
        })

      // this.$axios.$post(`http://localhost:4000/api/callto/${this.$route.params.id}/comment/${this.comment._id}/like`)
      //   .then((resPost) => {
      //     return this.$axios.$get(`http://localhost:4000/api/callto/${this.$route.params.id}/comment/${this.comment._id}/like`)
      //   })
      //   .then((resGet) => {
      //     this.comment.likes = [...resGet.likes]
      //   })
      //   .catch((err) => {
      //     console.error(err)
      //     actionNotification(this.$buefy, 'Ocurrio un error guardando tu like', 'is-danger', 'exclamation-triangle')
      //   })
    },
    deleteComment () {
      this.$axios.$delete(`http://localhost:4000/api/callto/${this.$route.params.id}/comment/${this.comment._id}`)
        .then((res) => {
          actionNotification(this.$buefy, 'Comentario eliminado', 'is-danger', 'trash-can')
        })
        .catch((err) => {
          console.error(err)
        })
        .finally(() => {
          setTimeout(() => {
            this.$router.go()
          }, 1000)
        })
    },
    deleteReply (replyId) {
      this.$axios.$delete(`http://localhost:4000/api/callto/${this.$route.params.id}/comment/${this.comment._id}/reply/${replyId}`)
        .then(async (res) => {
          this.comment = await this.getComment()
          actionNotification(this.$buefy, 'Respuesta eliminada', 'is-danger', 'trash-can')
        })
        .catch((err) => {
          console.error(err)
        })
    },
    sendNotConnectedAlert () {
      notConnectedAlert(this.$buefy)
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
            this.comment = await this.getComment()
            actionNotification(this.$buefy, 'Comentario editado', 'is-success', 'pen-to-square')
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
            this.comment = await this.getComment()
            actionNotification(this.$buefy, 'Respuesta editada', 'is-success', 'pen-to-square')
          }).catch((err) => {
            console.log(err)
          })
        }
      })
    },
    toggleReplyBox () {
      this.replyBox = !this.replyBox
      this.replyBox && this.$nextTick(() => { this.$refs.replyBoxWrapper.focus() })
    },
    onClickOutside (event) {
      const replyBoxWrapper = this.$refs.replyBoxWrapper
      if ((replyBoxWrapper && !replyBoxWrapper.contains(event.target)) ||
        event.target === this.$refs.replyBtnToggler) {
        this.toggleReplyBox()
      }
    },
    sendReply () {
      if (this.replyBoxText === '') {
        actionNotification(this.$buefy, 'Tu respuesta está vacía', 'is-warning', 'circle-exclamation')
        return null
      }
      this.$axios.$post(`http://localhost:4000/api/callto/${this.$route.params.id}/comment/${this.comment._id}/reply`, {
        content: this.replyBoxText
      }).then((res) => {
        console.log(res)
        this.replyBoxText = ''
        // this.toggleReplyBox()
      }).then(async (res) => {
        this.comment = await this.getComment()
        actionNotification(this.$buefy, 'Respuesta enviada', 'is-success', 'check')
      }).catch((err) => {
        console.log(err)
      })
    },
    async getComment () {
      try {
        const response = await this.$axios.$get(`http://localhost:4000/api/callto/${this.$route.params.id}/comment/${this.comment._id}`)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    debug (v) {
      console.log(v)
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
