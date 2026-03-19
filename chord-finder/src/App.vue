<template>
  <Navbar v-if="$route.meta.showNav"></Navbar>
  <RouterView></RouterView>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  components: {
    Navbar,
  },
};
</script>
