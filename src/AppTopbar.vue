<template>
	<div class="layout-topbar">
		<button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle">
			<i class="pi pi-bars"></i>
		</button>

    <button class="p-link layout-topbar-menu-button layout-topbar-button"
            v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'scalein',
			leaveToClass: 'hidden', leaveActiveClass: 'fadeout', hideOnOutsideClick: true}">
      <i class="pi pi-ellipsis-v"></i>
    </button>

		<ul class="layout-topbar-menu hidden lg:flex origin-top">
			<li>
				<Notification/>
			</li>
			<li>
				<button class="p-link layout-topbar-button">
					<i class="pi pi-cog"></i>
					<span>Настройки</span>
				</button>
			</li>
			<li>
        <User/>
			</li>
		</ul>
	</div>
</template>

<script>

import Notification from "@/components/TopBar/Notification";
import User from "@/components/TopBar/User";

export default {
  components:{
    Notification,
    User
  },
  data() {
    return {
      items: [
        {
          label: 'Выйти',
          icon: 'pi pi-sign-out',
          to:{name:'Login'},
        },
      ]
    }
  },
  methods: {
    toggle(event) {
      this.$refs.menu.toggle(event);
    },
    onMenuToggle(event) {
        this.$emit('menu-toggle', event);
    },
    onTopbarMenuToggle(event) {
            this.$emit('topbar-menu-toggle', event);
    },
    topbarImage() {
      return this.$appState.darkTheme ? 'images/logo-white.svg' : 'images/logo-dark.svg';
    }
  },
	computed: {
		darkTheme() {
			return this.$appState.darkTheme;
		}
	},

}
</script>