<template>
  <button
      class="p-link layout-topbar-button"
      @click="toggle"
  >
    <i class="pi pi-user"></i>
    <span>Profile</span>
  </button>


  <OverlayPanel ref="op">
    <div class="flex align-items-center">
      <div class="grid">
        <div class="p-2">
          <strong>

            {{$store.state.authenticate.userData.user.first_name}} {{$store.state.authenticate.userData.user.last_name}}
          </strong>

          <div v-if="$store.state.authenticate.userData.user.is_superuser">
            <small>администратор</small>
          </div>
          <div v-else-if="$store.state.authenticate.userData.user.is_company_employee">
            <small>работник дорожной службы</small>
          </div>
          <div v-else-if="$store.state.authenticate.userData.user.is_contractor">
            <small>подрядчик</small>
          </div>
        </div>
        <div class="col flex align-items-center justify-content-end">
          <button
              @click="$router.push({name: 'Login'})"
              class="p-link layout-topbar-button"
          >
            <i class="pi pi-sign-out"></i>
          </button>
        </div>
      </div>
    </div>
  </OverlayPanel>

</template>

<script>
export default {
  name: "User",
  methods:{
    toggle(event) {
      this.$refs.op.toggle(event);
    }
  }
}
</script>

<style scoped>

</style>