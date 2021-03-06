<template>
	<div id="dex">
		<div id="dex-window">
			<div id="dex-img-panel">
				<img id="dex-img" alt="" />
			</div>
			<div id="dex-carousel">
				<div class="carousel-padding" />
				<DexEntry
					v-for="(pokemon, i) in pokemonList"
					:key="i"
					:pokemon="pokemon"
					:ind="i"
					:curInd="curInd"
				/>
				<div class="carousel-padding" />
			</div>
		</div>
		<Navigation :onUpClick="handleScrollUp" :onDownClick="handleScrollDown" />
	</div>
</template>

<script>
// Import global library
import axios from "axios";

// Import global components
import Navigation from "@/components/Navigation.vue";

// Import local components
import DexEntry from "./components/DexEntry.vue";

export default {
	name: "Dex",
	components: {
		Navigation,
		DexEntry,
	},
	data() {
		return {
			pokemonList: null,
			curInd: 0,
		};
	},
	methods: {
		// Build image link and apply to src
		handleImgFetch: function (i) {
			// Get img element
			let img = document.getElementById("dex-img");
			// Format number
			let num = i.toString().padStart(3, "0");
			// Fetch image
			img.src = `https://www.serebii.net/swordshield/pokemon/${num}.png`;
		},
		// Fetch Pokemon data from PokeAPI
		handlePokemonFetch: function () {
			// Set route
			let uri = "/api/pokemon";
			// Fetch
			axios.get(uri).then((response) => {
				// Extract names
				this.pokemonList = response.data.results.map(
					(pokemon) => pokemon.name
				);
				// Build pokemon objects
				for (let i in this.pokemonList)
					this.pokemonList[i] = {
						name: this.pokemonList[i],
						num: parseInt(i) + 1,
					};
			});
		},
		// Scroll up
		handleScrollUp: function (di) {
			// Update current index
			this.curInd = Math.max(this.curInd - di, 0);
			// Update image
			this.handleImgFetch(this.pokemonList[this.curInd].num);
			// Re-style carousel
			this.handleIndentation();
		},
		// Scroll down
		handleScrollDown: function (di) {
			// Update current index
			this.curInd = Math.min(this.curInd + di, this.pokemonList.length - 1);
			// Update image
			this.handleImgFetch(this.pokemonList[this.curInd].num);
			// Re-style carousel
			this.handleIndentation();
		},
		// Style carousel by indenting DexEntries
		handleIndentation: function () {
			// Target DexEntries
			let entries = document.getElementsByClassName("dex-entry");
			// Save reference to component
			let ref = this;
			Array.from(entries).forEach(function (entry, ind) {
				// Calculate offset based on distance from curInd
				let offset = Math.abs(ind - ref.curInd) * 30;
				// Enable/disable transition
				entries[ind].style.transition =
					ind === ref.curInd ? "none" : "margin-left 0.2s";
				// Apply CSS transform
				entries[ind].style.marginLeft = `${offset}px`;
				// Scroll to correct position
				if (ind === ref.curInd)
					entries[ind].scrollIntoView({
						behavior: "smooth",
						block: "center",
						inline: "start",
					});
			});
		},
	},
	mounted() {
		// Fetch Bulbasaur image
		this.handleImgFetch(1);
		// Fetch Pokemon
		this.handlePokemonFetch();
	},
};
</script>

<style lang="scss" scoped>
#dex {
	// Positioning for nav
	position: relative;

	#dex-window {
		// Sizing
		height: $window-height;
		width: $window-width;
		// Page styling
		background: $dex-bg-color;
		// Flexbox for layout
		display: flex;
		justify-content: space-between;
		align-items: center;
		// Handle carousel overflow
		overflow-y: hidden;
		// Add border
		border: 5px solid black;

		#dex-img-panel {
			// Container sizing
			height: 100%;
			// Flexbox for centering
			display: flex;
			justify-content: flex-end;
			align-items: center;
			// Spacing
			margin: 0 40px;

			#dex-img {
				// Box styling
				background: white;
				border-radius: 20px;
				// Spacing
				padding: 8px;
				// Border
				border: 6px solid black;
			}
		}

		#dex-carousel {
			// Hide scrollbar on Firefox
			scrollbar-width: none;
			// Container sizing
			height: 100vh;
			width: 500px;
			// Scroll functionality
			overflow: hidden;

			&::-webkit-scrollbar {
				// Hide scrollbar on Safari and Chrome
				display: none;
			}

			.carousel-padding {
				// Pad height
				height: 45%;
			}
		}
	}
}
</style>
