<template>
	<div v-if="pokemon" id="info">
		<a href="/" id="nav">
			<img
				id="back-arrow"
				src="@/assets/img/back-arrow.png"
				alt="Back arrow"
			/>
		</a>
		<div id="info-header">
			<img id="box-sprite" alt="" />
			<p id="dex-number">#{{ this.handleNumFormat() }}</p>
			<p id="pokemon-name">{{ this.handleNameFormat() }}</p>
		</div>
		<hr id="separator" />
		<div class="info-row">
			<div class="info-box">
                <p class="title">Height</p>
                {{ this.pokemon.height }}m
            </div>
            <div class="info-box">
                <p class="title">Weight</p>
                {{ this.pokemon.weight }}kg
            </div>
		</div>
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
		// Format numbers
		handleNumFormat: function (i) {
			// Pad number with 0s at the front
			return this.pokemon.id.toString().padStart(3, "0");
		},
		// Format Pokemon name
		handleNameFormat: function () {
			const name = this.$route.params.pokemon;
			// Capitalize first letter
			return name.charAt(0).toUpperCase() + name.slice(1);
		},
		// Fetch Pokemon object from PokeAPI
		handleFetchPokemon: function () {
			const uri = "/api/pokemon/info/" + this.$route.params.pokemon;
			axios.get(uri).then((response) => {
				// Extract name
				this.pokemon = response.data;
				console.log(this.pokemon);
				// Re-render and fetch image
				this.$nextTick(() => this.handleImgFetch());
			});
		},
		// Build image link and apply to src
		handleImgFetch: function () {
			let img = document.getElementById("box-sprite");
			const num = this.handleNumFormat();
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
	// Add border
	border: 5px solid black;
	// Flexbox for centering
	display: flex;
	flex-direction: column;
	align-items: center;
	// Handle inner scroll
	overflow-y: scroll;
	// Typography
	font-family: $alt-font;
	// Positioning for nav
	position: relative;
	// Spacing
	padding: 0 24px;

	#nav {
		// Positioning
		position: absolute;
		left: 0;
		top: 0;
		// Spacing
		margin: 12px;
		// Clickable
		cursor: pointer;

		#back-arrow {
			// Icon sizing
			height: 48px;
			width: 48px;
		}
	}

	#info-header {
		// Flexbox for layout
		display: flex;
		justify-content: center;
		align-items: center;
		// Spacing
		margin: 16px 0;

		#box-sprite {
			// Sizing
			height: 48px;
			width: 48px;
		}

		#dex-number {
			// Typography
			font-size: 2.5rem;
			line-height: 2.5rem;
			// Spacing
			margin-left: 8px;
			margin-right: 16px;
		}

		#pokemon-name {
			// Typography
			font-size: 2.5rem;
			line-height: 2.5rem;
			letter-spacing: 1px;
		}
	}

	#separator {
		// Bar styling
		background: black;
		height: 5px;
		width: 60%;
		// Remove default styling
		border: none;
	}

	.info-row {
		// Flexbox for layout
		display: flex;
		justify-content: space-between;

        .info-box {
            // Box styling
            background: white;
            border: 2px solid black;
            border-radius: 20px;
            // Spacing
            padding: 16px;
            margin: 16px;
            // Typography
            font-size: 1.5rem;
            text-align: center;

            .title {
                // Underline
                text-decoration: underline;
                // Spacing
                margin-bottom: 8px;
            }
        }
	}
}

::-webkit-scrollbar {
	// Scrollbar width
	width: 10px;
}

::-webkit-scrollbar-track {
	// Track styling
	box-shadow: inset 0 0 5px grey;
}

::-webkit-scrollbar-thumb {
	// Handle styling
	background: grey;
	border-radius: 5px;
}
</style>
