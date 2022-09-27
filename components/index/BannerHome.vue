<template>
  <div class="columns is-vcentered banner">
    <div class="column is-offset-1 is-4">
      <h1 class="is-poppins">
        {{ $t('home.bannerTitle') }}
      </h1>
      <p class="is-mono my-4">
        {{ $t('home.bannerDescription') }}
      </p>
      <button class="button is-rounded is-uppercase is-mono is-centered">
        {{ $t('home.bannerButton') }}
      </button>
    </div>
    <div class="column is-5">
      <img src="~/assets/img/InnerBanner.png" alt="personas votando">
    </div>
    <div class="column is-1 sideText" v-html="phrase" />
  </div>
</template>

<script>
export default {
  name: 'BannerHome',
  data () {
    const svgArrow = `<svg style="transform: rotate(180deg);" width="5" height="73" viewBox="0 0 5 73" fill="none">
        <path d="M2.30005 72.7201V4.08008" stroke="black" stroke-width="0.5" stroke-miterlimit="10" />
        <path
          d="M2.30002 4.97L0.500023 6.07L0.460022 6.01L1.63002 3.07C1.86002 2.05 2.08002 1.02 2.31002 0C2.54002 1.02 2.76002 2.05 2.99002 3.07L4.16002 6.01L4.13002 6.07L2.32002 4.97H2.30002Z"
          fill="black"
        />`
    return {
      phrase: ` ${this.$t('home.bannerPhrase')} ${svgArrow} `
    }
  }

}
</script>

<style lang="scss" scoped>
.banner {
  background: url("~assets/img/degradeBanner.png");
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
    background: transparent;
    border: 2px solid #000;
    font-style: normal;
    font-weight: 500;
    color: #000;
  }
}
</style>
