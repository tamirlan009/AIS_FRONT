<template>
<div>
  <div class="card">
    <div class="grid">
      <div class="sm:col-6 col-12">
<!--        <h5>Отчет</h5>-->
        <SplitButton :model="splitButtonItems" class="p-button-text p-button-text">
            <span class="flex align-items-center font-bold">Отчет</span>
        </SplitButton>
      </div>
      <div class="sm:col-6 col-12">
          <div class="col">
            <strong>Период:</strong>
          </div>
          <div class="col">
            <span class="mr-3">с</span>
            <Calendar class=" h-1rem w-12rem" v-model="startDate" view="month" dateFormat="mm/yy" />
          </div>
          <div class="col">
            <span class="mr-2">по</span>
            <Calendar class=" h-1rem w-12rem" v-model="endDate" view="month" dateFormat="mm/yy" />
          </div>
      </div>

    </div>
    <hr>
    <Chart type="line" :data="multiAxisData" :options="multiAxisOptions" />
  </div>

</div>
</template>

<script>

import {get} from "@/api/apiRoutes";

export default {
  name: "Report",
  data() {
    return {

      startDate: this.getStartDate(),
      endDate: new Date(),

      splitButtonItems: [
        {
          label: 'Выгрузка в формате EXCEL',
          icon: 'pi pi-file-excel',
          command: () => {
          }
        },
      ],


      multiAxisData: {
        labels: null,
        datasets: [
          {
            label: 'Все поручения',
            fill: false,
            borderColor: '#42A5F5',
            backgroundColor: '#42A5F5',
            yAxisID: 'y',
            tension: .4,
            data: null
          },
          {
            label: 'Исполненные поручения',
            fill: false,
            borderColor: '#00bb7e',
            backgroundColor: '#00bb7e',
            yAxisID: 'y',
            tension: .4,
            data: null
          },
          {
            label: 'Просроченные поручения',
            fill: false,
            borderColor: '#e81111',
            backgroundColor: '#e81111',
            yAxisID: 'y',
            tension: .4,
            data: null
          }
        ]
      },
      multiAxisOptions:{
        stacked: true,
        plugins: {
          legend: {
            labels: {
              color: '#495057'
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#495057'
            },
            grid: {
              color: '#ebedef'
            }
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            ticks: {
              color: '#495057'
            },
            grid: {
              color: '#ebedef'
            }
          },
        }
      }
    }
  },
  methods:{
    getCountTaskReport(){
      get.getCountTaskReport(this.startDate, this.endDate).then((res)=>{
        this.multiAxisData.labels = res.data.labels
        this.multiAxisData.datasets[0].data = res.data.datasets.count_all_tasks
        this.multiAxisData.datasets[1].data = res.data.datasets.count_executed_tasks
        this.multiAxisData.datasets[2].data = res.data.datasets.count_expired_tasks
      })
    },
    getStartDate(){
      let startDate = new Date()
      startDate.setMonth(startDate.getMonth() - 3)
      return startDate
    },

  },
  watch:{
    startDate:function (){
      this.getCountTaskReport()
    },
    endDate:function (){
      this.getCountTaskReport()
    }

  },

  mounted() {
    this.getCountTaskReport()
  }
}
</script>

<style lang="scss" scoped>

::v-deep(.p-splitbutton){
  .p-splitbutton-menubutton{
    background-color: white;
    color:black;
    border: none;
  }
}
</style>