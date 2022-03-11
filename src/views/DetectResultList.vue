<template>
  <div v-if="data">
    <div v-if="data.pothols.length>0">
      <div class="grid">
        <div class="col-12 md:col-4">
          <OrderList
              v-model="data.pothols"
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
          <div v-if="userCanCreate" class="surface-0 border-round shadow-3 mt-3">
            <div class="p-4 flex align-items-center">
              <Button
                  @click="send(!v$.$invalid)"
                  label="Отправить"
                  class="mr-3"
                  icon="pi pi-send"
                  :badge=String(selection.length)
              />
              <Button
                  @click="del"
                  label="Удалить"
                  class="mr-3 p-button-danger p-button-outlined"
                  icon="pi pi-times"
              />
              <Button
                  label="Редактировать"
                  class="p-button-info p-button-outlined"
                  icon="pi pi-pencil"
                  @click="toggle"
              />
            </div>
            <div v-if="validError" class="p-4 flex align-items-center">
              <small class="text-pink-500">Обязательные поля не заполнены! Нажмите кнопку редактировать</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="flex align-items-center flex-column pt-6 px-3">
        <i class="pi pi-file-excel" style="font-size: 5rem; color: var(--pink-600);"></i>
        <h5>Список изображении пуст!</h5>
        <p style="line-height: 1.5; text-indent: 1rem;">
        </p>
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

    <Dropdown
        class="w-12"
        :filter="true"
        :options="category"
        v-model="v$.selectedCategory.$model"
        optionLabel="name"
        placeholder="Выберите категорию*"
    />
    <div class="mt-5">
         <span class="p-float-label">
          <Textarea v-model="v$.description.$model" class="w-12 h-12rem" id="textarea" rows="3" />
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
          :numberOfMonths="2"
          v-model="v$.leadTime.$model"
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
          :options="contractors"
          v-model="v$.executor.$model"
          optionLabel="username"
          placeholder="Пусто"/>
    </div>


  </OverlayPanel>

  <Toast position="top-right" />

</template>

<script>

import VueZoomer from "vue-zoomer/src/vue-zoomer";
import {mapGetters, mapState} from "vuex";
import {get, del, post} from "@/api/apiRoutes";
import useVuelidate from "@vuelidate/core";
import {required} from "@vuelidate/validators";


export default {
  name: "DetectResultList",
  setup () {
    return { v$: useVuelidate() }
  },
  components:{
    VueZoomer,
  },
  data(){
    return{

      selIndex: 0,
      urlImageList: [
        'https://unpkg.com/vue-zoomer@0.3.9/dist/demo/landscape-1.7df5f544.jpg'
      ],

      selectedImg:null,
      selection:[],

      category: null,
      contractors: null,

      selectedCategory: null,
      description: null,
      leadTime: null,
      executor: null,

      submitted: false,
      validError: false,

      sendFiles: [],
      sendLatitude: null,
      sendLongitude: null,
    }
  },

  validations() {
    return {
      selectedCategory: {
        required
      },
      leadTime: {
        required,
      },
      description: {
        required
      },
      executor: {
        required
      }
    }
  },


  methods:{

    async convertURLtoFile (url) {

      const response = await fetch(url);
      const data = await response.blob();
      const filename = url.split("/").pop();
      const metadata = { type: data.type };
      return new File([data], filename, metadata);
    },

    selectChange(){
      console.log('hi')
    },

    send(isFormValid){

      this.submitted = true
      if (!isFormValid) {
        this.validError = true
      }
      else{
        this.validError = false
        if(this.selection.length!==0){
          for(const i in this.selection){
            this.data.pothols= this.data.pothols.filter(p => p.id !== this.selection[i].id)
          }
          this.sendLatitude = this.selection[0].latitude
          this.sendLongitude = this.selection[0].longitude
          post.createOneTask(
              this.selectedCategory.id,
              this.description,
              this.sendLatitude,
              this.sendLongitude,
              '',
              this.executor.id,
              this.leadTime.toISOString(),
              this.sendFiles
          ).then(()=>{
            for(const i in this.selection){
              del.deletePothole(this.selection[i].id)
              this.data.pothols= this.data.pothols.filter(p => p.id !== this.selection[i].id)
            }
            this.selection = []
            this.$toast.add({severity:'success', summary: 'Поручение успешно создано!', life: 2000});
          })



        }
      }

    },
    del(){
      if(this.selection.length!==0){
        for(const i in this.selection){

          del.deletePothole(this.selection[i].id).then(()=>{
            this.$toast.add({severity:'success', summary: 'Изображение успешно удален!', life: 2000});
          })
          this.data.pothols= this.data.pothols.filter(p => p.id !== this.selection[i].id)
        }
        this.selection = []
      }
    },
    getRelated(){
      get.getCategory().then((res)=>{
        this.category = res.data
      })
      get.getRelatedUser().then((res)=>{
        this.contractors = res.data
      })
    },
    toggle(event) {
      this.$refs.op.toggle(event);
    }
  },
  watch:{
    selection:function(){
      this.sendFiles = []
      for(const i in this.selection){
        this.convertURLtoFile(this.selection[i].url).then((res)=>{
          this.sendFiles.push(res)
        })
      }
    }
  },
  computed:{
    ...mapState({
      data: state => state.detectedResultList.data
    }),
    ...mapGetters({
      userCanCreate: 'authenticate/userCanCreate',
    }),
  },
  created() {
    this.$store.dispatch('detectedResultList/getDetailedDetected', {id:this.$route.params.id})
    this.getRelated()
  },
}
</script>

<style lang="scss" scoped>

::v-deep(.p-orderlist){
  .p-orderlist-controls{
    display: none;
  }
}

</style>