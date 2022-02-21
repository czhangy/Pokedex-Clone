<template>
	<div v-if="pokemon && species" id="info">
		<a href="/" id="nav">
			<img
				id="back-arrow"
				src="@/assets/img/back-arrow.png"
				alt="Back arrow"
			/>
		</a>
		<div id="info-header">
			<img id="box-sprite" alt="" />
			<p id="dex-number">#{{ handleDexNum() }}</p>
			<p id="pokemon-name">{{ handleName() }}</p>
		</div>
		<hr id="separator" />
		<div id="info-container">
			<div id="description" class="info-box">
				<p class="title">Description</p>
				<p class="text">
					{{ handleDescription() }}
				</p>
			</div>
			<div id="typing" class="info-box">
				<p class="title">Typing</p>
				<p
					v-for="(type, i) in pokemon.types"
					:key="i"
					class="type-plaque"
					:style="{ background: handleTypeColor(type.type.name) }"
				>
					{{ type.type.name }}
				</p>
			</div>
			<div id="classification" class="info-box">
				<p class="title">Classification</p>
				<p class="text">{{ species.genera[7].genus }}</p>
			</div>
			<div id="height" class="info-box">
				<p class="title">Height</p>
				<p class="text">{{ pokemon.height / 10 }}m</p>
			</div>
			<div id="weight" class="info-box">
				<p class="title">Weight</p>
				<p class="text">{{ pokemon.weight / 10 }}kg</p>
			</div>
			<div id="base-exp" class="info-box">
				<p class="title">Base Experience</p>
				<p class="text">{{ pokemon.base_experience }}</p>
			</div>
			<div id="capture-rate" class="info-box">
				<p class="title">Capture Rate</p>
				<p class="text">{{ species.capture_rate }}</p>
			</div>
			<div id="color" class="info-box">
				<p class="title">Color</p>
				<p class="text">{{ handleUppercase(species.color.name) }}</p>
			</div>
            <div id="shape" class="info-box">
				<p class="title">Shape</p>
				<p v-if="species.shape" class="text">{{ handleUppercase(species.shape.name) }}</p>
                <p v-else class="text">N/A</p>
			</div>
			<div id="stats" class="info-box">
				<p class="title">Base Stats</p>
				<div id="chart" ref="radar" />
			</div>
		</div>
	</div>
	<div v-else id="loading-scrn">
		<img src="@/assets/img/loading.gif" alt="Loading" />
	</div>
</template>

<script>
// Import global libraries
import axios from "axios";
import ApexCharts from "apexcharts";

