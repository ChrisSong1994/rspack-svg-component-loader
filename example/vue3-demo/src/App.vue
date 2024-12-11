<script setup>
import VueLogoIcon from "./assets/vue.svg?component&namedExport=VueIcon";
import RspackIcon from "./assets/rspack.svg?component";
import LogoContent from "./assets/rspack.svg";

</script>

<template>
  <div>
    <VueLogoIcon class="logo" />
    <RspackIcon class="logo" />
    <img width="100" height="100" alt="Vue logo" :src="LogoContent" />
    <img width="100" height="100" alt="Vue logo" src="./assets/vue.svg" />
  </div>
</template>

<style scoped>
.logo {
  /* height: 6em; */
  width: 12em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
