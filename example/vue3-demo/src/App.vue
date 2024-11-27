<script setup>
import { ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import LogoIcon from "./assets/vue.svg";

const title = ref("Rspack + Vue");
</script>

<template>
  <div>
    <LogoIcon />
  </div>
  <HelloWorld :msg="title" />
</template>

<style scoped>
.logo {
  height: 6em;
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
