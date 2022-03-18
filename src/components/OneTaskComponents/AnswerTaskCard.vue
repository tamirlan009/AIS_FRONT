<template>
  <Panel header="Ответы:" :toggleable="true">
    <div v-if="data">
      <div v-if="data.answer.length>0">
        <DataTable :value="data.answer" class="p-datatable-sm">
          <Column :sortable="true" field="replyDate"  header="Дата"/>
          <Column field="description"  header="Описание"/>
          <Column header="изображение" headerStyle="width: 20%">
            <template #body="slotProps">
              <div v-if="slotProps.data.answerImages" class="grid">
                <div v-for="(image, index) of slotProps.data.answerImages"
                     class="col-12 md:col-6 lg:col-4"
                     :key="index">
                  <Image :src="image.url" alt="Image Text" :preview="true" imageStyle="cursor: pointer; width: 100%" />
                </div>
              </div>
            </template>
          </Column>
        </DataTable>
        <CloseTaskCard/>
      </div>
      <div v-else>
        <span>Нет ответов</span>
      </div>
    </div>
  </Panel>
</template>

<script>
import CloseTaskCard from "@/components/OneTaskComponents/CloseTaskCard";
import {mapState} from "vuex";

export default {
  name: "AnswerTaskCard",
  components:{
    CloseTaskCard
  },
  computed:{
    ...mapState({
      data: state => state.taskCard.data
    })
  }
}
</script>

<style scoped>

</style>