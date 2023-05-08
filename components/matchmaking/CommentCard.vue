<template>
  <div>
    <div class="column is-full">
      <div class="card">
        <div class="card-content">
          <div class="content" @click="isActive = !isActive">
            <b-message
              v-model="isActive"
              title="No estás conectado"
              aria-close-label="close"
            >
              Para poder enviar un llamado debes tener una cuenta. Si aún no la tiene puede generarla haciendo <nuxt-link :to="{path: localePath('/register')}" class="has-text-primary">
                click aquí.
              </nuxt-link>
              <br>
              Si ya tienes una cuenta, <nuxt-link :to="{path: localePath('/login')}" class="has-text-primary">
                inicia sesión.
              </nuxt-link>
            </b-message>
            Deje su comentario, respuesta...
          </div>
        </div>
      </div>
    </div>
    <!-- <b-button
      label="toggle"
      @click="isActive = !isActive"
    /> -->
    <!-- if user logged in click -->
    <div class="column is-full">
      <div class="card">
        <div class="card-content">
          <div class="content">
            <div class="columns is-multiline">
              <div class="column is-full">
                <span class="has-text-weight-semibold is-mono">Catalina Fernandez - FIMA</span>
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
  width: 95%;
  margin-bottom: 15px;
}
</style>
