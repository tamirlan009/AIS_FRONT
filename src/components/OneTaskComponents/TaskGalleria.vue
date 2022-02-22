<template>
    <div v-if="data.images.length>0">
      <Galleria :value="data.images" v-model:activeIndex="activeIndex" :responsiveOptions="responsiveOptions" :numVisible="7" containerStyle="max-width: 850px"
                :circular="true" :fullScreen="true" :showItemNavigators="true" :showThumbnails="false" v-model:visible="fullDisplay">
        <template #item="slotProps">
          <img :src="slotProps.item.url" :alt="slotProps.item.id" style="width: 100%; display: block;" />
        </template>
        <template #thumbnail="slotProps">
          <img :src="slotProps.item.url" :alt="slotProps.item.id" style="display: block;" />
        </template>
      </Galleria>
      <div class="grid">
        <div v-for="(image, index) of data.images"
             class="col-12"
             :class="imgGrid"
             :key="index">
          <img :src="image.url" :alt="image.alt" style="cursor: pointer; width: 100%" @click="imageClick(index)"/>
        </div>
      </div>
    </div>
    <div v-else>
      <span class="m-1">
        Изображение не найдено
      </span>
    </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "TaskGalleria",

  data(){
    return{
      activeIndex: 0,
      fullDisplay: false,
      responsiveOptions: [
        {
          breakpoint: '1024px',
          numVisible: 4,
        },
        {
          breakpoint: '768px',
          numVisible: 3
        },
        {
          breakpoint: '560px',
          numVisible: 1
        }
      ],
    }
  },
  computed: {
    ...mapState({
      data: state => state.taskCard.data,
      imgGrid: state => state.taskCard.imgGrid,
    })
  },
  methods:{
    imageClick(index) {
      this.activeIndex = index;
      this.fullDisplay = true;
    },
  }
}
</script>

<style scoped>

</style>