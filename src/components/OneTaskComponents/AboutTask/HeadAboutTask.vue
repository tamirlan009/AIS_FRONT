<template>
  <div>
    <span class="block mb-4">Дата создания:
      <strong class="">{{data.createDate}}
      </strong>
    </span>

    <Tag v-if="data.state === 'на выполнении'" severity="info" :value="data.state"/>
    <Tag v-if="data.state === 'просрочено'" severity="danger" :value="data.state"/>
    <Tag v-if="data.state === 'выполнено'" severity="success" :value="data.state"/>

    <Tag class="ml-1" severity="warning" :value="data.category.name"/>
    <hr>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "HeadAboutTask",
  computed:{
    ...mapState({
      data: state => state.taskCard.data
    })
  }
}
</script>

<style scoped>

</style>