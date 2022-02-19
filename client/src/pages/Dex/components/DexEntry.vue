<template>
	<a
        href="/info"
		class="dex-entry"
		:class="{ 'active-dex-entry': ind === curInd }"
	>
		<img class="pokeball-icon" alt="" src="@/assets/img/pokeball.svg" />
		<p class="dex-number">{{ handleNumFormat(pokemon.num) }}</p>
		<p class="pokemon-name">{{ pokemon.name }}</p>
	</a>
</template>

<script>
export default {
	name: "DexEntry",
	props: {
		pokemon: {
			type: Object,
			default: {
				name: "Missingno",
				num: 0,
			},
		},
		ind: {
			type: Number,
			required: true,
		},
		curInd: {
			type: Number,
			required: true,
		},
	},
	methods: {
		// Format numbers
		handleNumFormat: function (i) {
			return i.toString().padStart(3, "0");
		},
		// Style initial carousel
		handleInitIndentation: function () {
			// Target current DexEntry
			let entry = document.getElementsByClassName("dex-entry")[this.ind];
			// Calculate offset based on distance from starting index
			let offset = this.ind * 30;
			entry.style.marginLeft = `${offset}px`;
		},
        // Mount link to <a> tag
        handleLink: function () {
            // Target current DexEntry
			let entry = document.getElementsByClassName("dex-entry")[this.ind];
            // Set href to correct link
            entry.href = entry.href + `/${this.pokemon.name}`
        }
	},
	mounted() {
		// Initialize carousel
		this.handleInitIndentation();
        // Initialize href
        this.handleLink();
	},
};
</script>

<style lang="scss" scoped>
.dex-entry {
	// Sizing
	width: 600px;
	// Tile styling
	background: $entry-color;
	border-radius: 50px 10px 10px 50px;
	// Flexbox for layout
	display: flex;
	align-items: center;
	// Spacing
	padding: 8px 16px;
	margin: -12px 0;
	// Border
	border: 2px solid black;
	// Filter
	filter: brightness(70%);
	// Prevent highlighting
	user-select: none;
    // Remove default styling
    text-decoration: none;
    color: black;

	.pokeball-icon {
		// Sizing
		height: 48px;
		width: 48px;
		// Spacing
		margin-right: 12px;
	}

	.dex-number {
		// Spacing
		margin-right: 18px;
		// Typography
		font-size: 2rem;
		line-height: 2rem;
	}

	.pokemon-name {
		// Typography
		font-size: 1.5rem;
		line-height: 1.5rem;
	}
}

.active-dex-entry {
	// Highlight
	filter: brightness(100%);
	// Add spacing
	margin: 20px 0;
	// Clickable
	cursor: pointer;
}

// Sticky hover
@media (hover: hover) {
	.active-dex-entry:hover {
		// Animate
		background: $entry-hover-color;
	}
}
</style>
