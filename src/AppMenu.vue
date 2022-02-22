<template>
	<div class="layout-menu-container">
		<AppSubmenu :items="menu" class="layout-menu" :root="true" @menuitem-click="onMenuItemClick" @keydown="onKeyDown" />
	</div>
</template>

<script>
import AppSubmenu from './AppSubmenu';
import {mapGetters} from "vuex";

export default {
  name: 'AppMenu',
  components: {
    'AppSubmenu': AppSubmenu
  },
  data(){
    return{
      menu : [
        {
          label: 'меню', icon: 'pi pi-fw pi-sitemap',
          items: [
            {label: 'Инфо', icon: 'pi pi-fw pi-book', to:{name:'Home'}},
            {
              label: 'Создать', visible: false, icon: 'pi pi-fw pi-pencil',
              items: [
                {
                  label: 'Создать задачу', icon: 'pi pi-fw pi-bookmark', to:{name: 'CreateOneTask'}
                },
                {
                  label: 'Запустить на детектирование', icon: 'pi pi-fw pi-bookmark', to:{name: 'RunDetection'}
                }
              ]
            },
            {label: 'Выполнение', visible: false, icon: 'pi pi-fw pi-history'},
            {label: 'Поиск', icon: 'pi pi-fw pi-search'},
            {label: 'Отчет', icon: 'pi pi-fw pi-chart-bar'},
          ]
        },
      ]
    }
  },
  methods: {

    userRouts(){
      if(this.userCanCreate || this.userIsSuperUser) this.menu[0].items[1].visible=true
      if(this.userCanAnswer || this.userIsSuperUser) this.menu[0].items[2].visible=true
    },

    onMenuItemClick(event) {
        this.$emit('menuitem-click', event);
    },
		onKeyDown(event) {
			const nodeElement = event.target;
			if (event.code === 'Enter' || event.code === 'Space') {
				nodeElement.click();
				event.preventDefault();
			}
		},

  },
	computed: {
    ...mapGetters({
      userCanCreate: 'authenticate/userCanCreate',
      userCanAnswer: 'authenticate/userCanAnswer',
      userIsSuperUser: 'authenticate/userIsSuperUser',
    }),

		darkTheme() {
			return this.$appState.darkTheme;
		}
	},
  mounted() {
    this.userRouts()
  }
}
</script>