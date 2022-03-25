<template>
  <button
      class="p-link layout-topbar-button"
      @click="visibleLeft=true"
  >
    <i class="pi pi-user"></i>
    <span>Профиль</span>
  </button>

  <Sidebar class="p-sidebar-md" v-model:visible="visibleLeft" :showCloseIcon="false" position="right">
    <div class="mr-4 ml-4">
      <div class="grid grid justify-content-center p-2 lg:p-0">
        <div class="col flex justify-content-start" style="font-size: 1.3rem">
          <i @click="$router.push({name: 'Login'})" class="pi  pi-sign-out" style="font-size: 1.5rem"></i>
        </div>
        <div class="col flex justify-content-end">
          <i @click="visibleLeft=false" class="p-sidebar-close-icon pi pi-times" style="font-size: 1.5rem"></i>
        </div>
      </div>
      <hr>
      <div>
        <div>
          <h3>
            {{$store.state.authenticate.userData.user.first_name}} {{$store.state.authenticate.userData.user.last_name}}
          </h3>
        </div>
        <div class="mb-2">
          <span>@{{$store.state.authenticate.userData.user.username}}</span>
        </div>
        <div v-if="$store.state.authenticate.userData.user.is_superuser">
          <small>администратор</small>
        </div>
        <div v-else-if="$store.state.authenticate.userData.user.is_creator">
          <small>МинТранс КБР</small>
        </div>
        <div v-else-if="$store.state.authenticate.userData.user.is_executor">
          <small>Подрядчик</small>
        </div>
      </div>
    </div>
  </Sidebar>

</template>

<script>
export default {
  name: "User",
  data(){
    return{
      visibleLeft: false
    }
  },
}
</script>

<style scoped>

.pi-sign-out{
  cursor: pointer;
}

.p-sidebar-close-icon{
  cursor: pointer;
}



</style>