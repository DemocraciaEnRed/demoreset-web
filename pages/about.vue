<template>
  <div>
    <section class="section">
      <h1
        class="column is-poppins is-uppercase has-text-weight-bold is-5 mb-5 has-border-top is-size-2"
      >
        Sobre el proyecto de demoreset
      </h1>
      <div class="columns">
        <img
          class="column is-5 about-img"
          src="~/assets/img/About.png"
          alt=""
        >
        <div class="content column">
          <p>
            En colaboración con la oficina global de la National Endowment for
            Democracy NED y el Extituto de Política Abierta (Colombia),
            reunimos 100 organizaciones del Sur Global, situadas especialmente
            en el África Subsahariana, Europa del Este, el Sudeste Asiático y
            América Latina para restablecer nuestras democracias.
          </p>
          <p>
            En este proyecto, se incorporarán las iniciativas para participar
            en una experiencia que
            <strong>transformará el panorama de la democracia en el Sur
              Global</strong>. Desde este espacio, podrás encontrar herramientas y soluciones
            de todo el mundo para hacer frente a los desafíos que
            organizaciones como la tuya enfrentan en el proceso de despliegue
            de la innovación democrática. Tendrás una red de organizaciones en
            4 regiones del Sur Global, que compartirán sus mejores prácticas y
            con las que podrás construir alianzas, espacios para desarrollar y
            afinar tus propuestas de cambio en una Cumbre del Sur Global.
            Podrás implementar una herramienta/solución en tu región
            específica con apoyo especializado, mentoría internacional, entre
            otras sorpresas.
          </p>
          <strong>
            Es hora de transformar la democracia desde propuestas y narrativas
            del Sur Global.
          </strong>
        </div>
      </div>
    </section>
    <StagesSlider />
  </div>
</template>

<script>
import StagesSlider from '~/components/about/StagesSlider.vue'
export default {
  name: 'AboutPage',
  components: {
    StagesSlider
  }
}
</script>
<style lang="scss" scoped>
.about-img{
  object-fit: contain;
  border-radius: 3px;
}
h1.has-border-top{
  border-top: 1px solid black;
}
</style>
