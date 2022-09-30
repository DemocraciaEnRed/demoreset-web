<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="buttonIndex card is-flex is-flex-direction-column is-justify-content-center">
    <div class="card-content base-content">
      <p class="is-uppercase is-condensed is-size-4 is-size-5-tablet is-size-5-mobile" v-html="baseText" />
    </div>
    <div class="card-content overlay-content">
      <p class="is-uppercase is-condensed is-size-4 is-size-5-tablet is-size-5-mobile" v-html="overlayText" />
      <div class="special-button is-mono" @click="goTo">
        {{ buttonText }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ButtonIndex',
  props: {
    baseText: {
      type: String,
      default: ''
    },
    overlayText: {
      type: String,
      default: ''
    },
    buttonText: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: null
    },
    externalLink: {
      type: String,
      default: null
    },
    scrollTo: {
      type: String,
      default: null
    }
  },
  methods: {
    goTo () {
      if (this.externalLink) {
        window.open(this.externalLink, '_blank')
      } else if (this.link) {
        this.$router.push(this.link)
      } else if (this.scrollTo) {
        // select by id
        const el = document.getElementById(this.scrollTo)
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  margin: auto;
  border: 3px solid #000;
  height: 100%;
  border-radius: 10px;
  min-height: 240px;
}

// animate .overlay-content to appear on hover
.buttonIndex {
  .card-content {
    background-color: transparent;
  }
  .overlay-content {
    display: none;
  }
  &:hover {
    .card-content{
      background-color: white;
    }
    .base-content {
      display: none;
    }
    .overlay-content {
      display: block;
    }
  }
  .special-button{
    padding: 8px 15px;
    display: inline-block;
    margin-top: 10px;
    border: 3px solid #000;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      background-color: #000;
      color: #fff;
    }
  }
}

</style>
