<template>
	<div>
		<nav-bar v-if="$store.state.auth.loggedIn"></nav-bar>
		<b-container> <router-view></router-view></b-container>
	</div>
</template>
<script>
import NavBar from "../components/shared/NavBar";

export default {
	components: { NavBar }
};
</script>
