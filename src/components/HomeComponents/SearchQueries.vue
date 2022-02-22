<template>
  <Panel header="Поисковые запросы" :toggleable="true">
    <Listbox
        class="border-none"
        v-model="selectedItem"
        :options="items"
        optionLabel="name"
    >
      <template #option="slotProps">
        <div class="grid">
          <span class="col m-0 p-0">{{slotProps.option.name}}</span>
        </div>
      </template>
    </Listbox>
  </Panel>
</template>

<script>
export default {
  name: "SearchQueries",
  data(){
    return{
      selectedItem: null,
      items: [
        { name: "Поручения за последнюю неделью" },
        { name: "Поиск поручении" },
      ],
    }
  }
}
</script>

<style scoped>

</style>