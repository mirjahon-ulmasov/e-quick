<template>
    <div class="wrapper" >
      <SideBar  :style="active ? 'display: none !important; transition: 0.3s;' : 'width: 16% !important; transition: 0.3s;' "  />
       <div class="container1" :style="active ? 'width: 100% !important' : 'width: 84% !important' " >
              <transition :name="routerTransition" mode="out-in">
                <router-view @setAppClasses="(classesStr) => $emit('setAppClasses', classesStr)" />
              </transition>
       </div>
      <div class="close-side"
        :style="active ? 'left: 0.6%;background: #3e586d;width: 33px;' : 'left: 16.4%;background: #3e6179;width: 63px;' "
       @click="active=!active" 
      >
      <img src="@/assets/dealer/img/icons/arrow.svg" v-if="!active"  style="color: #cfcfcf; border-radius: 2px; margin-right: 5px" class="cursor-pointer" alt="cvxzv">
      <img src="@/assets/dealer/img/icons/arrow2.svg" v-else  style="color: #cfcfcf; border-radius: 2px" class="cursor-pointer" alt="cvxzv">
    </div>
    </div>
</template>
<script>
import themeConfig         from '@/../themeConfig.js'
import SideBar from '../components/dealer/Sidebar.vue'
export default {
  components:{
    SideBar,
    themeConfig
  },
  data () {
    return {
      active: false,
      routerTransition  : themeConfig.routerTransition || 'none'
    }
  },
  methods: {
    updateRouterTransition (val) {
      this.routerTransition = val
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;400;500;600;700;800;900&display=swap');
.close-side{
position: fixed;
display: flex;
justify-content: flex-end;
align-items: center;
top: 43.56%;
bottom: 48%;
height: 77px;
z-index: 99;
border-radius: 11px;
padding-right: 10px;
/* background: linear-gradient(215.31deg, #3f4f61 8.35%, #3a9fd1 137.05%);; */

}
</style>
<style lang="scss" scoped>
div.wrapper{
    width: 100%;
    height: 100vh;
    margin: 0;
    -webkit-transition: opacity .7s;
      transition: opacity .7s;
    padding: 20px !important;
    padding: 0;
    background: linear-gradient(99.52deg, #3F4F61 -14.96%, #3A9FD1 156.83%);
    display: flex;
    justify-content: center;
    // transition: margin-left 0.5s;
    align-items: center;
    div.container1{
    // width: 80% !important;
    height: 100%;
    padding: 0px !important;
    margin-right: 0;
    transition: margin-left 0.5s;
    // margin-left: 0;
    background: white;
    display: flex;
    // flex-direction: column;
    justify-content: center;
    border-radius: 35px;
    justify-content: flex-start;
    }
}
</style>