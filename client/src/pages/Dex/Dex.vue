<template>
	<div id="dex">
		<div id="dex-img-panel">
			<img id="dex-img" src="@/assets/img/001.png" alt="Bulbasaur" />
		</div>
		<div id="dex-carousel"></div>
	</div>
</template>

<script>
// Import local components
import DexEntry from "./components/DexEntry.vue";

export default {
	name: "Dex",
	components: {
		DexEntry,
	},
};
</script>

<style lang="scss" scoped>
#dex {
	// Sizing
	height: 100vh;
	width: 100vw;
	// Page styling
	background: white;
	// Flexbox for layout
	display: flex;
	align-items: center;

	#dex-img-panel {
		// Container sizing
		width: 45%;
		background: black;


	}
	#dex-carousel {
		// Container sizing
		width: 55%;
	}
}
</style>
