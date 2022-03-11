<template>
  <div class="surface-0 border-round shadow-5">
    <l-map style="height: 80vh" :zoom="zoom" :center="center">
      <l-control-layers position="topright"></l-control-layers>
      <l-tile-layer
          v-for="tileProvider in tileProviders"
          :key="tileProvider.name"
          :name="tileProvider.name"
          :visible="tileProvider.visible"
          :url="tileProvider.url"
          :attribution="tileProvider.attribution"
          layer-type="base"
      />
      <l-geo-json
          :geojson="geojs"
          @click="getRecord"
      >
        <l-popup class="w-14rem p-0 m-0">
          <div v-for="task in clickPosition" :key="task.id">
            <div class="grid p-2">
              <div class="col">

                <div v-if="task.images.url">
                  <img class="w-12" :src="task.images.url" alt="logo" @click="fullImg($event.target.src)">
                </div>
                <div v-else>
                  <span>Изображение не найдено</span>
                </div>
              </div>
              <div class="col-6">
                <strong class="block">{{ task.createDate }}</strong>
                <small class="block">{{ task.category.name }}</small>
                <button @click="$router.push('/task/'+task.id)" class="mt-2 bg-primary border-none border-round shadow-3 bt-open">
                  открыть
                </button>
              </div>
            </div>
          </div>
        </l-popup>

      </l-geo-json>
    </l-map>


    <Dialog v-model:visible="dialogDisplay" >

      <img class="img-full" :src="fullImgUrl">
    </Dialog>



  </div>

</template>

<script>
import {get} from "@/api/apiRoutes";

export default {
  name: "Map",
  data () {
    return {
      zoom: 9,
      center: [43.500826, 43.661079],
      tileProviders: [
        {
          name: 'OpenStreetMap',
          visible: false,
          attribution:
              '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          url: 'https://tiles.wmflabs.org/hikebike/${z}/${x}/${y}.png',
        },
        {
          name: 'Топографическая карта',
          visible: false,
          attribution:
              'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
          url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        },
        {
          name: 'Географическая карта',
          visible: true,
          url: 'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
          attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        },
      ],


      geojs: null,
      clickPosition: null,
      dialogDisplay: false,
      fullImgUrl: null,

    };
  },
  methods:{

    fullImg(event){
      this.fullImgUrl = event
      this.dialogDisplay=true

    },
    getRecord(event){

      get.getTaskToMap(event.latlng.lat, event.latlng.lng).then((res)=>{
        this.clickPosition = res.data
      })

    },
    getGeoJson(){
      get.getGeoJson().then((res)=>{
        this.geojs = res.data
      })
    }
  },
  mounted() {
    this.getGeoJson()
  }
}
</script>

<style scoped>
.bt-open{
  cursor: pointer;
}

.img-full{
  width: 40rem;
}

</style>