<template>
	<div class="dex-entry" :class="{ 'active-dex-entry': isActive }">
		<img class="pokeball-icon" alt="" src="@/assets/img/pokeball.svg" />
		<p class="dex-number">001</p>
		<p class="pokemon-name">Bulbasaur</p>
	</div>
</template>

<script>
export default {
	name: "DexEntry",
	props: {
		isActive: {
			type: Boolean,
			default: false,
		},
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
    padding: 0 16px;
    // Clickable
    cursor: pointer;

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
