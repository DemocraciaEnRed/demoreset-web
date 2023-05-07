<template>
  <div class="column is-full">
    <div class="card">
      <div class="card-content">
        <div class="content">
          <div class="columns is-multiline">
            <div class="column is-full">
              <span class="has-text-weight-semibold is-mono">Catalina Fernandez - FIMA</span>
              <p class="is-size-7">
                Hace 1 semana
              </p>
            </div>
            <div class="column is-full">
              <p class="comment-body is-roboto">
                Hola! Te comparto esta documento que tiene una metodología que utilizamos en un presupuesto participativo de una universidad. Por ahi te sirve como base para pensarlo para la escuela
              </p>
            </div>
            <div class="column is-full is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center is-flex-wrap-nowrap">
              <button class="button is-small is-rounded is-outlined is-roboto is-black is-mono">
                Util <img src="~/assets/img/likeIcon.svg" class="ml-2 mr-1"> 10
              </button>
              <p><span class="has-text-weight-semibold">1</span> respuesta <img src="~/assets/img/commentIcon.svg"></p>
            </div>
          </div>
          <!-- only visible if the post has comments -->
          <hr class="has-background-black">
          <p>Comentarios</p>
          <div class="pt-2 mx-4">
            <div class="columns is-multiline">
              <div class="column is-full">
                <span><span class="has-text-weight-semibold">Aluna Serrano</span> - Extituto</span>
                <p class="is-size-7">
                  Hace 1 semana
                </p>
              </div>
              <div class="column is-full has-text-grey replyComment-body">
                <p>Este documento me parece muy útil y claro! Personalmente tomaría las bases de la hoja  2 y 3, que son las estructuras clave. Las definiciones de la pagina 4 seria importante definirlas con la escuela en cuestión, ya que son elementos que responderán a intereses y posibilidades internas.</p>
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
  name: 'ResponseCard'
}
</script>

<style scoped>
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
