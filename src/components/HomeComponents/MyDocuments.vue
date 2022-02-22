<template>
  <Panel header="Мой документы" :toggleable="true">
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
  name: "MyDocuments",
  data(){
    return{
      selectedItem: null,
      items: [
        { name: "Все" },
        { name: "Новые" },
        { name: "Последний" }
      ],
    }
  }
}
</script>

<style scoped>

</style>