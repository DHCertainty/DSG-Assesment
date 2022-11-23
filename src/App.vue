<template>
  <div>
    <the-navbar></the-navbar>
    <the-form></the-form>
  </div>
</template>

<script>
import TheForm from './components/TheForm.vue';
import TheNavbar from './components/TheNavbar.vue';
export default {
  components: {
    TheNavbar,
    TheForm
  }
}
</script>

<style>


.back{
  /* position: static; */
  z-index: 0;
}
</style>