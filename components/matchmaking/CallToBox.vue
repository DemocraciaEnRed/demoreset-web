<template>
  <div class="box">
    <div class="media is-align-items-center">
      <div class="media-left">
        <figure class="image is-48x48">
          <img class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" alt="Image">
        </figure>
      </div>
      <div class="media-content">
        <div class="content is-size-4">
          <span class="is-mono">NOMBRE DE LA ORG</span>
          <span class="icon is-small has-text-primary ml-1 ctm-opacity-60">
            <i class="fas fa-envelope" aria-hidden="true" />
          </span>
        </div>
      </div>
    </div>
    <div class="content my-5">
      <p class="is-mono is-size-4">
        Necesito una asociación para un proyecto en curso sobre cuestiones ambientales.
      </p>
    </div>
    <div class="content mb-3">
      <span class="mr-3 is-size-6">Tags:</span> <span class="tag is-rounded is-size-7">Rounded</span> <span class="tag is-rounded is-size-7">Rounded</span>
    </div>
    <div class="content">
      <span class="mr-3 is-size-6">Tipo:</span> <span class="tag is-rounded is-size-7 has-background-yellow">Rounded</span> <span class="tag is-rounded is-size-7">Rounded</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CallToBox'
}
</script>
<style lang="scss" scoped>
.ctm-opacity-60{
  opacity: 60%;
}
.tag{
  border: 1px solid rgba(0, 0, 0, 0.12);
}
</style>
