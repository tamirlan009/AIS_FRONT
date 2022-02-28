<template>
<div class="flex justify-content-center">
  <div class="card">
    <div class="col-12  md:w-30rem">
      <strong class="p-0 m-0 pt-3">
        Название контрольного выезда
      </strong>
      <hr>
      <InputText
          v-model="v$.description.$model"
          class="w-12"
          :class="{'p-invalid':v$.description.$invalid && submitted}"
      />
    </div>

    <div class="col-12 mt-5">
      <strong class="p-0 m-0">
        Дата и время выезда
      </strong>
      <hr>
      <Calendar
          class="w-12"
          v-model="v$.startTime.$model"
          dateFormat="dd MM yy"
          :showTime="true"
          :showSeconds="true"
          :numberOfMonths="3"
          :class="{'p-invalid':v$.startTime.$invalid && submitted}"
      />
    </div>


    <div class="col-12 mt-5">
      <strong class="p-0 m-0 pt-3">
        Выберите видео файл
      </strong>
      <hr>
      <FileUpload
          chooseLabel="Прикрепить изображение"
          cancelLabel="Убрать все"
          :multiple="false"
          :auto="true"
          :customUpload="true"
          :showUploadButton="false"
          @uploader="onFileChange"
          @clear="clearFile"
          accept="video/*"
          :class="{'p-invalid':v$.selectedFile.$invalid && submitted}"
      />
    </div>

    <div class="col-12 mt-5">
      <Button @click="send(!v$.$invalid)" label="Отправить"/>
    </div>
    <div v-if="validError" class="col-12 mt-5">
      <small class="text-pink-500">Обязательные поля не заполнены!</small>
    </div>

    <ProgressBar v-if="is_uploading" :value="uploadProgress" />

  </div>
</div>


  <Dialog position="top" v-model:visible="dialogDisplay" >
    <div class="flex align-items-center flex-column pt-6 px-3">
      <i class="pi pi-check-circle" style="font-size: 5rem; color: var(--green-500);"></i>
      <h5>Файл успешно отправлено на детектирование!</h5>
      <p style="line-height: 1.5; text-indent: 1rem;">
        В зависимости от размера видео файла, детектирование займет некоторое время.
        После завершения работы вы получите уведомление.
        </p>
      </div>
    <template #footer>
      <div class="flex justify-content-center">
        <Button label="OK" @click="dialogDisplay=!dialogDisplay" class="p-button-text" />
      </div>
    </template>
  </Dialog>


</template>

<script>
import {post} from "@/api/apiRoutes";
import {mapState} from "vuex";
import useVuelidate from "@vuelidate/core";
import {required} from "@vuelidate/validators";


export default {
  name: "RunDetection",
  setup () {
    return { v$: useVuelidate() }
  },
  data(){
    return{
      description: null,
      startTime: null,
      selectedFile: null,
      dialogDisplay: false,
      is_uploading: false,
      submitted: false,
      validError: false,
    }
  },
  validations() {
    return {
      description: {
        required
      },
      startTime: {
        required,
      },
      selectedFile: {
        required
      }
    }
  },

  methods:{
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

      }else {
        this.is_uploading = true
        post.runDetection(this.description, this.startTime.toISOString(), this.selectedFile[0]).then(()=>{
          this.is_uploading = false;
          this.dialogDisplay=true;
          // this.toggleDialog();
        }).catch(()=>{
          this.is_uploading = false
        })
      }

    },

    // toggleDialog() {
    //   this.dialogDisplay = !this.dialogDisplay;
    //
    //   if(!this.dialogDisplay) {
    //     this.resetForm();
    //   }
    // },
    //
    // resetForm() {
    //   this.description=null;
    //   this.startTime=null;
    //   this.selectedFile=null;
    // }



  },
  computed:{
    ...mapState({
      uploadProgress: state => state.runDetection.uploadProgress
    })
  }
}
</script>

<style scoped>

</style>