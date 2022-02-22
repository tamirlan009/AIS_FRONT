<template>
  <div v-if="data">
    <TabView v-model:activeIndex="activeIndexTab">
      <TabPanel header="Карта">
        <l-map style="height: 330px" :zoom="zoom" :center="center">
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <l-marker v-if="markerLatLng" :lat-lng="markerLatLng"></l-marker>
        </l-map>
      </TabPanel>
      <TabPanel v-if="data.state==='на выполнении' && userCanAnswer" header="Ответить">
        <span class="p-float-label">
          <Textarea class="w-12 h-12rem" id="textarea" v-model="answerDescription" rows="3" />
          <label for="textarea">Введите описание*</label>
        </span>
        <div class="col-12">
          <div class="p-card-title pl-1">
            <h5 class="p-0 m-0 pt-3">
              Выберите изображение
            </h5>
            <hr>
          </div>
        </div>
        <FileUpload
            chooseLabel="Прикрепить изображение"
            cancelLabel="Убрать все"
            @uploader="onFileChange"
            @clear="clearFile"
            :multiple="true" :auto="true"
            :customUpload="true"
            :showUploadButton="false"
            accept="image/*"
        />
        <Button label="Ответить" @click="sendAnswer" class="mt-4"/>
      </TabPanel>
    </TabView>
  </div>
  <Toast position="top-right" />
</template>

<script>
import {mapState, mapGetters} from "vuex";
import {post} from "@/api/apiRoutes";


export default {
  name: "ReportAboutTask",
  data(){
    return{
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
          '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 8,
      center: [43.4777807765672, 43.59575092792511],

      answerDescription: '',
      activeIndexTab: 0,
      selectedFile: null,
    }
  },
  computed:{
    ...mapState({
      data: state => state.taskCard.data,
      markerLatLng: state=> state.taskCard.markerLatLng,
    }),

    ...mapGetters({
      userCanAnswer: 'authenticate/userCanAnswer'
    })

  },
  methods:{
    sendAnswer(){
      if(this.answerDescription === '' && this.selectedFile === null){
        this.$toast.add({severity:'error', summary: 'Ошибка!', detail:'Обязательные поля не заполнены!', life: 10000});
      }
      else{
        post.createAnswer(this.data.id, this.answerDescription, this.selectedFile).then((res)=>{
          this.$toast.add({severity:'success', summary: 'Успех!', detail:'Ваш ответ успешно добавлен!', life: 10000});
          this.data.answer.push(res.data);
          this.activeIndexTab = 0;
          this.answerDescription = '';
        }).catch(()=>{
          this.$toast.add({severity:'error', summary: 'Ошибка!', detail:'Не удалось отправить запрос на сервер', life: 10000});
        })
      }
    },
    onFileChange(event) {
      this.selectedFile = event.files
    },
    clearFile(){
      this.selectedFile = null
    },
  },
}
</script>

<style scoped>

</style>