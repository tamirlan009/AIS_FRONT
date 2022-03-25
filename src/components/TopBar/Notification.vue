<template>

  <div v-if="notifications.length>0" v-badge="notifications.length">
    <button class="p-link layout-topbar-button"  @click="visibleLeft = true" >
      <i class="pi pi-bell"></i>
      <span>Уведомление</span>
    </button>
  </div>
  <div v-else>
    <button class="p-link layout-topbar-button"  @click="visibleLeft = true" >
      <i class="pi pi-bell"></i>
      <span>Уведомление</span>
    </button>
  </div>

  <Sidebar class="p-sidebar-md wrapper" v-model:visible="visibleLeft" :showCloseIcon="false" position="right">

    <div class="content">
      <div class="grid grid justify-content-center p-2 lg:p-0">
        <div class="col" style="font-size: 1.3rem">Уведомления</div>
        <div class="col flex justify-content-end mr-4">
          <i @click="visibleLeft=false" class="p-sidebar-close-icon pi pi-times" style="font-size: 1.5rem"></i>
        </div>
      </div>
      <hr>

      <div v-if="notifications.length===0"  class="flex align-items-center flex-column pt-8 px-3">
        <i class="pi pi-envelope" style="font-size: 5rem;"></i>
        <h4></h4>
        <p>
          Новых уведомлений пока нет
        </p>
      </div>

      <div v-else>
        <div v-for="n in notifications" :key="n.id">

          <div v-if="n.type === 'new task'">
            <div class="p-message p-component p-message-error" role="alert">
              <div class="p-message-wrapper">
                <span class="p-message-icon pi pi-info-circle"></span>
                <div class="p-message-text click-send" @click="openNotification(n.id, n.type, n.task_id)">
                  <div>
                    <strong>Создана новая задача</strong>
                  </div>
                  <small>Нажмите, чтобы увидеть подробности</small>
                </div>
                <button class="p-message-close p-link" type="button" @click="closeNotification(n.id, n.type)">
                  <i class="p-message-close-icon pi pi-times"></i>
                  <span class="p-ink"></span>
                </button>
              </div>
            </div>
          </div>

          <div v-if="n.type==='answer'">
            <div class="p-message p-component p-message-info" role="alert">
              <div class="p-message-wrapper">
                <span class="p-message-icon pi pi-info-circle"></span>
                <div class="p-message-text click-send" @click="openNotification(n.id, n.type, n.task_id)">
                  <div>
                    <strong>Получен ответ на созданую задачу</strong>
                  </div>
                  <small>нажмите чтобы увидеть результат</small>
                </div>
                <button class="p-message-close p-link" type="button" @click="closeTaskNotification(n.id, n.type)">
                  <i class="p-message-close-icon pi pi-times"></i>
                  <span class="p-ink"></span>
                </button>
              </div>
            </div>
          </div>

          <div v-if="n.type==='detection finished'">
            <div class="p-message p-component p-message-success" role="alert">
              <div class="p-message-wrapper">
                <span class="p-message-icon pi pi-info-circle"></span>
                <div class="p-message-text click-send" @click="openDetection(n.id, n.task_id, n.detection_id)">
                  <div>
                    <strong>Запущенная задача на детектирование закончена успешно!</strong>
                  </div>
                  <small>нажмите чтобы увидеть результат</small>
                </div>
                <button class="p-message-close p-link" type="button" @click="closeDetectionNotification(n.id, n.type)">
                  <i class="p-message-close-icon pi pi-times"></i>
                  <span class="p-ink"></span>
                </button>
              </div>
            </div>
          </div>


        </div>

      </div>
    </div>
  </Sidebar>


</template>

<script>

import {del} from "@/api/apiRoutes";


export default {
  name: "Notification",
  data(){
    return{
      ws: new WebSocket(`ws://localhost:8000/ws/notification?token=${JSON.parse(localStorage.getItem('userData')).access}`),
      notifications: [],
      visibleLeft: false
    }
  },
  methods:{
    openNotification(id, type, taskId){
      this.visibleLeft=false
      this.$router.push('/task/'+taskId)
      del.deleteTaskNotification(id, type)
      this.notifications= this.notifications.filter(p => p.id !== id && p.type===type)
    },

    openDetection(id, type, detetcion_id){
      this.visibleLeft=false
      this.$router.push('/DetectResultList/'+ detetcion_id)
      del.deleteDetectionNotification(id)
      this.notifications= this.notifications.filter(p => p.id !== id)
    },

    closeDetectionNotification(id, type){
      del.deleteDetectionNotification(id)
      this.notifications= this.notifications.filter(p => p.id !== id && p.type===type)
    },

    closeTaskNotification(id, type){
      del.deleteTaskNotification(id, type)
      this.notifications= this.notifications.filter(p => p.id !== id && p.type===type)
    },

    getNotification(){
      this.ws.onmessage = (e)=>{
        if(JSON.parse(e.data).action !== 'delete'){
          const data = JSON.parse(e.data).data

          for(const i in data){
            this.notifications.push(data[i])
          }
        }
      }

      this.ws.onopen = () => {

        this.ws.send(JSON.stringify({
          action: "get_task_notification_list",
          request_id: new Date().getTime()
        }));

        this.ws.send(JSON.stringify({
          action: "get_detection_notification_list",
          request_id: new Date().getTime()
        }));


        this.ws.send(JSON.stringify({
          action: "subscribe_task_notification_activity",
          request_id: new Date().getTime(),
        }))

        this.ws.send(JSON.stringify({
          action: "subscribe_detection_notification_activity",
          request_id: new Date().getTime(),
        }))
      }

    }

  },
  created() {
    this.getNotification()
  }
}
</script>

<style lang="scss" scoped>

.click-send{
  cursor: pointer;
}

.pi-times{
  cursor: pointer;
}


</style>