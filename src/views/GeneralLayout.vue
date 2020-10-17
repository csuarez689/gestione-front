<template>
	<div>
		<nav-bar v-if="$store.state.auth.loggedIn"></nav-bar>
		<b-overlay
			:show="$store.state.loader"
			rounded="sm"
			variant="transparent"
			opacity="1"
			blur="1px"
			class="loader"
		>
			<b-container> <router-view></router-view></b-container
		></b-overlay>
	</div>
</template>
<script>
import NavBar from "../components/shared/NavBar";

export default {
	components: { NavBar }
};
</script>
<style lang="scss" scoped>
.container {
	margin-bottom: 40px !important;
}
</style>