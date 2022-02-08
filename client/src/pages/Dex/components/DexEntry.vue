<template>
	<div
		class="dex-entry"
		:class="{ 'active-dex-entry': ind === curInd }"
		@click="handleClick"
	>
		<img class="pokeball-icon" alt="" src="@/assets/img/pokeball.svg" />
		<p class="dex-number">{{ handleNumFormat(pokemon.num) }}</p>
		<p class="pokemon-name">{{ pokemon.name }}</p>
	</div>
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
		onClick: {
			type: Function,
			required: true,
		},
	},
	methods: {
		// Click handler
		handleClick: function () {
			// Alert parent
			this.onClick(this.ind);
		},
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
	},
	mounted() {
		// Initialize carousel
		this.handleInitIndentation();
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
	// Clickable
	cursor: pointer;
	// Border
	border: 2px solid black;
	// Filter
	filter: brightness(70%);
	// Prevent highlighting
	user-select: none;

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
}

// Sticky hover
@media (hover: hover) {
	.active-dex-entry:hover {
		// Animate
		background: $entry-hover-color;
	}
}
</style>
