<template>
  <div>
    <div class="col">
      <HeadAboutTask/>
    </div>

    <Panel header="Описание:" :toggleable="true"  class="mb-2">
      {{data.description}}
    </Panel>

    <Panel header="Адрес:" :toggleable="true" class="mb-2">
      {{data.address}}
      <div class="mt-5">
        <span>Широта: <strong>{{markerLatLng.lat}}</strong></span>
        <span class="block mt-2">Долгота: <strong>{{markerLatLng.lng}}</strong></span>
      </div>
    </Panel>

    <div class="grid mb-2">
      <Panel header="Автор:" :toggleable="true" class="col">
        <strong>{{data.creator.first_name}} {{data.creator.last_name}}</strong>
        <hr>
        <div>тел. <strong>{{data.creator.number_phone}}</strong></div>
        <div class="mt-3">почта: <strong>{{data.creator.email}}</strong></div>
      </Panel>
      <Panel header="Исполнитель:" :toggleable="true" class="col">
        <strong>{{data.executor.first_name}} {{data.executor.last_name}}</strong>
        <hr>
        <div>тел. <strong>{{data.executor.number_phone}}</strong></div>
        <div class="mt-3">почта: <strong>{{data.executor.email}}</strong></div>
      </Panel>
    </div>
    <ReportAboutTask/>
  </div>



</template>

<script>
import HeadAboutTask from "@/components/OneTaskComponents/AboutTask/HeadAboutTask";
import ReportAboutTask from "@/components/OneTaskComponents/AboutTask/ReportAboutTask";

import {mapState} from "vuex";

export default {
  name: "AboutTask",
  components: {
    HeadAboutTask,
    ReportAboutTask,
  },
  computed:{
    ...mapState({
      data: state => state.taskCard.data,
      markerLatLng: state => state.taskCard.markerLatLng,
    })
  }
}
</script>

<style scoped>

</style>