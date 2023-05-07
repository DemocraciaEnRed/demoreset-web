<template>
  <div class="container-fluid">
    <section class="hero has-background-grey-lighter">
      <div class="hero-body container">
        <div class="pb-6">
          <p class="is-mono has-text-weight-semibold">
            DEMOCRACIA EN RED
          </p>
          <p>
            Buenos Aires, Argentina
          </p>
        </div>
        <p class="title is-uppercase">
          Necesito una metodología de trabajo para un presupuesto participativo escolar
        </p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi tenetur aliquid, itaque nisi nostrum debitis! Maiores, beatae tempore? Aliquid soluta laborum, officia error quo saepe rerum. Doloribus quasi pariatur cum!</p>
        <div class="py-6">
          <div class="columns">
            <div class="column is-one-third">
              <span class="is-mono has-text-weight-semibold">TEMA</span>
              <hr class="divider">
              <div class="py-4">
                <span class="tag is-rounded has-background-grey-light">Ambiente</span>
                <span class="tag is-rounded has-background-grey-light">Asambles deliberativas</span>
              </div>
            </div>
            <div class="column is-one-third">
              <span class="is-mono has-text-weight-semibold">TIPO DE LLAMADO</span>
              <hr class="divider">
              <div class="py-4">
                <span class="tag is-rounded has-background-grey-light">Express</span>
                <span class="tag is-rounded has-background-grey-light">Material audiovisual</span>
              </div>
            </div>
            <div class="column is-one-third">
              <span class="is-mono has-text-weight-semibold">LOCACION</span>
              <hr class="divider">
              <div class="py-4">
                <span class="tag is-rounded has-background-grey-light">A distancia</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="section container py-6">
        <div>
          El proyecto
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa consectetur, dicta modi nemo eos sit voluptatem. Omnis, architecto consequatur veniam temporibus dolore nemo cupiditate dolores, vero praesentium odit tempore sint.

          El desafio
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident, alias voluptatibus? Fugiat perspiciatis fugit maxime sunt. Saepe cupiditate fugiat pariatur voluptatem excepturi accusantium dolorem omnis dignissimos laborum voluptatum, impedit in.

          Detalles
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque iste velit praesentium eos ex soluta, necessitatibus ducimus cupiditate dolorum. Necessitatibus nam expedita tempora vitae iure enim eius corporis esse cupiditate.
        </div>
        <div class="is-flex is-flex-direction-row is-align-items-center pt-6">
          <p class="is-condensed is-uppercase is-size-5 has-text-weight-semibold">
            Respuestas
          </p>
          <button class="ml-2 button is-small is-rounded is-outlined is-roboto is-black is-mono">
            Responder
          </button>
        </div>
        <div class="columns is-multiline py-5">
          <ResponseCard />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ResponseCard from '../../components/matchmaking/ResponseCard.vue'
export default {
  name: 'MatchMakingId',
  components: {
    ResponseCard
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
