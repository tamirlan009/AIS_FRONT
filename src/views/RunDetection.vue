<template>
<div class="flex justify-content-center">
  <div class="card">
    <div class="col-12  md:w-30rem">
      <strong class="p-0 m-0 pt-3">
        Название контрольного выезда
      </strong>
      <hr>
      <InputText class="w-12"/>
    </div>

    <div class="col-12 mt-5">
      <strong class="p-0 m-0">
        Дата и время выезда
      </strong>
      <hr>
      <Calendar
          class="w-12"
          dateFormat="dd MM yy"
          :showTime="true"
          :showSeconds="true"
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
          accept="video/*" />
    </div>

    <div class="col-12 mt-5">
      <Button label="Отправить"/>
    </div>


  </div>
</div>
</template>

<script>
export default {
  name: "RunDetection"
}
</script>

<style scoped>

</style>