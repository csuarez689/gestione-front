<template>
	<div id="app">
		<nav-bar v-if="$store.state.auth.status.loggedIn"></nav-bar>

		<b-container>
			<router-view />
		</b-container>
	</div>
</template>
<script>
import NavBar from "./components/shared/NavBar";

export default {
	components: { NavBar }
};
</script>
<style lang="scss">
//Tables styles
@import "./assets/sass/table";

//Modal styles
// @import 'modal';

body {
	color: #566787;
	background: #f5f5f5;
	font-family: "Varela Round", sans-serif !important;
	font-size: 13px !important;
	margin-bottom: 40px !important;
	.btn {
		i {
			float: left;
			font-size: 21px;
			margin-right: 5px;
		}
	}
	.container {
		.card-footer {
			display: flex;
			justify-content: flex-end;
		}
	}
}
</style>
