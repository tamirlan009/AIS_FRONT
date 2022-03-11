<template>
  <button class="p-link layout-topbar-button" @click="toggle">
    <i class="pi pi-bell"></i>
    <span>Events</span>
  </button>


  <OverlayPanel ref="op">
    <div class="flex align-items-center">
      <span class="p-4">нет уведомлении</span>
    </div>
  </OverlayPanel>



</template>

<script>
export default {
  name: "Notification",
  methods:{
    toggle(event) {
      this.$refs.op.toggle(event);
    }
  }
}
</script>

<style scoped>

</style>