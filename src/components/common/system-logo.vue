<template>
<!-- 	<icon-local-logo-fill v-if="fill" />
	<icon-local-logo v-else /> -->
	<div>
		<!-- <img src="@/assets/images/logo.png" alt=""> -->
	</div>
</template>

<script lang="ts" setup>
	interface Props {
		/** logo是否填充 */
		fill ? : boolean;
	}

	withDefaults(defineProps < Props > (), {
		fill: false
	});
</script>

<style scoped></style>
