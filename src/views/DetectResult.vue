<template>

  <div class="surface-0 border-round shadow-3">
    <div class="p-4">
      <div class="grid">
        <div class="col-12 md:col-6">
          <span class="col block mb-1">
           <strong>Контрольный выезд на 22.10.1996 10:30</strong>
          </span>
            <div class="col">
              <small class="mr-3">Количество найденных ям: <strong>83</strong></small>
              <small>Количество сохраненных изображении: <strong>53</strong></small>
            </div>
        </div>
        <div class="col-12 md:col-6 flex align-items-center">
          <div class="col flex md:justify-content-end">
            <Button
                label="Отправить"
                class="mr-3"
                icon="pi pi-send"
                @click="$router.push('/DetectResultList/32')"
            />
            <Button label="Удалить" @click="del($event)" class="p-button-danger p-button-outlined" icon="pi pi-times"/>
            <ConfirmPopup></ConfirmPopup>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetectResult",
  methods:{
    del(event) {
      this.$confirm.require({
        target: event.currentTarget,
        message: 'Вы действительно хотите удалить контрольный выезд?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          //callback to execute when user confirms the action
        },
        reject: () => {
          //callback to execute when user rejects the action
        }
      });
    },
  }
}
</script>

<style scoped>

</style>