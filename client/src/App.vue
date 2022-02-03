<template>
	<div id="nav">
		<router-link to="/">Home</router-link> |
		<router-link to="/about">About</router-link>
	</div>
	<router-view />
</template>

<style lang="scss">
// Import fonts
@import url("https://fonts.googleapis.com/css2?family=Bungee&family=Electrolize&display=swap");

#app {
	font-family: $main-font;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	height: 100vh;
	width: 100vw;
}

#nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	outline: none;
}

html {
	height: 100%;
	overflow-x: hidden;
}

body {
	height: 100%;
	font-family: $alt-font;
}
</style>
