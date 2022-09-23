<template>
  <div>
    <the-data></the-data>
  </div>
</template>

<script>
import TheData from "./TheData.vue";

export default {
  components: {
    TheData
  },
  data() {
    return {
    };
  },
  methods: {

  },
  
};
</script>

<style scoped>
div {
  position: absolute;
  top: 80px;
  z-index: -1;
}
</style>
