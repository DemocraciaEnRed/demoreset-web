<template>
  <div v-if="!loggedIn" class="card notConnected" @click="sendNotConnectedAlert">
    <div class="card-content">
      <div class="content">
        {{ $t('matchmaking.writeComment') }}
      </div>
    </div>
  </div>
  <div v-else class="card">
    <div class="card-content">
      <div class="content">
        <div class="columns is-multiline">
          <div class="column is-full">
            <span v-if="userFromStore.organization.name !== null" class="has-text-weight-semibold is-mono">{{ userFromStore.first_name }} {{ userFromStore.last_name }} - {{ userFromStore.organization.name }}</span>
            <span v-else class="has-text-weight-semibold is-mono">{{ userFromStore.first_name }} {{ userFromStore.last_name }}</span>
          </div>
          <div class="column is-full">
            <b-field type="is-primary">
              <b-input v-model="comment" type="textarea" :placeholder="$t('matchmaking.writeComment')" maxlength="200" />
            </b-field>
          </div>
          <div class="column is-full has-text-right">
            <button class="button is-small is-rounded is-outlined is-roboto is-black is-mono" @click="sendComment" @mouseleave="$event.target.blur()">
              {{ $t('matchmaking.publish') }}
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
      comment: '',
      loggedIn: false
    }
  },
  computed: {
    userFromStore () {
      const user = this.$store.state.user
      return user
    }
  },
  mounted () {
    this.loggedIn = !!this.userFromStore
  },
  methods: {
    sendComment () {
      if (this.comment === '') {
        actionNotification(this.$buefy, 3000, `${this.$t('matchmaking.commentEmpty')}`, 'is-warning', 'circle-exclamation')
        return null
      }
      this.$axios.$post(`${this.$config.expressApi}/callto/${this.$route.params.id}/comment`, {
        content: this.comment
      }).then(
        this.comment = '',
        actionNotification(this.$buefy, 3000, `${this.$t('matchmaking.commentSend')}`, 'is-success', 'check')
      ).catch((err) => {
        actionNotification(this.$buefy, 3000, `${this.$t('matchmaking.commentError')}`, 'is-danger', 'circle-exclamation')
        console.error(err)
      })
        .finally(() => {
          setTimeout(() => {
            this.$router.go()
          }, 1000)
        })
    },
    sendNotConnectedAlert () {
      notConnectedAlert(this.$buefy, this.$t('matchmaking.notConnectedAlertTitle'), this.$t('matchmaking.notConnectedAlertMessage'), this.$t('matchmaking.notConnectedAlertButton'))
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
