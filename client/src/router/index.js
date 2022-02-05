import { createRouter, createWebHistory } from "vue-router";

const routes = [
	{
		path: "/",
		name: "Dex",
		component: () => import("@/pages/Dex/Dex.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
