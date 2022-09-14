<template>
  <footer class="footer">
    <div class="container">
      <div class="has-text-centered">
        <img src="@/assets/img/footer-logo.png" alt="" width="150" class="image mx-auto my-5">
        <p>DEMO.RESET 2022 © ALL RIGHTS RESERVED</p>
        <br>
        <p class="data-privacy">{{ $t('footer.privacy') }}</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent'
}
</script>

<style lang="scss" scoped>
footer{
  .data-privacy{
    color: yellow;
    text-transform: uppercase;
  }
}
</style>
