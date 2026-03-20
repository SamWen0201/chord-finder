<template>
  <div>
    <Navbar v-if="$route.meta.showNav"></Navbar>
    <RouterView></RouterView>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  components: {
    Navbar,
  },
};
</script>
