<template>
	<div
		class="dex-entry"
		:class="{ 'active-dex-entry': dexNum === curDexNum }"
		@click="handleClick"
	>
		<img class="pokeball-icon" alt="" src="@/assets/img/pokeball.svg" />
		<p class="dex-number">{{ handleNumFormat(dexNum) }}</p>
		<p class="pokemon-name">{{ pokemonName }}</p>
	</div>
</template>

<script>
export default {
	name: "DexEntry",
	props: {
		dexNum: {
			type: Number,
			default: 0,
		},
		curDexNum: {
			type: Number,
			required: true,
		},
		pokemonName: {
			type: String,
			default: "Missingno",
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
			this.onClick(this.dexNum);
		},
		// Format numbers
		handleNumFormat: function (i) {
			return i.toString().padStart(3, "0");
		},
		// Style initial carousel
		handleInitIndentation: function () {
			// Target current DexEntry
			let entry =
				document.getElementsByClassName("dex-entry")[this.dexNum - 1];
			// Calculate offset based on distance from dexNum = 1
			let offset = (this.dexNum - 1) * 30;
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
	margin: 8px 0;
	// Clickable
	cursor: pointer;
	// Border
	border: 2px solid black;

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
	}

	.pokemon-name {
		// Typography
		font-size: 1.5rem;
	}
}

.active-dex-entry {
	// Highlight
	background: $active-entry-color;
}
</style>
