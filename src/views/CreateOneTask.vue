<template>
  <Panel header="Создание поручения" class="border-round" :toggleable="true">

    <div class="col-12">
        <strong class="p-0 m-0 pt-3">
          Категория и описание задачи
        </strong>
        <hr>
    </div>

    <Dropdown class="w-12"
              v-model="v$.selectedCategory.$model"
              :class="{'p-invalid':v$.selectedCategory.$invalid && submitted}"
              :options="category"
              :filter="true" optionLabel="name" placeholder="Выберите категорию*"
    />
    <div class="mt-5">
         <span class="p-float-label">
          <Textarea class="w-12 h-12rem" id="textarea" v-model="description" rows="3" />
          <label for="textarea">Введите описание*</label>
         </span>
    </div>

    <div class="col-12 mt-5">
        <strong class="p-0 m-0 pt-3">
          Выберите местоположение
        </strong>
        <hr>
    </div>
    <div class="grid">
      <div class="col-12 md:col-4">
          <span class="p-float-label">
            <Textarea v-model="address" class="w-12" style="height: 430px" id="address" rows="3"/>
            <label for="address">Адрес</label>
          </span>
      </div>
      <div class="col-12 md:col-8">
        <LMap style="height: 430px" :zoom="zoom" :center="center" @click="getPosition">
          <LTileLayer :url="url" :attribution="attribution"></LTileLayer>
          <LMarker v-if="markerLatLng" :lat-lng="markerLatLng"></LMarker>
        </LMap>
      </div>
    </div>

    <div class="col-12 mt-5">
        <strong class="p-0 m-0 pt-3">
          Выберите изображение
        </strong>
        <hr>
      <FileUpload
          chooseLabel="Прикрепить изображение"
          cancelLabel="Убрать все"
          :multiple="true" :auto="true"
          :customUpload="true"
          @uploader="onFileChange"
          @clear="clearFile"
          :showUploadButton="false"
          accept="image/*" />
    </div>

    <div class="col-12 mt-5">
        <strong class="p-0 m-0 pt-3">
          Срок выполнения
        </strong>
        <hr>
      <Calendar dateFormat="dd MM yy" class="w-12"
                v-model="v$.leadTime.$model"
                :class="{'p-invalid':v$.leadTime.$invalid && submitted}"
                :numberOfMonths="3"/>
    </div>

    <div class="col-12 mt-5">
        <strong class="p-0 m-0 pt-3">
          Назначить исполнителя
        </strong>
        <hr>
      <Dropdown class="w-12"
                v-model="v$.selectedExecutor.$model"
                :class="{'p-invalid':v$.selectedExecutor.$invalid && submitted}"
                :options="contractors"
                :filter="true" optionLabel="username" placeholder="Пусто"/>
    </div>

    <div class="col-12 mt-5">
      <Button label="Отправить" @click="send(!v$.$invalid)"/>
    </div>
    <div v-if="validError" class="col-12 mt-5">
      <small class="text-pink-500">Обязательные поля не заполнены!</small>
    </div>

  </Panel>

  <Dialog position="top" v-model:visible="dialogDisplay" >
    <div class="flex align-items-center flex-column pt-6 px-3">
      <i class="pi pi-check-circle" style="font-size: 5rem; color: var(--green-500);"></i>
      <h5>Поручение создано успешно!</h5>
      <p style="line-height: 1.5; text-indent: 1rem;">
        Исполнитель получить уведомление в личном кабинете и по почте.
      </p>
    </div>
    <template #footer>
      <div class="flex justify-content-center">
        <Button label="OK" @click="toggleDialog" class="p-button-text" />
      </div>
    </template>
  </Dialog>


  <ScrollTop class="bg-primary" :threshold="100" />
</template>

<script>

import {get} from "@/api/apiRoutes";
import {post} from "@/api/apiRoutes";
import {required} from "@vuelidate/validators"
import useVuelidate from "@vuelidate/core";


export default {
  name: "CreateOneTask",
  setup () {
    return { v$: useVuelidate() }
  },
  data(){
    return{
      selectedCategory: null,
      category: null,
      description: null,
      leadTime: null,
      selectedExecutor: null,
      selectedAuthor: null,
      contractors: null,
      selectedFile:null,
      upload: false,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
          '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 11,
      center: [43.4777807765672, 43.59575092792511],
      markerLatLng: {
        lat:0,
        lng:0
      },
      address: null,

      submitted: false,
      validError: false,
      dialogDisplay: false,
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
      selectedExecutor: {
        required
      }
    }
  },

  methods:{

    getPosition(e){
      this.address=null;
      this.markerLatLng=(e.latlng);
      if (this.markerLatLng){
        get.getMapAddress(this.markerLatLng.lat, this.markerLatLng.lng).then((res)=>{
          this.address = `Страна: ${res.data['address']['country'] ||'неизвестно'}, Округ: ${res.data['address']['region']||'неизвестно'}, Субъект: ${res.data['address']['state'] ||'неизвестно'}, Район: ${res.data['address']['county']||'неизвестно'}, Населенный пункт: ${res.data['address']['city']||'неизвестно'}, Окрестность: ${res.data['address']['suburb']||'неизвестно'}, Адрес: ${res.data['address']['road']||'неизвестно'}, Номер: ${res.data['address']['house_number']||'неизвестно'}`
        })
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

    onFileChange(event) {
      this.selectedFile = event.files
    },

    clearFile(){
      this.selectedFile = null
    },

    send(isFormValid){
      this.submitted = true;
      this.validError = false;
      if (!isFormValid) {
        this.validError = true
        return;
      }
      else {
        post.createOneTask(
              this.selectedCategory.id,
              this.description,
              this.markerLatLng.lat,
              this.markerLatLng.lng,
              this.address,
              this.selectedExecutor.id,
              this.leadTime.toISOString(),
              this.selectedFile
        ).then(()=>{
          this.toggleDialog();
        })
      }
    },

    toggleDialog() {
      this.dialogDisplay = !this.dialogDisplay;

      if(!this.dialogDisplay) {
        this.resetForm();
      }
    },

    resetForm() {
      this.selectedCategory = null;
      this.leadTime = null;
      this.selectedExecutor = null;
      this.description = null;
      this.markerLatLng.lat = 0;
      this.markerLatLng.lng = 0;
      this.address = null;
      this.selectedFile = null;
      this.submitted = false;
    }

  },
  mounted() {
    this.getRelated()
  }

}
</script>

<style scoped>

</style>