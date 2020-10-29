<template>
	<div id="app">
		<transition name="fade" mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
</template>
<script>
</script>
<style lang="scss">
@import "./assets/sass/table";

body {
	color: #566787;
	background: #f5f5f5;
	font-family: "Varela Round", sans-serif !important;
	font-size: 13px !important;
	.loader {
		color: #224786 !important;
	}
	.fade-enter-active,
	.fade-leave-active {
		transition-duration: 0.3s;
		transition-property: opacity;
		transition-timing-function: ease;
	}

	.fade-enter,
	.fade-leave-active {
		opacity: 0;
	}
}
</style>
