<template>
	<b-container fluid
		><b-overlay
			:show="$store.state.loader"
			rounded="sm"
			opacity="1"
			variant="transparent"
			class="loader"
		>
			<router-view></router-view
		></b-overlay>
	</b-container>
</template>

<script>
</script>

<style lang="scss" scoped>
.container-fluid {
	background: #365070;
	font-family: "Roboto", sans-serif;
}
</style>
