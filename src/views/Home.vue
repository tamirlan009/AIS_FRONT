<template>
	<div class="grid">
      <ExecutionCard class="col-12 md:col-6" />
      <MyDocuments class="col-12 md:col-6"/>
	</div>
</template>

<script>
import ExecutionCard from "@/components/HomeComponents/ExecutionCard";
import MyDocuments from "@/components/HomeComponents/MyDocuments";

export default {
  name:"Home",
  components:{
    ExecutionCard,
    MyDocuments,
  }

}
</script>