<template>
  <div class="grid">
      <div class="col-12 md:col-4">
        <OrderList
            v-model="picklistValue"
            listStyle="max-height: 50rem"
            dataKey="id"
            v-model:selection="selection"
        >
          <template #item="slotProps">
            <div class="p-caritem">
              <img :src="slotProps.item.url" width="100">
            </div>
          </template>
        </OrderList>
      </div>
    <div class="col-12 md:col-8">
      <VueZoomer
          :zooming-elastic="false"
          class="surface-0"
          style="width: 100%; height: 60vh;">
        <img  v-if="selection.length>0"
            :src=selection[0].url
            style="object-fit: contain; width: 100%; height: 100%;"
        >
      </VueZoomer>
      <div class="surface-0 border-round shadow-3 mt-3">
        <div class="p-4 flex align-items-center">
          <Button
              label="Отправить"
              class="mr-3"
              icon="pi pi-send"
              :badge=String(selection.length)
          />
          <Button label="Удалить" class="mr-3 p-button-danger p-button-outlined" icon="pi pi-times"/>
          <Button
              label="Редактировать"
              class="p-button-info p-button-outlined"
              icon="pi pi-pencil"
              @click="toggle"
          />
        </div>
      </div>
    </div>
  </div>

  <OverlayPanel ref="op" :showCloseIcon="true" :dismissable="true">
    <div class="col-12">
      <strong class="p-0 m-0 pt-3">
        Категория и описание задачи
      </strong>
      <hr>
    </div>

    <Dropdown class="w-12"
              :filter="true" optionLabel="name" placeholder="Выберите категорию*"
    />
    <div class="mt-5">
         <span class="p-float-label">
          <Textarea class="w-12 h-12rem" id="textarea" rows="3" />
          <label for="textarea">Введите описание*</label>
         </span>
    </div>

    <div class="col-12 mt-5">
      <strong class="p-0 m-0 pt-3">
        Срок выполнения
      </strong>
      <hr>
      <Calendar
          dateFormat="dd MM yy" class="w-12"
          :numberOfMonths="3"
      />
    </div>

    <div class="col-12 mt-5">
      <strong class="p-0 m-0 pt-3">
        Назначить исполнителя
      </strong>
      <hr>
      <Dropdown
          class="w-12"
          :filter="true"
          optionLabel="username"
          placeholder="Пусто"/>
    </div>

    <div class="col-12 mt-5">
      <Button label="Сохранить"/>
    </div>



  </OverlayPanel>
</template>

<script>

import VueZoomer from "vue-zoomer/src/vue-zoomer";
/*
import VueZoomerGallery from "vue-zoomer/src/vue-zoomer-gallery"
*/

export default {
  name: "DetectResultList",
  components:{
    VueZoomer,
    // VueZoomerGallery,
  },
  data(){
    return{

      selIndex: 0,
      urlImageList: [
        'https://unpkg.com/vue-zoomer@0.3.9/dist/demo/landscape-1.7df5f544.jpg'
      ],


      picklistValue: [
        {
          id:1,
          url:'https://unpkg.com/vue-zoomer@0.3.9/dist/demo/landscape-1.7df5f544.jpg'
        },
        {
          id:2,
          url:'https://unpkg.com/vue-zoomer@0.3.9/dist/demo/landscape-2.ba8bc5c7.jpg'
        },
        {
          id:3,
          url:'https://unpkg.com/vue-zoomer@0.3.9/dist/demo/landscape-3.f5787143.jpg'
        },
        {
          id:4,
          url:'https://unpkg.com/vue-zoomer@0.3.9/dist/demo/landscape-4.7217d472.jpg'
        },
      ],

      selectedImg:null,
      selection:[],
    }
  },
  methods:{
    toggle(event) {
      this.$refs.op.toggle(event);
    }
  }
}
</script>

<style lang="scss" scoped>

::v-deep(.p-orderlist){
  .p-orderlist-controls{
    display: none;
  }
}



//div.container {
//  width: 96%;
//  max-width: 400px;
//  margin: 0 auto; /* чтобы отцентрировать контейнер */
//}
//.full-img {
//  width: 100%;
//  height: auto;
//}
//
//::v-deep(.p-picklist){
//  .p-picklist-source-controls{
//    display: none;
//  }
//  .p-picklist-target-controls{
//    display: none;
//  }
//}


</style>