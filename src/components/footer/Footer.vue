<template>
  <div class="footer">
    <b-card class="text-center">
      <div class="text-light">
        This is some content within the default
        <samp>&lt;b-card-body&gt;</samp> block of the
        <samp>&lt;b-card&gt;</samp> component. Notice the padding between the
        card's border and this gray <samp>&lt;div&gt;</samp>.
      </div>
    </b-card>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 5%;
  background-color: #6C757DFF;
  margin-top: 5%;
}
</style>
