<template>
	<div id="header">
			<div id="logo">
				<img class="logo-img" src="@/assets/img/pokeball.svg" alt="" />
				<h1 id="site-name">ZHANGY'S POKÉDEX</h1>
				<img class="logo-img" src="@/assets/img/pokeball.svg" alt="" />
			</div>
	</div>
</template>

<script>
export default {
	name: "Header",
};
</script>

<style lang="scss" scoped>
#header {
	// Sizing
	height: 15vh;
	width: 100vw;
	// Bar styling
	background: $main;
	// Flexbox for centering
	display: flex;
	justify-content: center;
	align-items: center;
    // Spacing
    padding: 16px;
	// Push to top
	z-index: $top;

	#logo {
        // Container styling
        background: $main-alt;
        border-radius: 50px;
		// Spacing
		padding: 8px;
		// Flexbox for layout
		display: flex;
		align-items: center;
        // Depth
        box-shadow: inset 0 0 5px black;
        text-shadow: 0 0 5px black;

		#site-name {
			// Typography
			color: white;
			// Spacing
			margin: 0 8px;
			line-height: 2.5rem;
		}

		.logo-img {
			// Sizing
			height: 32px;
			width: 32px;
		}
	}
}
</style>
