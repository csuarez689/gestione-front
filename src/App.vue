<template>
	<div id="app">
		<router-view />
	</div>
</template>
<script>
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
