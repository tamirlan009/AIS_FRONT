<template>
  <Panel header="Документы на исполнении" :toggleable="true">
    <Listbox
        class="border-none"
        v-model="selectedItem"
        :options="items"
        optionLabel="name"
    >
      <template #option="slotProps">
        <div class="grid">
          <span class="col-6 m-0 p-0">{{slotProps.option.name}}</span>
          <div v-if="slotProps.option.name==='Все'" class="col-6 m-0 p-0 flex justify-content-end">
            <span class="bg-primary border-round pl-1 pr-1 text-white">{{this.value.count_all_tasks}}</span>
          </div>
          <div v-if="slotProps.option.name==='Новые'" class="col-6 m-0 p-0 flex justify-content-end">
            <span class="bg-green-600 border-round pl-1 pr-1 text-white">{{this.value.count_new_tasks}}</span>
          </div>
          <div v-if="slotProps.option.name==='Срок истекает'" class="col-6 m-0 p-0 flex justify-content-end">
            <span class="bg-yellow-600 border-round text-white pl-1 pr-1">{{this.value.count_expiring_tasks}}</span>
          </div>
        </div>
      </template>
    </Listbox>
  </Panel>
</template>

<script>
import {get} from "@/api/apiRoutes";

export default {
  name: "ExecutionCard",
  data(){
    return{
      selectedItem: null,
      value: [],
      items: [
        { name: "Все", context: 'all_tasks'},
        { name: "Новые", context: 'new_tasks' },
        { name: "Срок истекает", context: 'expiring_tasks' },
      ],
    }
  },
  methods:{
    getCountTask(){
      get.getCountTask().then((res)=>{
        this.value = res.data
      })
    }
  },
  watch:{
    selectedItem: function (){
      this.$router.push('/tasks/'+ this.selectedItem.context)
    },
  },
  mounted() {
    this.getCountTask()
  }
}
</script>

<style scoped>

</style>