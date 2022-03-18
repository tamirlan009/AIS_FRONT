<template>

  <div v-if="data">
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
                <small class="mr-3">Количество найденных ям: <strong>{{day.count_objects || 0}}</strong></small>
                <small>Количество сохраненных изображении: <strong>{{day.count_image || 0}}</strong></small>
              </div>
            </div>
            <div class="col-12 md:col-6 flex align-items-center">
              <div class="col flex md:justify-content-end">
                <div v-if="userCanCreate">
                  <Button
                      label="Отправить"
                      class="mr-3"
                      icon="pi pi-send"
                      @click="$router.push('/DetectResultList/'+day.id)"
                  />
                  <Button label="Удалить" @click="del($event, day.id)" class="p-button-danger p-button-outlined" icon="pi pi-times"/>
                </div>
                <Button v-else-if="userCanView"
                        label="Смотреть"
                        class="mr-3"
                        icon="pi pi-eye"
                        @click="$router.push('/DetectResultList/'+day.id)"
                />
                <ConfirmPopup></ConfirmPopup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="flex align-items-center flex-column pt-6 px-3">
        <i class="pi pi-file-excel" style="font-size: 5rem; color: var(--pink-600);"></i>
        <h5>Список контрольных выездов пуст!</h5>
        <p style="line-height: 1.5; text-indent: 1rem;">
      
        </p>
      </div>
    </div>
  </div>
  <div v-else>
    <span>Подождите, идет загрузка данных...</span>
  </div>
  <Toast position="top-right" />

</template>

<script>
import {mapGetters, mapState} from "vuex";
import {del} from "@/api/apiRoutes";

export default {
  name: "DetectResult",
  methods:{
    del(event, id) {
      this.$confirm.require({
        target: event.currentTarget,
        message: 'Вы действительно хотите удалить контрольный выезд?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          del.deleteDetection(id).then(()=>{
            this.$toast.add({severity:'success', summary: 'Контрольный выезд успешно удален!', life: 2000});
            this.$store.commit('detectedResult/deleteData', id)
          })
        },
        reject: () => {

        }
      });
    },
  },

  computed:{
    ...mapState({
      data: state =>state.detectedResult.data,
    }),
    ...mapGetters({
      userCanCreate: 'authenticate/userCanCreate',
      userCanView: 'authenticate/userCanView',

    }),
  },
  created() {
    this.$store.dispatch('detectedResult/getDetectResult')
  }
}
</script>

<style scoped>

</style>