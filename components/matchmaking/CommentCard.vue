<template>
  <div>
    <div v-if="!userFromStore" class="column is-full">
      <div class="card notConnected" @click="notConnectedAlert">
        <div class="card-content">
          <div class="content">
            Deje su comentario, respuesta...
          </div>
        </div>
      </div>
    </div>
    <div v-else class="column is-full">
      <div class="card">
        <div class="card-content">
          <div class="content">
            <div class="columns is-multiline">
              <div class="column is-full">
                <span class="has-text-weight-semibold is-mono">{{ userFromStore.first_name }} {{ userFromStore.last_name }} - {{ userFromStore.organization }}</span>
              </div>
              <div class="column is-full">
                <b-field>
                  <b-input type="textarea" placeholder="Deje su comentario, respuesta..." maxlength="200" />
                </b-field>
              </div>
              <div class="column is-full has-text-right">
                <button class="button is-small is-rounded is-outlined is-roboto is-black is-mono">
                  Publicar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentCard',
  data () {
    return {
      isActive: false
    }
  },
  computed: {
    userFromStore () {
      const user = this.$store.state.user
      console.log(user)
      return user
    }
  },
  methods: {
    notConnectedAlert () {
      this.$buefy.dialog.alert({
        title: 'No estás conectado',
        message: 'Para poder enviar un comentario debes tener una cuenta. Si aún no la tiene, puede generarla haciendo <a href="/register" class="has-text-primary">click aquí</a>. <br> Si ya tienes una cuenta, <a href="/login" class="has-text-primary">inicia sesión</a>. ',
        confirmText: 'Aceptar'
      })
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
