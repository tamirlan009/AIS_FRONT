<template>

  <div v-if="data.length>0">
    <div v-for="day in data" :key="day.id" class="surface-0 border-round shadow-3 mb-4">
      <div class="p-4">
        <div class="grid">
          <div class="col-12 md:col-6">
          <span class="col block mb-1">
            <strong class="block">{{day.description}}</strong>
           <span>контрольный выезд на {{day.date}}</span>
          </span>
            <div class="col">
              <small class="mr-3">Количество найденных ям: <strong>{{day.count_pothole || 0}}</strong></small>
              <small>Количество сохраненных изображении: <strong>{{day.count_image || 0}}</strong></small>
            </div>
          </div>
          <div class="col-12 md:col-6 flex align-items-center">
            <div class="col flex md:justify-content-end">
              <Button
                  label="Отправить"
                  class="mr-3"
                  icon="pi pi-send"
                  @click="$router.push('/DetectResultList/'+day.id)"
              />
              <Button label="Удалить" @click="del($event)" class="p-button-danger p-button-outlined" icon="pi pi-times"/>
              <ConfirmPopup></ConfirmPopup>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <span>Нет данных для отображения. </span>
  </div>

</template>

<script>
import {mapState} from "vuex";


export default {
  name: "DetectResult",
  methods:{
    del(event) {
      this.$confirm.require({
        target: event.currentTarget,
        message: 'Вы действительно хотите удалить контрольный выезд?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          console.log(this.data)
        },
        reject: () => {
          //callback to execute when user rejects the action
        }
      });
    },
  },
  computed:{
    ...mapState({
      data: state =>state.detectedResult.data,
    })
  },
  mounted() {
    this.$store.dispatch('detectedResult/getDetectResult')
  }
}
</script>

<style scoped>

</style>