export default {
	name: "Info",
	data() {
		return {
			pokemon: null,
			species: null,
			typeColors: {
				normal: "#a8a77a",
				fire: "#ee8130",
				water: "#6390f0",
				electric: "#f7d02c",
				grass: "#7ac74c",
				ice: "#96d9d6",
				fighting: "#c22e28",
				poison: "#a33ea1",
				ground: "#e2bf65",
				flying: "#a98ff3",
				psychic: "#f95587",
				bug: "#a6b91a",
				rock: "#b6a136",
				ghost: "#735797",
				dragon: "#6f35fc",
				dark: "#705746",
				steel: "#b7b7ce",
				fairy: "#d685ad",
			},
		};
	},
	methods: {
        // Fetch Pokemon object from PokeAPI
		handleFetchPokemon: async function () {
			let uri = "/api/pokemon/species/" + this.$route.params.pokemon;
			await axios.get(uri).then((response) => {
				// Extract name
				this.species = response.data;
				console.log(this.species);
			});
			uri = "/api/pokemon/pokemon/" + this.$route.params.pokemon;
			axios.get(uri).then((response) => {
				// Extract name
				this.pokemon = response.data;
				console.log(this.pokemon);
				// Load chart
				this.$nextTick(() => this.handleBaseStats());
				// Re-render and fetch image
				this.$nextTick(() => this.handleImgFetch());
			});
		},
		// Build image link and apply to src
		handleImgFetch: function () {
			let img = document.getElementById("box-sprite");
			const num = this.handleDexNum();
			// Fetch image
			img.src = `https://www.serebii.net/pokedex-swsh/icon/${num}.png`;
		},
        // Capitalize words
        handleUppercase: function (word) {
            return word.charAt(0).toUpperCase() + word.substring(1);
        },
		// Format numbers
		handleDexNum: function () {
			// Pad number with 0s at the front
			return this.pokemon.id.toString().padStart(3, "0");
		},
		// Format Pokemon name
		handleName: function () {
			let name = this.$route.params.pokemon;
			// Handle edge cases
			if (name === "mr-mime") return "Mr. Mime";
			else if (name === "mime-jr") return "Mime Jr.";
			else {
				// Replace hyphens
				name = name.replace(/-/g, " ");
				// Capitalize beginning of each word
				return name
					.split(" ")
					.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
					.join(" ");
			}
		},
		// Select the correct description
		handleDescription: function () {
			// Loop from most recent to oldest
			for (
				let i = this.species.flavor_text_entries.length - 1;
				i >= 0;
				i--
			) {
				// Return the first English description
				if (this.species.flavor_text_entries[i].language.name === "en")
					return this.species.flavor_text_entries[i].flavor_text;
			}
			// Error handling
			return "N/A";
		},
		// Color the type plaque
		handleTypeColor: function (type) {
			// Color using static mapping
			return this.typeColors[type];
		},
		// Build radar chart
		handleBaseStats: function () {
			// Init chart
			const options = {
				chart: {
					type: "radar",
					height: 300,
				},
				series: [
					{
						name: "Base Stats",
						data: this.pokemon.stats.map((stat) => stat.base_stat),
					},
				],
				fill: {
					opacity: 0.7,
					colors: [
						"#ee1515",
						"#ee1515",
						"#ee1515",
						"#ee1515",
						"#ee1515",
						"#ee1515",
					],
				},
				stroke: {
					show: true,
					width: 2,
					colors: [
						"#000000",
						"#000000",
						"#000000",
						"#000000",
						"#000000",
						"#000000",
					],
				},
				markers: {
					colors: [
						"#000000",
						"#000000",
						"#000000",
						"#000000",
						"#000000",
						"#000000",
					],
				},
				xaxis: {
					categories: [
						"HP",
						"Attack",
						"Defense",
						"Sp. Atk.",
						"Sp. Def.",
						"Speed",
					],
					labels: {
						style: {
							colors: [
								"#000000",
								"#000000",
								"#000000",
								"#000000",
								"#000000",
								"#000000",
							],
							fontFamily: "Electrolize",
						},
					},
				},
				yaxis: {
					show: false,
					min: 0,
					max: 255,
				},
			};
			// Mount and render chart
			const chart = new ApexCharts(this.$refs.radar, options);
			chart.render();
		},
	},
	mounted() {
		// Fetch Pokemon objects
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
		// Spacing
		margin-bottom: 8px;
	}

	#info-container {
		// Grid layout
		display: grid;
		grid-template-rows: repeat(7, 100px);
		grid-template-columns: repeat(13, 1fr);
		gap: 10px;
		// Sizing
		width: 650px;
		// Spacing
		padding-bottom: 24px;

		.info-box {
			// Box styling
			background: white;
			border: 2px solid black;
			border-radius: 10px;
			// Typography
			font-size: 1.5rem;
			// Flexbox for centering
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			// Spacing
			padding: 0 24px;

			.title {
				// Underline
				text-decoration: underline;
				// Spacing
				margin-bottom: 8px;
				// Centering
				text-align: center;
			}

			.text {
				// Centering
				text-align: center;
			}
		}

		#description {
			// Positioning
			grid-row: 1 / 3;
			grid-column: 1 / 10;
		}

		#typing {
			// Positioning
			grid-row: 1 / 3;
			grid-column: 10 / 14;

			.type-plaque {
				// Spacing
				padding: 4px 8px;
				margin: 4px 0;
				background: black;
				// Box styling
				border: solid 1px black;
				border-radius: 2px;
				// Typography
				color: white;
				font-family: $main-font;
				-webkit-text-stroke: 1px black;
			}
		}

		#classification {
			// Positioning
			grid-row: 3;
			grid-column: 1 / 8;
		}

		#height {
			// Positioning
			grid-row: 3;
			grid-column: 8 / 11;
		}

		#weight {
			// Positioning
			grid-row: 3;
			grid-column: 11 / 14;
		}

		#base-exp {
			// Positioning
			grid-row: 4;
			grid-column: 1 / 6;
		}

		#capture-rate {
			// Positioning
			grid-row: 5;
			grid-column: 1 / 6;
		}

		#color {
			// Positioning
			grid-row: 6;
			grid-column: 1 / 6;
		}

        #shape {
			// Positioning
			grid-row: 7;
			grid-column: 1 / 6;
		}

		#stats {
			// Positioning
			grid-row: 4 / 8;
			grid-column: 6 / 14;

			#chart {
				// Spacing
				margin-top: 24px;
			}
		}
	}
}

#loading-scrn {
	// Background
	background: white;
	// Sizing
	height: $window-height;
	width: $window-width;
	// Flexbox for centering
	display: flex;
	justify-content: center;
	align-items: center;
	// Add border
	border: 5px solid black;
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
