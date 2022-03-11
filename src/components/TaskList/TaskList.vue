<template>

  <DataTable :value="results">
    <Column :sortable="true" field="createDate"  header="Дата"/>
    <Column header="Категория">-->
      <template #body="slotProps">
        <span>{{slotProps.data.category.name}}</span>

      </template>
    </Column>
    <Column header="Описание" field="description"></Column>
    <Column header="Состояние">
        <template #body="slotProps">
          <Tag class="text-center" v-if="slotProps.data.state === 'на выполнении'" severity="info" :value="slotProps.data.state"/>
          <Tag class="text-center" v-if="slotProps.data.state === 'просрочено'" severity="danger" :value="slotProps.data.state"/>
          <Tag class="text-center" v-if="slotProps.data.state === 'выполнено'" severity="success" :value="slotProps.data.state"/>
        </template>
    </Column>
    <Column header="Исполнитель">
      <template #body="slotProps">
        <span>{{slotProps.data.executor.first_name + ' ' + slotProps.data.executor.last_name}}</span>
      </template>
    </Column>
    <Column header="Создатель">
      <template #body="slotProps">
        <span>{{slotProps.data.creator.first_name + ' ' + slotProps.data.creator.last_name}}</span>
      </template>
    </Column>
    <Column>
      <template #body="slotProps">
        <Button label="открыть" @click="this.$router.push('/task/'+slotProps.data.id)"/>
      </template>
    </Column>
  </DataTable>
  <Paginator class="mt-3" :rows="10" :totalRecords="total" @page="onPage($event)"/>
  <ScrollTop :threshold="100" class="bg-primary" />
</template>

<script>
import {get} from "@/api/apiRoutes";

export default {
  name: "TaskList",
  data(){
    return{
      param: this.$route.params.param,
      results:null,
      total:null,
    }
  },
  methods:{
    getTask(){
      get.getAllTasks(1,  this.param).then((res) =>{
        this.total = Math.ceil(res.data.count/1)
        this.results = res.data.results
      })
    },
    onPage(e){
      get.getAllTasks(e.page+1,  this.param).then((res) =>{
        this.results = res.data.results
      })
    }
  },
  mounted() {
    this.getTask()
  }
}
</script>

<style scoped>

</style>