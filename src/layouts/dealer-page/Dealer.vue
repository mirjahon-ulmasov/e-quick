<template>
    <div class="wrapper" >
      <SideBar :style="active ? 'display: none !important' : 'width: 20% !important' "  />
       <div class="container1" :style="active ? 'width: 100% !important' : 'width: 80% !important' " >
         <router-view></router-view>
       </div>
      <div class="close-side"
        :style="active ? 'left: 0.6%;background: #3e586d;width: 33px;' : 'left: 20%;background: #3e6179;width: 63px;' "
       @click="active=!active" 
      >
      <feather-icon
        style="color: #cfcfcf; border-radius: 2px"
        :icon=" active ? 'ArrowRightIcon' : 'ArrowLeftIcon'"
        class="cursor-pointer"
      />
    </div>
    </div>
</template>
<script>
import SideBar from '../components/dealer/Sidebar.vue'
export default {
    components:{
      SideBar
    },
    data(){
      return{
        active: false
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
z-index: 9999;
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
    padding: 20px !important;
    padding: 0;
    background: linear-gradient(99.52deg, #3F4F61 -14.96%, #3A9FD1 156.83%);
    display: flex;
    justify-content: center;
    align-items: center;
    div.container1{
    // width: 80% !important;
    height: 100%;
    padding: 0px !important;
    margin-right: 0;
    // margin-left: 0;
    background: white;
    display: flex;
    // flex-direction: column;
    justify-content: center;
    border-radius: 30px;
    justify-content: flex-start;
    }
}
</style>