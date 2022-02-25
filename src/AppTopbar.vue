<template>
	<div class="layout-topbar">
		<button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle">
			<i class="pi pi-bars"></i>
		</button>
		<ul class="layout-topbar-menu hidden lg:flex origin-top">
			<li>
				<button class="p-link layout-topbar-button">
					<i class="pi pi-calendar"></i>
					<span>Events</span>
				</button>
			</li>
			<li>
				<button class="p-link layout-topbar-button">
					<i class="pi pi-cog"></i>
					<span>Settings</span>
				</button>
			</li>
			<li>
				<button
            class="p-link layout-topbar-button"
            @click="toggle"
        >
					<i class="pi pi-user"></i>
					<span>Profile</span>
				</button>
        <Menu ref="menu" :model="items" :popup="true" />
			</li>
		</ul>
	</div>
</template>

<script>

export default {
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