<template>

  <Panel v-if="data" :header="'Поручение № '+data.id" :toggleable="true">
    <div class="grid">
      <TaskGalleria class="col-12 xl:col-6"/>
      <AboutTask class="col-12 xl:col-6 xl:pl-4"/>
    </div>
  </Panel>
  <AnswerTaskCard class="mt-5"/>
</template>

<script>
import {mapState} from "vuex";
import TaskGalleria from "@/components/OneTaskComponents/TaskGalleria";
import AboutTask from "@/components/OneTaskComponents/AboutTask";
import AnswerTaskCard from "@/components/OneTaskComponents/AnswerTaskCard";

export default {
  name: "OneTaskView",
  components:{
    TaskGalleria,
    AboutTask,
    AnswerTaskCard,
  },
  computed:{
    ...mapState({
      data: state =>state.taskCard.data,
    })
  },
  created() {
    this.$store.dispatch('taskCard/getCurrentTask', {id: this.$route.params.id})
  },
}
</script>

<style scoped>

</style>