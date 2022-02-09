<template>
	<div id="navigation">
		<button class="nav-button" @click="handleUpClick()">
			<img
				id="up-arrow"
				class="nav-icon"
				src="@/assets/img/arrow.png"
				href="Up Arrow"
			/>
		</button>
        <button class="nav-button" @click="handleDownClick()">
			<img
				id="down-arrow"
				class="nav-icon"
				src="@/assets/img/arrow.png"
				href="Up Arrow"
			/>
		</button>
	</div>
</template>

<script>
export default {
	name: "Navigation",
    props: {
        onUpClick: {
            type: Function,
            required: true,
        },
        onDownClick: {
            type: Function,
            required: true,
        },
    },
    methods: {
        // Handle up button
        handleUpClick: function () {
            this.onUpClick(1);
        },
        // Handle down button
        handleDownClick: function () {
            this.onDownClick(1);
        }
    },
    mounted() {
        // Create click listeners
        // document.getElementById("up-arrow")
    }
};
</script>

<style lang="scss" scoped>
#navigation {
	// Container sizing
	height: $window-height;
	// Spacing
	padding: 16px;
    // Flexbox for layout
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    // Positioning
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(100%);

	.nav-button {
		// Remove default styling
		background: $nav-button-color;
		// Button styling
		border-radius: 50%;
		height: 60px;
		width: 60px;
		// Border
		border: 3px solid black;
        // Flexbox for alignment
		display: flex;
		justify-content: center;
		align-items: center;
        // Clickable
        cursor: pointer;

		.nav-icon {
			// Sizing
			height: 48px;
			width: 48px;
		}

		#up-arrow {
            // Rotate arrows
            transform: rotate(180deg);
		}
	}
}

// Sticky hover
@media (hover: hover) {
    #navigation > .nav-button:hover {
        // Animate
        background: darken($nav-button-color, 5);
    }
}
</style>
