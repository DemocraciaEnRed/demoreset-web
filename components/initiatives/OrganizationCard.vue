<template>
  <div class="card container organization-card">
    <div class="card-content">
      <div class="content is-flex is-flex-direction-row is-align-items-center">
        <div class="column is-flex is-flex-direction-row">
          <img src="~/assets/img/card-der.png" alt="organization logotype" class="image is-128x128">
          <div class="is-flex-direction-column has-text-left ml-4">
            <p class="is-mono organization-name">
              Democracia En Red <img src="~/assets/img/emailIcon.svg" alt="">
            </p>
            <h4 class="is-mono is-uppercase initiative-title">
              Presupuesto participato general pueyrredon
            </h4>
          </div>
        </div>
        <div class="is-flex is-flex-direction-column initiative-date has-text-right">
          <div>
            <p>Fecha de inicio:</p>
            <span>18/02/2022</span>
          </div>
          <div>
            <p>Fecha de finalización:</p>
            <span>En curso</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrganizationCard'
}
</script>

<style lang="scss" scoped>
.initiative-title {
  font-weight: 500;
  font-size: 20px;
  line-height: 27px;
}

.organization-name {
  font-weight: 400;
  font-size: 16px;
  line-height: 29px;
}

.initiative-date {
  p {
    font-weight: 700;
    font-size: 16px;
    line-height: 29px;
    margin-bottom: 0;
  }

  span {
    font-size: 16px;
    line-height: 29px;
  }
}
</style>
