<template>
	<div id="app">
		<router-view />
	</div>
</template>
<script>
</script>
<script>
export default {
	data() {
		return { online: true };
	},
	watch: {
		"navigator.onLine"(value) {
			console.log(value);
		}
	}
};
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
}
</style>
