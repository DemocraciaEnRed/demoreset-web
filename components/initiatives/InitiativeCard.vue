<template>
  <div class="card organization-card my-2">
    <div class="card-content">
      <div class="columns is-vcentered">
        <div v-if="initiative.organization.logo" class="column is-narrow">
          <nuxt-link :to="{ path: localePath('/initiatives/' + initiative.id) }">
            <img :src="`${apiUrl}/assets/${initiative.organization.logo.id}?width=120&height=120&fit=cover`" alt="Logo" class="organization-logo">
          </nuxt-link>
        </div>
        <div class="column">
          <div class="has-text-left ml-4">
            <p class="is-mono organization-name m">
              {{ initiative.organization.name }} <a v-if="initiative.organization.email" :href="`mailto:${initiative.organization.email}`"><i class="fas fa-envelope has-text-primary fa-lg" /></a>
            </p>
            <nuxt-link :to="{ path: localePath('/initiatives/' + initiative.id) }" class="has-text-black">
              <h4 class="is-mono is-uppercase initiative-title">
                {{ initiative.title }}
              </h4>
            </nuxt-link>
          </div>
        </div>
        <div class="column is-3 initiative-date has-text-right-desktop has-text-centered-touch">
          <div>
            <p>Año de inicio:</p>
            <span>{{ initiative.start_date }}</span>
          </div>
          <div>
            <p>Estado</p>
            <div>{{ initiative.initiative_status == 'ongoing' ? $t('initiatives.ongoing') : $t('initiatives.finished') }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InitiativeCard',
  props: {
    initiative: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
    }
  },
  computed: {
    apiUrl () {
      return process.env.API_URL
    }
  }
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

.organization-logo{
  width: 120px;
  height: auto;
  // border: 1px solid #cacaca;
  // border-radius: 50%;
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
