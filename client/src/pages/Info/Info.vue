<template>
	<div id="info">
		{{ this.$route.params.pokemon }}
		<img id="info-img" alt="" />
	</div>
</template>

<script>
// Import global library
import axios from "axios";

export default {
	name: "Info",
	data() {
		return {
			pokemon: null,
		};
	},
	methods: {
		// Fetch Pokemon object from PokeAPI
		handleFetchPokemon: function () {
			// Set route
			let uri = "/api/pokemon/info/" + this.$route.params.pokemon;
			// Fetch
			axios.get(uri).then((response) => {
				// Extract names
				this.pokemon = response.data;
				console.log(this.pokemon);
				// Fetch Pokemon sprite
				this.handleImgFetch(this.pokemon.id);
			});
		},
		// Build image link and apply to src
		handleImgFetch: function (i) {
			// Get img element
			let img = document.getElementById("info-img");
			// Format number
			let num = i.toString().padStart(3, "0");
			// Fetch image
			img.src = `https://www.serebii.net/pokedex-swsh/icon/${num}.png`;
		},
	},
	mounted() {
		// Fetch Pokemon object
		this.handleFetchPokemon();
	},
};
</script>

<style lang="scss" scoped>
#info {
	// Sizing
	height: $window-height;
	width: $window-width;
	// Page styling
	background: $info-bg-color;
	// Flexbox for layout
	display: flex;
	justify-content: space-between;
	align-items: center;
	// Add border
	border: 5px solid black;

    #info-img {
        // Sizing
        height: 64px;
        width: 64px;
    }
}
</style>