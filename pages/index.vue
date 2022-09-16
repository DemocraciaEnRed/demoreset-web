<template>
  <div>
    <div class="columns is-vcentered banner">
      <div class="column is-offset-1 is-4">
        <h1 class="is-poppins">Democracia deliberativa en el Sur Global</h1>
        <p class="is-mono my-4">Descripcion de acerca de</p>
        <button class="button is-rounded is-uppercase is-mono is-centered">Conoce más</button>
      </div>
      <div class="column is-5">
        <img src="~/assets/img/InnerBanner.png" alt="personas votando" />
      </div>
      <p class="column is-1 sideText">Consolidar la actual ola de <strong>democracia deliberativa</strong> <svg class="arrow" width="5" height="73" viewBox="0 0 5 73" fill="none">
<path d="M2.30005 72.7201V4.08008" stroke="black" stroke-width="0.5" stroke-miterlimit="10"/>
<path d="M2.30002 4.97L0.500023 6.07L0.460022 6.01L1.63002 3.07C1.86002 2.05 2.08002 1.02 2.31002 0C2.54002 1.02 2.76002 2.05 2.99002 3.07L4.16002 6.01L4.13002 6.07L2.32002 4.97H2.30002Z" fill="black"/>
</svg></p>
    </div>
    <section class="section">
      <div class="container has-text-centered">
        <p>{{ $t('home.hello') }}</p>
        <div class="columns my-5">
          <div v-for="item in buttons" :key="item.id" class="column is-one-quarter mx-1">
            <div class="card is-flex is-flex-direction-column is-justify-content-center">
              <div class="card-content">
                <div class="content is-uppercase" v-html="$t(`home.mainButtons.${item.translationId}`)" />
              </div>
            </div>
          </div>
        </div>
        <div class="has-text-left about-section columns">
          <div class="about-section_container column is-half">
            <h2 class="is-poppins about-title is-uppercase mb-5">
              {{ $t('home.aboutDemoReset') }}
            </h2>
            <p v-html="$t('home.aboutDemoResetText')" />
          </div>
          <div class="about-section_container column is-half">
            <h2 class="is-poppins about-title is-uppercase mb-5">
              {{ $t('home.whyBePart') }}
            </h2>
            <p v-html="$t('home.whyBePartText')" />
          </div>
        </div>
        <div>
          <button class="button is-rounded is-large my-6 is-uppercase is-mono">
            {{ $t('home.aboutButton') }}
          </button>
        </div>
      </div>
    </section>
    <div class="has-background-gray py-6 columns">
      <div class="container has-text-centered is-mono is-uppercase column is-full">
        <img src="~/assets/img/logo-paranewsletter.png" alt="">
        <p class="py-6">
          {{ $t('home.newsletterListTitle') }}
        </p>
        <ul>
          <li v-for="item in newsletter" :key="item.id">
            {{ $t(`home.newsletterList.${item.listItem}`) }}
          </li>
        </ul>
      </div>
    </div>
    <section class="container">
      <div class="has-border-top mb-5" />
      <h3 class="is-mono is-uppercase project-by-title">
        {{ $t('home.proyectBy') }}
      </h3>
      <div class="columns">
        <div class="column is-one-third">
          <img src="~/assets/img/advisers/DR_PAGWEB-47-1.png" alt="">
        </div>
        <div class="column is-one-third">
          <img src="~/assets/img/advisers/DR_PAGWEB-46-nobg.png" alt="">
        </div>
      </div>
    </section>
    <section class="container">
      <div class="has-border-top mb-5" />
      <h3 class="is-mono is-uppercase project-by-title mb-6">
        {{ $t('home.committee') }}
      </h3>
      <div class="columns is-align-items-center">
        <div class="column is-one-fifth">
          <img src="~/assets/img/advisers/demsoc_logo2020-01-371x200-1.png" alt="">
        </div>
        <div class="column is-one-fifth">
          <img src="~/assets/img/advisers/participedia.png" alt="">
        </div>
        <div class="column is-one-fifth">
          <img src="~/assets/img/advisers/der-nobg.png" alt="">
        </div>
        <div class="column is-one-fifth">
          <img src="~/assets/img/advisers/DR_PAGWEB-45-nobg.png" alt="">
        </div>
        <div class="column is-one-fifth">
          <img src="~/assets/img/advisers/ifpf.png" alt="">
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  components: {
  },
  data () {
    return {
      buttons: [
        {
          id: 1,
          translationId: 'wannaBePart'
        },
        {
          id: 2,
          translationId: 'wannaResolve'
        },
        {
          id: 3,
          translationId: 'wannaSearch'
        },
        {
          id: 4,
          translationId: 'wannaKnow'
        }
      ],
      newsletter: [
        {
          id: 1,
          listItem: 'item1'
        },
        {
          id: 2,
          listItem: 'item2'
        },
        {
          id: 3,
          listItem: 'item3'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.banner {
  background: url('~assets/img/degradeBanner.png');
  background-size: 95% 125%;
  background-repeat: no-repeat;
  background-position: -6vw;

  h1 {
    font-size: 45px;
    font-weight: 700;
  }

  img {
    object-fit: contain;
  }

  .sideText {
    vertical-align: middle;
    width: min-content;
    font-size: 12px;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    height: 27%;
    align-self: flex-end;
    .arrow {
      transform: rotate(180deg);
    }
  }

  .button {
    font-size: 15px;
    line-height: 28px;
  }
}

.card {
  border: 3px solid #000;
  height: 100%;
  border-radius: 10px;
  width: 296px;
  height: 237px;
}

.about-section {
  margin-top: 15%;
  gap: 30px;

  .about-title {
    font-style: normal;
    font-weight: 800;
    font-size: 40px;
    line-height: 60px;
    text-align: center;
  }

  &_container::before {
    width: 90%;
    content: '';
    display: block;
    top: 0;
    left: 25%;
    border-top: 1px solid black;
    margin-bottom: 20px;
  }
}

.has-background-gray {
  background: #F1F1F1;
  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 27px;

  // padding-top: 3rem;
  // padding-bottom: 3rem;
  ul li {
    padding-bottom: 20px;
  }
}

.button {
  background: transparent;
  border: 2px solid #000;
  font-style: normal;
  font-weight: 500;
  font-size: 26px;
  line-height: 50px;
  color: #000;
}

.has-border-top {
  border-top: 1px solid #000;
  width: 60%;
}

.project-by-title {
  font-style: normal;
  font-weight: 300;
  font-size: 26px;
  line-height: 50px;
}
</style>
