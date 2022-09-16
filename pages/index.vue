<template>
  <div>
    <section class="section">
      <div class="columns is-vcentered is-centered banner">
        <div class="column is-4">
          <h1 class="is-poppins">Democracia deliberativa en el Sur Global</h1>
          <p class="subtitle">Acerca de</p>
        </div>
        <div class="column is-6">
          <img src="~/assets/img/InnerBanner.png" alt="personas votando"/>
        </div>
      </div>
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
  background-size: cover;
  background-repeat: no-repeat;
  background-position: left;
  h1{
    font-size: 45px;
  }
  img{
    object-fit: contain;
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
</style>
