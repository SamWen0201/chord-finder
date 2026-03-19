<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/">Chord Finder</RouterLink>

      <!-- hamburger 按鈕 -->
      <button class="navbar-toggler" type="button" @click="isOpen = !isOpen">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- 用 v-show 控制開關 -->
      <div class="navbar-collapse" v-show="isOpen">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink
              class="nav-link text-decoration-none"
              to="/chord-selector"
              @click="isOpen = false"
            >
              Chord Selector
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              class="nav-link text-decoration-none"
              to="/random-notes"
              @click="isOpen = false"
            >
              Random Notes Generator
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
};
</script>
<style scoped lang="scss">
@import "bootstrap/scss/functions";
@import "../assets/customscss/variables";
@import "bootstrap/scss/variables";

.nav-link {
  &:visited,
  &:link {
    color: $gray-500;
    transition: all 0.3s;
  }
  &:hover {
    color: $green-300;
  }
}
.router-link-active {
  color: $primary !important;
  font-weight: 600;
}
</style>
