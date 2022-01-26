<template>
  <div class="layout--full-page">
    <router-view></router-view>
  </div>
</template>
<style scoped>
  .layout--full-page {
    background-image: url('~@/assets/images--old/pages/bg1.svg') !important;
    background-color: #fff !important;
    background-repeat: no-repeat;
    background-size: cover !important;
    background-position: top;
}
</style>