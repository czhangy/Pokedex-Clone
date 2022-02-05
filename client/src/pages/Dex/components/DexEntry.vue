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
		pokemonName: {
			type: String,
			default: "Missingno",
		},
		curDexNum: {
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
			// Scroll into view
			this.handleScroll();
			// Adjust styling
			this.handleIndentation();
			// Alert parent
			this.onClick(this.dexNum);
		},
		// Format numbers
		handleNumFormat: function (i) {
			return i.toString().padStart(3, "0");
		},
		// Handle scrolling of DexEntries
		handleScroll: function () {
			// Transform dexNum into index
			let ind = this.dexNum - 1;
			// Target corresponding DexEntry
			let entry = document.getElementsByClassName("dex-entry")[ind];
			// Scroll target into center frame
			entry.scrollIntoView({ behavior: "smooth", block: "center" });
		},
		handleIndentation: function () {
			// Target DexEntries
			let entries = document.getElementsByClassName("dex-entry");
            let ref = this;
			Array.from(entries).forEach(function (entry, ind) {
				let dexNum = ind + 1;
				// Calculate offset based on distance from curDexNum
				let offset = Math.abs(dexNum - ref.curDexNum) * 10;
                console.log(offset);
				entries[ind].style.transform = `translateX(${offset}px)`;
			});
		},
	},
	mounted() {
		// Style carousel
		this.handleIndentation();
	},
};
</script>

<style lang="scss" scoped>
.dex-entry {
	// Sizing
	width: 500px;
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
