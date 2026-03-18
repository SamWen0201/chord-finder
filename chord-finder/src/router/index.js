import { createRouter, createWebHistory } from "vue-router";

// import components
import RandomNotesGenerator from "@/components/RandomNotesGenerator.vue";
import ChordSelector from "@/components/ChordSelector.vue";
import HomeView from "@/views/HomeView.vue";

const routes = [
  { path: "/", component: HomeView, meta: { showNav: false } },
  {
    path: "/chord-selector",
    component: ChordSelector,
    meta: { showNav: true },
  },
  {
    path: "/random-notes",
    component: RandomNotesGenerator,
    meta: { showNav: true },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
