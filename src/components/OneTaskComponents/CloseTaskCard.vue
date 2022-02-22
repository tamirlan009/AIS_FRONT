<template>
  <div v-if="userCanCreate && data.state === 'на выполнении'" class="mt-5">
    <ConfirmPopup/>
    <Button icon="pi pi-check" label="Закрыть" v-on:click="del($event)"/>
  </div>
  <Toast position="top-right" />
</template>

<script>
import {mapState, mapGetters} from "vuex";
import {put} from "@/api/apiRoutes";

export default {
  name: "CloseTaskCard",
  data(){
    return{
      dialog: false,
    }
  },
  computed:{
    ...mapState({
      data: state => state.taskCard.data
    }),
    ...mapGetters({
      userCanCreate: 'authenticate/userCanCreate'
    }),
  },
  methods:{
    del(event){
      this.$confirm.require({
        target: event.currentTarget,
        message: 'Закрыть поручение?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.updateTask()
        },
        reject: () => {
        }
      });
    },

    updateTask(){
      const data = {
        is_done: 'True'
      }

      put.updateTask(this.data.id, data).then(()=>{
        this.data.is_done = true;
        this.data.state = "выполнено";
        this.dialog =! this.dialog;
        this.$toast.add({severity:'success', summary: 'Успех!', detail:'Задача выполнено', life: 10000});
      }).catch(()=>{
        this.$toast.add({severity:'error', summary: 'Ошибка!', detail:'Произошла ошибка при отправке запроса', life: 10000});
      })
    }
  },
}
</script>

<style scoped>

</style>