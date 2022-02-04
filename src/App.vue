<template>
<<<<<<< HEAD
  <div id="app">
    <router-view />
    <!-- <button class="backtop"  @click="moveUp()" >
      <feather-icon
        :icon="'ChevronUpIcon'"
        class="icon"
        style="color: #4679ec"
        svgClasses="h-3 w-2"
      />
    </button> -->
=======
  <div id="app" >
    <router-view  />
 <!-- <BackToTop /> -->
>>>>>>> 9cee078545d98f24cc14961ad7c1ac0a49ae4a65
  </div>
</template>

<script>
<<<<<<< HEAD
export default {
  data() {
    return {
      isVisible: false,
      hideScrollToTop: true,
    };
  },
  methods: {
    moveUp() {
      document.documentElement.scrollTop = 0;
    },
  },
};
=======
// import BackToTop from './components/backToTop.vue'
export default {
  // components: {BackToTop},
}
>>>>>>> 9cee078545d98f24cc14961ad7c1ac0a49ae4a65
</script>
