<template>
  <div v-if="!userFromStore" class="card notConnected" @click="sendNotConnectedAlert">
    <div class="card-content">
      <div class="content">
        Escribe un comentario...
      </div>
    </div>
  </div>
  <div v-else class="card">
    <div class="card-content">
      <div class="content">
        <div class="columns is-multiline">
          <div class="column is-full">
            <span class="has-text-weight-semibold is-mono">{{ userFromStore.first_name }} {{ userFromStore.last_name }} - {{ userFromStore.organization }}</span>
          </div>
          <div class="column is-full">
            <b-field type="is-primary">
              <b-input v-model="comment" type="textarea" placeholder="Escribe un comentario ..." maxlength="200" />
            </b-field>
          </div>
          <div class="column is-full has-text-right">
            <button class="button is-small is-rounded is-outlined is-roboto is-black is-mono" @click="sendComment" @mouseleave="$event.target.blur()">
              Publicar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { actionNotification, notConnectedAlert } from './notifications.js'
export default {
  name: 'CommentCard',
  data: () => {
    return {
      isActive: false,
      comment: ''
    }
  },
  computed: {
    userFromStore () {
      const user = this.$store.state.user
      return user
    }
  },
  methods: {
    sendComment () {
      if (this.comment === '') {
        actionNotification(this.$buefy, 3000, 'Tu comentario está vacío', 'is-warning', 'circle-exclamation')
        return null
      }
      this.$axios.$post(`http://localhost:4000/api/callto/${this.$route.params.id}/comment`, {
        content: this.comment
      }).then(
        this.comment = '',
        actionNotification(this.$buefy, 3000, 'Comentario enviado', 'is-success', 'check')
      ).catch((err) => {
        console.error(err)
      })
        .finally(() => {
          setTimeout(() => {
            this.$router.go()
          }, 1000)
        })
    },
    sendNotConnectedAlert () {
      notConnectedAlert(this.$buefy)
    }
  }
}
</script>

<style scoped>
.card {
  border: 1px solid #000;
}

article {
  border: 1px solid #000;
  position: absolute;
  z-index: 40;
  width: 120%;
  margin-bottom: 15px;
}

.notConnected {
  cursor: pointer;
}
</style>
