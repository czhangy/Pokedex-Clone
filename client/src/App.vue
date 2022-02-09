<template>
	<Header />
	<div id="main">
		<router-view />
	</div>
	<div id="bg" />
	<Footer />
</template>

<script>
// Import global components
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
	name: "App",
	components: {
		Header,
		Footer,
	},
};
</script>

<style lang="scss">
// Import fonts
@import url("https://fonts.googleapis.com/css2?family=Bungee&family=Electrolize&display=swap");

#app {
	font-family: $main-font;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	// Sizing
	height: 100vh;
	width: 100vw;
	// Set page background
	background: $main;
	// Flexbox for centering
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	// Push to bottom
	z-index: $bottom;

	#main {
		// Push to top
		z-index: $top;
	}

	#bg {
		// Positioning
		position: absolute;
		bottom: 0;
		// Sizing
		width: 100vw;
		height: 50vh;
		// Background color
		background: white;
		// Border
		border-top: 10px solid black;
	}
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	outline: none;
}
</style>
