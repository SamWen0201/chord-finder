<template>
  <div class="container py-5">
    <h1 class="text-center mb-5">Chord Finder</h1>
    <div class="row g-4 justify-content-center">
      <!-- Chord Selector -->
      <div class="col-md-5">
        <div class="card h-100 shadow-sm position-relative card--hover">
          <div class="card-body text-center">
            <h5 class="card-title">Chord Selector</h5>
            <p class="card-text text-secondary">
              Select a root note and chord type to instantly visualize the
              corresponding keys on the piano. Perfect for learning chord shapes
              and theory.
            </p>

            <RouterLink to="/chord-selector" class="stretched-link" />
          </div>
          <img
            class="card-img-bottom"
            src="../assets/img/chord-selector-picture.png"
            alt="Chord Selector picture"
          />
        </div>
      </div>

      <!-- Random Notes Generator -->
      <div class="col-md-5">
        <div class="card h-100 shadow-sm position-relative card--hover">
          <div class="card-body text-center">
            <h5 class="card-title">Ear Training</h5>
            <p class="card-text text-secondary">
              Train your musical ear by listening to randomly generated notes
              and identifying them by name. A simple but effective way to
              improve your pitch recognition.
            </p>
            <RouterLink to="/random-notes" class="stretched-link" />
          </div>
          <img
            class="card-img-bottom"
            src="../assets/img/random-notes-generator-picture.png"
            alt="Random Notes Generator picture"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "bootstrap/scss/functions";
@import "../assets/customscss/variables";
@import "bootstrap/scss/variables";
.card--hover {
  transition: all 0.3s;
  &:hover {
    box-shadow: 0 1rem 3rem rgba($primary, 0.2) !important;
  }
}
</style>
