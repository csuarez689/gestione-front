<template>
	<b-container fluid
		><b-overlay
			:show="$store.state.loader"
			rounded="sm"
			opacity="1"
			variant="transparent"
			class="loader"
		>
			<transition name="fade" mode="out-in">
				<router-view></router-view>
			</transition>
		</b-overlay>
	</b-container>
</template>

<script>
</script>

<style lang="scss" scoped>
.container-fluid {
	background: #365070;
	font-family: "Roboto", sans-serif;

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
